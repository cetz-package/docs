import { visit } from "unist-util-visit";
import { exec } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { Root as MdastRoot } from "mdast";
import type { VFile } from "vfile";
import type { MdxJsxAttributeValueExpression } from "mdast-util-mdx-jsx";

const typTemplate = `
#set page(height: auto, fill: yellow.lighten(95%), margin: 1cm)
#import "@preview/cetz:0.2.2"\n
`;

const typcTemplate = [
  `
    #set page(height: auto, fill: yellow.lighten(95%), margin: 1cm)
    #import "@preview/cetz:0.2.2"
    #align(center, cetz.canvas({
      import cetz.draw: *
    `,
  "\n}))",
];

const plugin = () => {
  const transformer = async (ast: MdastRoot, vfile: VFile) => {
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
            const child = exec("typst c - " + path);

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
            child.on("exit", () => resolve());
          })
        );
      }

      if (node.meta.includes("render")) {
        parent.children[index] = {
          type: "image",
          url: "@site/" + path,
        };
      } else {
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
              // @ts-expect-error This will be transformed by the image transformer
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
