/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

import api from "./cetz/docs/api/sidebar";

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  api: api,
  docs: [
    "overview",
    "getting-started",
    {
      type: "category",
      label: "Basics",
      link: {
        type: "doc",
        id: "basics/basics",
      },
      items: [
        "basics/custom-types",
        "basics/canvas",
        "basics/styling",
        "basics/coordinate-systems",
        "basics/anchors",
        "basics/marks",
      ],
    },
    {
      type: "category",
      label: "Libraries",
      link: {
        type: "doc",
        id: "libraries/libraries",
      },
      items: ["libraries/plot", "libraries/tree"],
    },
    {
      type: "category",
      label: "Tutorials",
      link: {
        type: "generated-index",
        title: "Tutorials",
      },
      items: ["tutorials/karl"],
    },
    "internals/internals",
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
