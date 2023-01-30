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
      description: 'Requires specified attribute to be used in component.',
      recommended: true,
    },
  },

  create: (context) => {
    return context.parserServices.defineTemplateBodyVisitor({
      VElement(node: AST.VElement) {
        const options = context.options[0] || {};
        const optionsObjectKeys = Object.keys(options);

        if (!optionsObjectKeys.length) {
          return;
        }

        const optionsSecond = context.options[1] || defaultMessage;
        const elementName = node.rawName;

        Object.keys(options).forEach((key) => {
          const includesKey = options[key].includes(elementName);

          if (!includesKey) {
            return;
          }

          const elementAttributes = node.startTag.attributes;
          const attributesName = elementAttributes.map((item) => {
            const itemKey = item.key;

            if (itemKey.type === 'VDirectiveKey' && hasDirectiveKeyArgument(itemKey.argument)) {
              const itemArgument = itemKey.argument;

              return itemArgument.rawName;
            }

            return item.key.name;
          });

          if (attributesName.includes(key)) {
            return;
          }

          context.report({
            message: optionsSecond(elementName, key),
            loc: node.loc,
          });
        });
      }
    });
  },
};

export = rule;
