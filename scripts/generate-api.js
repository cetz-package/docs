// Generates the .mdx files for the api section of the docs.

const fs = require("fs-extra");
const comment_regex = /^\/\/\/ ?/gm;
const parameter_description_regex = /^- (.*?) \((.*?)\)(?: = (.*?))?:(.*)/gm;
const parameter_regex = /((?:\.\.)?[\w-]+)(?::\s*(.+?))?(?:,|$)/gm;

const escape_lut = {
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;",
  "<": "&lt;",
  ">": "&gt;",
};
const escape_regex = /[&"'<>]/g;

const index = {
  "Draw Functions": {
    Shapes: {
      Circle: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["circle", "circle-through"],
      },
      Arc: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["arc", "arc-through"],
      },
      Mark: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["mark"],
      },
      Line: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["line"],
      },
      Grid: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["grid"],
      },
      Content: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["content"],
      },
      Rect: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["rect"],
      },
      Bezier: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["bezier", "bezier-through"],
      },
      Hobby: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["hobby"],
      },
      Catmull: {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["catmull"],
      },
      "Merge Path": {
        path: "cetz/src/draw/shapes.typ",
        funcs: ["merge-path"],
      },
    },
  },
};

async function main(write_path, index) {
  if (!(index.path !== undefined && index.funcs !== undefined)) {
    await fs.mkdirs(write_path);
    Object.entries(index).map(([p, i]) => main(write_path + "/" + p, i));
    return;
  }
  let content = `import Type from "@site/src/components/Type";\nimport Function from "@site/src/components/Function";\nimport Parameter from "@site/src/components/Parameter";\n\n`;
  let f = await fs.readFile(index.path, { encoding: "utf-8" });
  index.funcs.forEach((func, i) => {
    const description_regex = new RegExp(
      `(?:^\\/\\/\\/.*\\r?\\n)+(?=#let ${func}\\()`,
      "gm"
    );
    const function_regex = new RegExp(
      `(?<=#let ${func}\\()[\\s\\S]+?(?=\\) = )`,
      "gm"
    );
    let parameters = Object.fromEntries(
      Array.from(f.match(function_regex)[0].matchAll(parameter_regex), (m) => [
        m[1],
        { default: m[2] },
      ])
    );

    let description = Array.from(f.matchAll(description_regex), (m) => m[0])[0];
    description = description.replace(comment_regex, "");
    description = description.replace(
      parameter_description_regex,
      (_, name, types, def, description) => {
        if (parameters[name] !== undefined) {
          parameters[name].types = types;
          if (def === undefined) {
            def = parameters[name].default;
          }
        }
        if (description !== "") {
          return `<Parameter name="${name}" types="${types}" ${
            def !== undefined
              ? 'default_value="' +
                def.replace(escape_regex, (c) => escape_lut[c]) +
                '"'
              : ""
          }>${description}</Parameter>`;
        } else {
          return "";
        }
      }
    );
    if (i !== 0) {
      content += `\n## ${func}\n`;
    }
    content +=
      `<Function name="${func}" parameters={${JSON.stringify(
        parameters
      )}}/>\n` + description;
  });
  await fs.writeFile(write_path + ".mdx", content);
}

(async () => {
  await main("temp", index);
  await fs.move("temp", "docs/api", { overwrite: true });
})();
