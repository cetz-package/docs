// Generates the .mdx files for the api section of the docs.

const fs = require("fs-extra");
const comment_regex = /^\/\/\/ ?/gm;
const parameter_description_regex = /^- (.*?) \((.*?)\)(?: = (.*?))?:(.*)/gm;
const parameter_regex = /((?:\.\.)?[\w-]+)(?::\s*(.+?))?(?:,|$)/gm;
const docstring_regex = /((?:\/\/\/.*\r?\n)+)^#let ([\w-]+)\(([^=]*)\).*=/gm;
const returns_regex = /^-> (.*)/gm;

const escape_lut = {
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;",
  "<": "&lt;",
  ">": "&gt;",
};
const escape_regex = /[&"'<>]/g;

// const files = ["cetz/src/draw/shapes.typ", "cetz/src/draw/grouping.typ"];

const root = "cetz/src/";
const gen_root = "cetz/docs/_generated/";

async function main() {
  for (const file of await fs.readdir(root, { recursive: true })) {
    console.log(file);
    if (!file.endsWith(".typ")) {
      continue;
    }
    let f = await fs.readFile(root + file, { encoding: "utf-8" });
    const folder = gen_root + file.slice(0, -4);
    await fs.mkdirs(folder);
    let c = "";
    for (const match of f.matchAll(docstring_regex)) {
      let content = "";
      let func = match[2];
      let parameters = Object.fromEntries(
        Array.from(match[3].matchAll(parameter_regex), (m) => [
          m[1],
          { default: m[2] },
        ]),
      );
      let returns;
      let description = match[1]
        .replace(comment_regex, "")
        .replace(
          parameter_description_regex,
          (_, name, types, def, description) => {
            name = name.trim();
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
          },
        )
        .replace(returns_regex, (arst, types) => {
          returns = types;
          return "";
        });
      content +=
        `<Function name="${func}" ${
          returns !== undefined ? `returns="${returns}"` : ""
        } parameters={${JSON.stringify(parameters)}}/>\n` + description;
      await fs.writeFile(`${folder}/${func}.mdx`, content);
      if (!func.startsWith("_")) {
        const n = func.replaceAll("-", "").toUpperCase();
        c += `## ${func}\nimport ${n} from "./${func}.mdx"\n\n<${n}/>\n`;
      }
    }
    await fs.writeFile(`${folder}/-combined.mdx`, c);
  }
}

main();
