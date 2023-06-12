"use strict";

const { isNonEmptyArray } = require("../../common/util.js");
const {
  builders: { hardline, indent, join, line },
} = require("../../document/index.js");
const { isFlowAnnotationComment } = require("../utils/index.js");

function printOptionalToken(path) {
  const node = path.getValue();
  if (
    !node.optional ||
    // It's an optional computed method parsed by typescript-estree.
    // "?" is printed in `printMethod`.
    (node.type === "Identifier" && node === path.getParentNode().key)
  ) {
    return "";
  }
  if (
    node.type === "OptionalCallExpression" ||
    (node.type === "OptionalMemberExpression" && node.computed)
  ) {
    return "?.";
  }
  return "?";
}

function printDefiniteToken(path) {
  return path.getValue().definite ||
    path.match(
      undefined,
      (node, name) =>
        name === "id" && node.type === "VariableDeclarator" && node.definite
    )
    ? "!"
    : "";
}

function printFunctionTypeParameters(path, options, print) {
  const fun = path.getValue();
  if (fun.typeArguments) {
    return print("typeArguments");
  }
  if (fun.typeParameters) {
    return print("typeParameters");
  }
  return "";
}

function printTypeAnnotation(path, options, print) {
  const node = path.getValue();
  if (!node.typeAnnotation) {
    return "";
  }

  const parentNode = path.getParentNode();

  const isFunctionDeclarationIdentifier =
    parentNode.type === "DeclareFunction" && parentNode.id === node;

  if (isFlowAnnotationComment(options.originalText, node.typeAnnotation)) {
    return [" /*: ", print("typeAnnotation"), " */"];
  }

  return [isFunctionDeclarationIdentifier ? "" : ": ", print("typeAnnotation")];
}

function printBindExpressionCallee(path, options, print) {
  return ["::", print("callee")];
}

function printTypeScriptModifiers(path, options, print) {
  const node = path.getValue();
  if (!isNonEmptyArray(node.modifiers)) {
    return "";
  }
  return [join(" ", path.map(print, "modifiers")), " "];
}

function adjustClause(node, clause, hardBreak, forceSpace) {
  if (node.type === "EmptyStatement") {
    return ";";
  }

  if (node.type === "BlockStatement" || forceSpace) {
    return [" ", clause];
  }

  // [prettierx] breakBeforeStatement option
  return indent([hardBreak ? hardline : line, clause]);
}

function printRestSpread(path, options, print) {
  return ["...", print("argument"), printTypeAnnotation(path, options, print)];
}

function printDirective(rawText, options) {
  const rawContent = rawText.slice(1, -1);

  // Check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.
  if (rawContent.includes('"') || rawContent.includes("'")) {
    return rawText;
  }

  const enclosingQuote = options.singleQuote ? "'" : '"';

  // Directives are exact code unit sequences, which means that you can't
  // change the escape sequences they use.
  // See https://github.com/prettier/prettier/issues/1555
  // and https://tc39.github.io/ecma262/#directive-prologue
  return enclosingQuote + rawContent + enclosingQuote;
}

module.exports = {
  printOptionalToken,
  printDefiniteToken,
  printFunctionTypeParameters,
  printBindExpressionCallee,
  printTypeScriptModifiers,
  printTypeAnnotation,
  printRestSpread,
  adjustClause,
  printDirective,
};
