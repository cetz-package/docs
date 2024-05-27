Prism.languages.typst = {
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
    /#(?:as|break|context|continue|else|export|for|if|import|in|include|let|return|set|show|while)\b/,
  operator: {
    pattern:
      /=>|\.{2}|==|!=|<=|>=|<|>|\+=|-=|\*=|\/=|=|\+|\*|\/|-|\b(?:and|not|or)\b/,
    greedy: true,
  },
  constant: [
    {
      pattern: /\b(?:auto|false|none|true)\b/,
      greedy: true,
    },
    {
      pattern: /\b\d+(\.\d+)?(?:cm|deg|em|fr|in|mm|pt|rad|%)\b/,
      greedy: true,
    },
    {
      pattern: /\b0x[\da-fA-F]+|\b0b[01]+|\b0o[0-7]+|\b\d+\b/,
      greedy: true,
    },
  ],
  punctuation: {
    pattern: /[{}[\];(),.:]/,
    greedy: true,
  },
  "attr-name": {
    pattern: /<\w[\w-]*>/,
    greedy: true,
  },
  "attr-value": {
    pattern: /@\w[\w-]*/,
    greedy: true,
  },
  bold: {
    pattern: /\*(?=\S)(?:\\.|[^\\*])*\*(?=\W|_|$)/,
    lookbehind: true,
    greedy: true,
    inside: {
      punctuation: /\*/,
    },
  },
  italic: {
    pattern: /_(?=\S)(?:\\.|[^\\_])*_(?=\W|_|$)/,
    lookbehind: true,
    greedy: true,
    inside: {
      punctuation: /_/,
    },
  },
  important: {
    pattern: /^=+\s+[^\n<]*/,
    greedy: true,
    inside: {
      punctuation: /^=+/,
    },
  },
};

Prism.languages.typ = Prism.languages.typst;
