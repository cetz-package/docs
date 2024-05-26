Prism.languages["typst-code"] = {
  comment: [
    {
      pattern: /\/\*[\s\S]*?\*\//,
      greedy: true,
    },
    {
      pattern: /(^|[^:])\/\/.*/,
      lookbehind: true,
      greedy: true,
    },
  ],
  string: [
    {
      pattern: /"(?:\\.|[^\\"])*"/,
      greedy: true,
    },
    {
      pattern: /\$(?:\\.|[^\\$])*\$/,
      greedy: true,
    },
  ],
  keyword:
    /\b(?:as|break|context|continue|else|export|for|if|import|in|include|let|return|set|show|while)(?!-)\b/,
  function: /\b[a-zA-Z_][\w-]*(?=\[|\()/,
  operator:
    /=>|\.{2}|==|!=|<=|>=|<|>|\+=|-=|\*=|\/=|=|\+|\*|\/|-|\b(?:and|not|or)\b/,
  property: /\b[a-zA-Z_][\w-]*(?=:)/,
  boolean: /\b(?:false|none|true)(?!-)\b/,
  constant: [
    {
      pattern: /\bauto(?!-)\b/,
    },
    {
      pattern: /\b\d+(\.\d+)?(?:cm|deg|em|fr|in|mm|pt|rad|%)(?!-)\b/,
      greedy: true,
    },
    {
      pattern: /\b0x[\da-fA-F]+|\b0b[01]+|\b0o[0-7]+|\b\d+\b/,
      greedy: true,
    },
  ],
  punctuation: [
    {
      pattern: /[{}[\];(),.:]/,
      greedy: true,
    },
  ],
};

Prism.languages.typc = Prism.languages["typst-code"];
