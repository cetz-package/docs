import { visit } from 'unist-util-visit';
import * as fs from "node:fs/promises"

const plugin = (options) => {
    const transformer = async (ast) => {
        visit(ast, { type: "link" }, async (node, index, parent) => {
            if (node?.url?.endsWith(".typ")) {
              const file = await fs.readFile("cetz/" + node.url, {encoding: "utf8"})
              console.log(file.match(`#let ${node.text}`))
            }
        });
    };
    return transformer;
};

export default plugin;