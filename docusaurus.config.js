// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import typstRender from "./src/remark/typst-render.js";
import TypstTheme from "./src/theme/typst.ts";

const config = {
  title: "CeTZ Documentation",

  url: "https://cetz-package.github.io/",
  baseUrl: "/docs/",

  organizationName: "cetz-package",
  projectName: "docs",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: ["@orama/plugin-docusaurus-v3"],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "cetz/docs",
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/cetz-package/docs/blob/main",

          beforeDefaultRemarkPlugins: [typstRender],
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        // blog: false,
        theme: {
          customCss: [
            "./src/css/custom.css",
            "./src/css/parameter.css",
            "./src/css/type.css",
            "./src/css/code.css",
            "./src/css/function.css",
          ],
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: "CeTZ Documentation",
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          label: "Docs",
        },
        {
          type: "docSidebar",
          sidebarId: "api",
          label: "API",
        },
      ],
    },
    footer: {
      links: [
        {
          label: "Homepage",
          href: "https://cetz-package.github.io",
        },
        {
          label: "Github",
          href: "https://github.com/cetz-package/cetz",
        },
      ],
    },

    prism: {
      theme: TypstTheme,
    },
  },
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  markdown: {
    preprocessor: ({ filePath, fileContent }) => {
      return fileContent.replaceAll(
        /\{\{(\w+)\}\}/g,
        (_, type) => `<Type>${type}</Type>`,
      );
      // .replaceAll(/@@generated\/([\w-\/]+)/g, (_, path) => {
      //   const split = path.split("/");
      //   // console.log(split, split[split.length - 1]);
      //   const output = `## ${split[split.length - 1]}\nimport Imported from "@site/cetz/docs/_generated/${path}.mdx";\n<Imported />
      //   `;
      //   // console.log(output);
      //   return output;
      // });
    },
  },
};

export default config;
