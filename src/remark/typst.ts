import { visit } from "unist-util-visit";
import { exec } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { Root as MdastRoot } from "mdast";
import type { MdxJsxAttributeValueExpression } from "mdast-util-mdx-jsx";

const typTemplate = `
#set page(height: auto, width: auto, fill: yellow.lighten(95%), margin: 1cm)
#import "/src/lib.typ" as cetz\n
`;

const typcTemplate = [
  `
    #set page(height: auto, width: auto, fill: yellow.lighten(95%), margin: 1cm)
    #import "/src/lib.typ" as cetz
    #align(center, cetz.canvas({
      import cetz.draw: *
    `,
  "\n}))",
];

const plugin = () => {
  /**
   * This transformer renders code blocks of type "typ" (Typst file)
   * and "typc" (Typst code - to be embedded in `cetz.canvas`).
   * If the code should be shown, "example" must be inside the metadata,
   * otherwise "render" (i.e. only output the rendered code).
   *
   * For examples, if the rendered output is too large,
   * "vertical" specifies that the output will show below the code.
   *
   * The code is cached inside the `typst_renders/` folder.
   *
   * @example
   *
   * ````markdown
   * ```typc example
   * rect((0, 0), (1, 1))
   * ```
   *
   * ```typc example vertical
   * rect((0, 0), (1, 1))
   * ```
   * ````
   */
  const transformer = async (ast: MdastRoot) => {
    let children: Promise<void>[] = [];
    let folder = "typst_renders/";
    visit(ast, { type: "code" } as const, (node, index, parent) => {
      if (
        !(
          (node.lang === "typ" || node.lang === "typc") &&
          (node.meta?.includes("render") || node.meta?.includes("example"))
        )
      ) {
        return;
      }

      if (index === undefined || parent === undefined) {
        throw new Error("Invalid location for typst code example");
      }

      const hash = createHash("md5")
        .update(node.value)
        .digest("hex")
        .slice(0, 6);
      const path = folder + hash + ".svg";
      if (!existsSync(path)) {
        children.push(
          new Promise((resolve) => {
            const child = exec(`typst c - ${path} --root ./cetz/`);

            if (!child.stdout || !child.stderr || !child.stdin)
              throw new Error(`Failed to spawn typst process`);

            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
            if (node.lang === "typ") {
              child.stdin.write(typTemplate + node.value);
            } else {
              child.stdin.write(typcTemplate[0] + node.value + typcTemplate[1]);
            }
            child.stdin.end();
            child.on("exit", () => { resolve() });
          }),
        );
      }

      if (node.meta.includes("render")) {
        parent.children[index] = {
          type: "image",
          url: "@site/" + path,
        };
      } else {
        // Wrap the code and rendered image in the `TypstPreview` component.
        // This is equivalent to the following JSX:
        //
        // <TypstPreview isVertical={node.meta?.includes("vertical")}>
        //   {code}
        //   <img src="@site/..." />
        // </TypstPreview>
        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "TypstPreview",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "isVertical",
              value: boolToJsx(node.meta?.includes("vertical")),
            },
          ],
          children: [
            node,
            {
              // @ts-expect-error This will be transformed into an <img> by the image transformer
              type: "image",
              url: "@site/" + path,
            },
          ],
        };
      }
    });
    await Promise.all(children);

  };
  return transformer;
};

export default plugin;

/**
 * Produces a JSX expression tree as if the user had written a literal boolean
 * expression as an attribute (e.g. <Foo bar={true}/>).
 */
function boolToJsx(value: boolean): MdxJsxAttributeValueExpression {
  return {
    type: "mdxJsxAttributeValueExpression",
    value: value.toString(),
    data: {
      estree: {
        type: "Program",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "Literal",
              value,
              raw: value.toString(),
            },
          },
        ],
        sourceType: "module",
        comments: [],
      },
    },
  };
}
