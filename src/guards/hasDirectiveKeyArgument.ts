import { AST } from "vue-eslint-parser";

export default function hasDirectiveKeyArgument(
  directiveKeyArgument: AST.VIdentifier | AST.VExpressionContainer | null
): directiveKeyArgument is AST.VIdentifier {
  if (!directiveKeyArgument) {
    return false;
  }

  return true;
}
