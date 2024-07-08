import React from "react";

const types = {
  number: { link: "/docs/basics/custom-types#number", class: "num" },
  coordinate: { link: "/docs/basics/custom-types#coordinate" },
  style: { link: "/docs/basics/custom-types#style" },
  context: { link: "/docs/advanced/custom-types#context" },
  vector: { link: "/docs/advanced/custom-types#vector" },
  matrix: { link: "/docs/advanced/custom-types#matrix"},
  element: {},
  // domain: { link: "/docs/libraries/plot#domain" },
  // axes: { link: "/docs/libraries/plot#axes" },

  int: {
    link: "https://typst.app/docs/reference/foundations/int",
    class: "num",
  },
  float: {
    link: "https://typst.app/docs/reference/foundations/float",
    class: "num",
  },
  length: {
    link: "https://typst.app/docs/reference/layout/length",
    class: "num",
  },
  angle: {
    link: "https://typst.app/docs/reference/layout/angle",
    class: "num",
  },
  ratio: {
    link: "https://typst.app/docs/reference/layout/ratio",
    class: "num",
  },

  color: {
    class: "color",
    link: "https://typst.app/docs/reference/visualize/color/",
  },
  gradient: {
    class: "color",
    link: "https://typst.app/docs/reference/visualize/gradient/",
  },

  auto: {
    class: "keyword",
    link: "https://typst.app/docs/reference/foundations/auto/",
  },
  none: {
    class: "keyword",
    link: "https://typst.app/docs/reference/foundations/none/",
  },

  content: {
    link: "https://typst.app/docs/reference/foundations/content",
    class: "con",
  },

  bool: {
    link: "https://typst.app/docs/reference/foundations/bool",
    class: "bool",
  },

  str: {
    link: "https://typst.app/docs/reference/foundations/str",
    class: "str",
  },

  pattern: { link: "https://typst.app/docs/reference/visualize/pattern" },
  stroke: { link: "https://typst.app/docs/reference/visualize/stroke" },
  dictionary: {
    link: "https://typst.app/docs/reference/foundations/dictionary",
  },
  array: { link: "https://typst.app/docs/reference/foundations/array" },
  function: { link: "https://typst.app/docs/reference/foundations/function" },
  direction: { link: "https://typst.app/docs/reference/layout/direction" },
};

export default function Type({ children }) {
  children = children.trim();
  const type = types[children];
  return (
    <span className={`type type-${type?.class ?? "obj"}`}>
      <a href={type?.link}>{children}</a>
    </span>
  );
}

export function fromString(types, use_ors = true) {
  return types.split(",").map((t, i) =>
    use_ors ? (
      <span>
        {i !== 0 ? " or " : ""}
        <Type>{t}</Type>
      </span>
    ) : (
      <Type>{t}</Type>
    )
  );
}
