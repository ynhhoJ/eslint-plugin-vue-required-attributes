import { Rule } from "eslint";
import { AST } from "vue-eslint-parser";

import hasDirectiveKeyArgument from '../guards/hasDirectiveKeyArgument';

const defaultMessage = (tagName: string, missedAttribute: string) => {
  return `"${tagName}" component must have "${missedAttribute}" attribute.`;
};

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Requires specified attribute to be used into tag.',
      recommended: true,
    },
  },

  create: (context) => {
    return context.parserServices.defineTemplateBodyVisitor({
      VElement(node: AST.VElement) {
        const attributesList = context.options[0] || {};
        const attributesObjectKeys = Object.keys(attributesList);

        if (!attributesObjectKeys.length) {
          return;
        }

        const customErrorMessageFunction = context.options[1] || defaultMessage;
        const elementName = node.rawName;

        Object.keys(attributesList).forEach((attributes) => {
          if (!attributesList[attributes].includes(elementName)) {
            return;
          }

          const nodeAttributesList = node.startTag.attributes;
          const attributesNames = nodeAttributesList.map((nodeAttribute) => {
            const { key } = nodeAttribute;

            if (key.type === 'VDirectiveKey' && hasDirectiveKeyArgument(key.argument)) {
              const { rawName } = key.argument;

              return rawName;
            }

            return nodeAttribute.key.name;
          });

          if (attributesNames.includes(attributes)) {
            return;
          }

          context.report({
            message: customErrorMessageFunction(elementName, attributes),
            loc: node.loc,
          });
        });
      }
    });
  },
};

export = rule;
