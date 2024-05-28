import { visit } from 'unist-util-visit';
import { exec } from "node:child_process";
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';

const typTemplate = `
#set page(height: auto, fill: yellow.lighten(95%), margin: 1cm)
#import "@preview/cetz:0.2.2"\n
`

const typcTemplate = [
    `
    #set page(height: auto, fill: yellow.lighten(95%), margin: 1cm)
    #import "@preview/cetz:0.2.2"
    #align(center, cetz.canvas({
      import cetz.draw: *
    `,
    "\n}))"
]

const plugin = (options) => {
    const transformer = async (ast) => {
        let children = []
        let folder = "typst_renders/"
        visit(ast, { type: "code" }, (node, index, parent) => {
            if ((node.lang === "typ" || node.lang === "typc") && (node.meta?.includes("render") || node.meta?.includes("example"))) {

                const hash = createHash('md5').update(node.value).digest('hex').slice(0, 6);
                const path = folder + hash + ".svg"
                if (!existsSync(path)) {
                    children.push(new Promise((resolve) => {
                        const child = exec("typst c - " + path)
                        child.stdout.pipe(process.stdout)
                        child.stderr.pipe(process.stderr)
                        if (node.lang === "typ") {
                            child.stdin.write(typTemplate + node.value)
                        } else {
                            child.stdin.write(typcTemplate[0] + node.value + typcTemplate[1])
                        }
                        child.stdin.end()
                        child.on("exit", (code) => resolve())
                    }))
                }
                if (node.meta.includes("render")) {
                    parent.children[index] = {
                        type: "image",
                        url: "@site/" + path
                    }
                } else {
                    parent.children[index] = {
                        type: "paragraph",
                        children: [
                            { type: "image", url: "@site/" + path },
                            node
                        ]
                    }
                }
            }
        });
        await Promise.all(children)
    };
    return transformer;
};

export default plugin;