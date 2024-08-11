import React from "react";
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import Type from "@site/src/components/Type";
import Function from "@site/src/components/Function";
import Parameter from "@site/src/components/Parameter";
import TypstPreview from "@site/src/components/TypstPreview";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Type,
  Function,
  Parameter,
  TypstPreview,
};
