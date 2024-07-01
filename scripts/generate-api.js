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

const files = ["cetz/src/draw/shapes.typ", "cetz/src/draw/grouping.typ"];

async function main() {
  await fs.mkdirs("cetz/docs/_generated");
  for (const file of files) {
    let f = await fs.readFile(file, { encoding: "utf-8" });
    for (const match of f.matchAll(
      /((?:\/\/\/.*\n)+)^#let ([\w-]+)\(([^=]*)\).*=/gm
    )) {
      let content = `import Type from "@site/src/components/Type";\nimport Function from "@site/src/components/Function";\nimport Parameter from "@site/src/components/Parameter";\n\n`;
      let func = match[2];
      let parameters = Object.fromEntries(
        Array.from(match[3].matchAll(parameter_regex), (m) => [
          m[1],
          { default: m[2] },
        ])
      );
      let description = match[1]
        .replace(comment_regex, "")
        .replace(
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
      content +=
        `<Function name="${func}" parameters={${JSON.stringify(
          parameters
        )}}/>\n` + description;
      await fs.writeFile(`cetz/docs/_generated/${func}.mdx`, content);
    }
  }
}

main();
