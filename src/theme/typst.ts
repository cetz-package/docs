import type { PrismTheme } from "prism-react-renderer"

const a = {
  plain: {
    color: "var(--code-color)",
    backgroundColor: "var(--code-background-color)",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "var(--typ-comment)"
      }
    },
    {
      types: ["keyword", "boolean"],
      style: {
        color: "var(--typ-keyword)"
      }
    },
    {
      types: ["function"],
      style: {
        color: "var(--typ-func)"
      }
    },
    {
      types: ["number"],
      style: {
        color: "var(--typ-num)"
      }
    },
    {
      types: ["string"],
      style: {
        color: "var(--typ-str)"
      }
    },
    {
      types: ["interpolate"],
      style: {
        color: "var(--typ-pol)"
      }
    }
  ]
}

export default a;

/*
export const light: PrismTheme = {
  plain: {
    color: "#19181F",
    backgroundColor: "#fdfdfd",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#8a8a8a"
      }
    },
    {
      types: ["keyword", "boolean"],
      style: {
        color: "#d73a49"
      }
    },
    {
      types: ["function"],
      style: {
        color: "#4b69c6"
      }
    },
    {
      types: ["number"],
      style: {
        color: "#b60157"
      }
    },
    {
      types: ["string"],
      style: {
        color: "#298e0d"
      }
    },
    {
      types: ["interpolate"],
      style: {
        color: "#8b41b1"
      }
    }
  ]
}

export const dark: PrismTheme = {
  plain: {
    color: "#fdfdfd",
    backgroundColor: "var(--code-background-color)",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#b0b3c2"
      }
    },
    {
      types: ["keyword", "boolean"],
      style: {
        color: "#FFA49D"
      }
    },
    {
      types: ["function"],
      style: {
        color: "#7CD5FF"
      }
    },
    {
      types: ["number"],
      style: {
        color: "#ff7d79"
      }
    },
    {
      types: ["string"],
      style: {
        color: "#80F4B6"
      }
    },
    {
      types: ["interpolate"],
      style: {
        color: "#CAA8FF"
      }
    }
  ]
}
*/