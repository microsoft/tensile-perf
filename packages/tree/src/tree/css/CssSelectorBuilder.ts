import { getRandomUtil } from "@stress-test/tools";
import { CssSelector } from "./CssSelector";
import type { Attribute, CssSelectorChances, CssSelectorTreeParams, RandomTreeNode, RandomTreeSelectorNode } from "../../types";
import type { RandomUtil } from "@stress-test/tools";

const DEFAULT_SELECTOR_CHANCES: CssSelectorChances = {
  not: 0.05,
  addClassName: 0.5,
  addAttribute: 0.2,
  buildDescendentSelector: 0.5,
  addSibling: 0.1,
  addPseudoElement: 0.1,
  useDescendantCombinator: 0.2,
  useNonMatchingSelector: 0.5,
};

const DEFAULT_NON_MATCHING_SELECTOR = ".non-matching-selector";

type IncludeOptions = {
  [k in keyof RandomTreeSelectorNode]?: boolean;
};

export class CssSelectorBuilder {
  private rando: RandomUtil;
  private chances: CssSelectorChances;
  private nonMatchingSelector: string;
  private selector: CssSelector;

  constructor({ seed, chances, selector, nonMatchingSelector = DEFAULT_NON_MATCHING_SELECTOR}: CssSelectorTreeParams = {}) {
    this.rando = getRandomUtil(seed);
    this.chances = { ...DEFAULT_SELECTOR_CHANCES, ...chances };
    this.nonMatchingSelector = nonMatchingSelector;
    this.selector = selector ?? new CssSelector({ seed });
  }

  public shouldBuildDescendentSelector = (): boolean => {
    return this.rando.coin(this.chances.buildDescendentSelector);
  }
  
  public buildDescendentSelector = <T extends RandomTreeSelectorNode>(
    node: RandomTreeNode<T> | null,
    selector?: string,
  ): string => {
    if (!node) {
      return selector ?? '';
    }

    if (!selector) {
      selector = this.rando.choice(this.getSelectorsFromNode(node, { pseudos: false })) as string;
    }

    const parent = node.parent;

    if (!parent) {
      return selector;
    }

    let selectorChoices = this.getSelectorsFromNode(parent, { pseudos: false });
    if (this.rando.coin(this.chances.useNonMatchingSelector)) {
      selectorChoices = [...selectorChoices, this.nonMatchingSelector];
    }

    selector = (
      this.maybeNot(this.rando.choice(selectorChoices) as string) +
      (this.rando.coin(this.chances.useDescendantCombinator) ? ' > ' : ' ') +
      selector
    ).trim();

    if (this.rando.coin(this.chances.buildDescendentSelector)) {
      selector = this.buildDescendentSelector(node.parent, selector);
    }

    return selector;
  };
      
  public getNodeClassNames = () => {
    const nodeSelectors = [this.selector.randomSelector(['class'])];
    if (this.rando.coin(this.chances.addClassName)) {
      nodeSelectors.push(this.selector.randomSelector(['class']));
    }
  
    return nodeSelectors;
  };
  
  public maybeNot = (selector: string): string => {
    if (this.rando.coin(this.chances.not)) {
      return `:not(${selector})`;
    }
  
    return selector;
  };
  
  public getAttributes = () => {
    const attributes = [] as Attribute[];
    if (this.rando.coin(this.chances.addAttribute)) {
      const selector = this.selector.randomSelector(['attribute-name', 'attribute-value']);
      const [key, value] = selector.replace(/(\[|\])/g, '').split('=');
      attributes.push({ key, value, selector });
    }
  
    return attributes;
  };
  
  public getSiblingSelectors = (
    parent: RandomTreeNode<RandomTreeSelectorNode> | null,
    node: RandomTreeNode<RandomTreeSelectorNode>,
  ) => {
    const siblings = [] as string[];
  
    if (parent && this.rando.coin(this.chances.addSibling)) {
      const combinator = this.rando.choice(['nth-child', '~', '+']);
      if (combinator === 'nth-child') {
        siblings.push(this.selector.randomSelector(['nth-child']));
      } else {
        const sibling = this.rando.choice(parent.children) as RandomTreeNode<RandomTreeSelectorNode>;
        if (!sibling) {
          return siblings;
        }
        const siblingSelectorType = this.rando.choice(['classNames', 'attribute']);
        let siblingSelector;
        if (siblingSelectorType === 'classNames') {
          siblingSelector = this.rando.choice(sibling.value.classNames) ?? '*';
        } else {
          siblingSelector = (this.rando.choice(sibling.value.attributes) as Attribute)?.selector ?? '*';
        }
  
        const nodeSelectorType = this.rando.choice(['classNames', 'attribute']);
        let nodeSelector;
        if (nodeSelectorType === 'classNames') {
          nodeSelector = this.rando.choice(node.value.classNames) ?? '*';
        } else {
          nodeSelector = (this.rando.choice(node.value.attributes) as Attribute)?.selector ?? '*';
        }
        siblings.push(`${siblingSelector} ${combinator} ${nodeSelector}`);
      }
    }
  
    return siblings;
  };
  
  public getPseudoElementSelectors = () => {
    const pseudo = [] as string[];
  
    if (this.rando.coin(this.chances.addPseudoElement)) {
      pseudo.push(this.selector.randomSelector(['pseudo-element']));
    }
  
    return pseudo;
  };
  
  
  public getSelectorsFromNode = (node: RandomTreeNode<RandomTreeSelectorNode>, include?: IncludeOptions): string[] => {
    const { classNames = true, attributes = true, siblings = true, pseudos = true } = include ?? {};
  
    let selectors = [] as string[];
  
    if (classNames) {
      selectors = selectors.concat(...node.value.classNames);
    }
  
    if (attributes) {
      selectors = selectors.concat(...node.value.attributes.map(attr => attr.selector));
    }
  
    if (siblings) {
      selectors = selectors.concat(...node.value.siblings);
    }
  
    if (pseudos) {
      selectors = selectors.concat(...node.value.pseudos);
    }
  
    return selectors;
  };
}
