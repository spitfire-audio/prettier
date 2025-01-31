import commonOptions from "../common/common-options.evaluate.js";

const CATEGORY_JAVASCRIPT = "JavaScript";

// format based on https://github.com/prettier/prettier/blob/main/src/main/core-options.evaluate.js
const options = {
  arrowParens: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "always",
    description: "Include parentheses around a sole arrow function parameter.",
    choices: [
      {
        value: "always",
        description: "Always include parens. Example: `(x) => x`",
      },
      {
        value: "avoid",
        description: "Omit parens when possible. Example: `x => x`",
      },
    ],
  },
  bracketSameLine: commonOptions.bracketSameLine,
  bracketSpacing: commonOptions.bracketSpacing,
  breakBeforeElse: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: false,
    description: "Always add a line break before else."
  },
  breakBeforeStatement: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "never",
    description:
        "Always add line breaks before statement following if, else, with, for, for each, while and do.",
    choices: [
        {
            value: "never",
            description: "never add hard break",
        },
        {
            value: "conditionals",
            description: "only after if, else and with",
        },
        {
            value: "loops",
            description: "only after for, for each, while and do",
        },
        {
            value: "always",
            description: "add hard break",
        },
    ],
  },
  jsxBracketSameLine: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    description: "Put > on the last line instead of at a new line.",
    deprecated: "2.4.0",
  },
  semi: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: true,
    description: "Print semicolons.",
    oppositeDescription:
      "Do not print semicolons, except at the beginning of lines which may need them.",
  },
  singleQuote: commonOptions.singleQuote,
  spaceBeforeFunctionParen: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "never",
    description:
      "Put a space before function parenthesis in all declarations (similar to the corresponding eslint option). (Default is to put a space before function parenthesis for untyped anonymous functions only.)",
    choices: [
      {
        value: "never",
        description: "never add space",
      },
      {
        value: "not-empty",
        description: "only add space if parens aren't empty",
      },
      {
        value: "always",
        description: "add space",
      },
    ],
  },
  spaceLogicalNot: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: false,
    description:
      "Put spaces after NOT operator, except in the middle of `!!` (similar to the corresponding eslint option). Status: experimental, with limited testing.",
  },
  jsxSingleQuote: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: false,
    description: "Use single quotes in JSX.",
  },
  quoteProps: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "as-needed",
    description: "Change when properties in objects are quoted.",
    choices: [
      {
        value: "as-needed",
        description: "Only add quotes around object properties where required.",
      },
      {
        value: "consistent",
        description:
          "If at least one property in an object requires quotes, quote all properties.",
      },
      {
        value: "preserve",
        description: "Respect the input use of quotes in object properties.",
      },
    ],
  },
  trailingComma: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "all",
    description: "Print trailing commas wherever possible when multi-line.",
    choices: [
      {
        value: "all",
        description:
          "Trailing commas wherever possible (including function arguments).",
      },
      {
        value: "es5",
        description:
          "Trailing commas where valid in ES5 (objects, arrays, etc.)",
      },
      { value: "none", description: "No trailing commas." },
    ],
  },
  singleAttributePerLine: commonOptions.singleAttributePerLine,
};

export default options;
