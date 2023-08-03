import { CssSelectorBuilder } from "./CssSelectorBuilder";
import type { CssSelectorTreeCreator, RandomTreeNodeCreateCallback, RandomTreeSelectorNode } from "../../types";
import { CssSelector } from "./CssSelector";

export const cssSelectorTreeCreator: CssSelectorTreeCreator = ({ selectors = [], chances, seed, nonMatchingSelector, cssSelectorParams }) => {
    
    const selector = new CssSelector(cssSelectorParams);
    const selectorBuilder = new CssSelectorBuilder({ seed, chances, selector, nonMatchingSelector });

    const createSelectorTree: RandomTreeNodeCreateCallback<RandomTreeSelectorNode> = (parent, depth, breadth) => {
        const node = {
            value: {
              name: `${depth}-${breadth}`,
              classNames: selectorBuilder.getNodeClassNames(),
              attributes: selectorBuilder.getAttributes(),
              siblings: [] as string[],
              pseudos: selectorBuilder.getPseudoElementSelectors(),
              renderer: (depth == 0 && breadth == 0) ? 'MailUI' : ''
            },
            children: [],
            parent,
        }

        node.value.siblings = selectorBuilder.getSiblingSelectors(parent, node);

        if (selectorBuilder.shouldBuildDescendentSelector()) {
            const descendentSelector = selectorBuilder.buildDescendentSelector(node);
            selectors.push(descendentSelector);
          } else {
            selectors.push(...selectorBuilder.getSelectorsFromNode(node));
          }
      
          return node;
    };

    return createSelectorTree;
};