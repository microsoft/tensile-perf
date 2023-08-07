// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { CssSelector } from "./tree/css/CssSelector";

export type Attribute = {
    key: string;
    value: string | undefined;
    selector: string;
  };

export type RandomTreeSelectorNode = {
  name: string;
  classNames: string[];
  attributes: Attribute[];
  siblings: string[];
  pseudos: string[];
};

export type SelectorTreeNode = RandomTreeNode<RandomTreeSelectorNode>;

export type RandomTreeNode<T> = {
  value: T;
  children: RandomTreeNode<T>[];
  parent: RandomTreeNode<T> | null;
};

export type RandomTreeBuilderParams = {
    minDepth?: number;
    maxDepth?: number;
    minBreadth?: number;
    maxBreadth?: number;
    seed?: number;
    targetSize?: number;
  };
  
export type RandomTreeNodeCreateCallback<T> = (parent: RandomTreeNode<T> | null, depth: number, breath: number) => RandomTreeNode<T>;
export type RandomTreeNodeVisitCallback<T> = (node: RandomTreeNode<T>) => void;

export type CssSelectorTreeParams = {
  selectors?: string[], 
  selector?: CssSelector,
  chances?: CssSelectorChances, 
  seed?: number, 
  nonMatchingSelector?: string,
  cssSelectorParams?: CssSelectorParams
};

export type CssSelectorTreeCreator = (params: CssSelectorTreeParams) => RandomTreeNodeCreateCallback<RandomTreeSelectorNode>;
export type CssSelectorChances = {
  not: number;
  addClassName: number;
  addAttribute: number;
  buildDescendentSelector: number;
  addSibling: number;
  addPseudoElement: number;
  useDescendantCombinator: number;
  useNonMatchingSelector: number;
};

export type CssSelectorType = 'class' | 'tag' | 'nth-child' | 'pseudo-element' | 'not-class' | 'not-attribute' | 'attribute-name' | 'attribute-value';
export type CssSelectorParams = {
  seed?: number;
  selectorTypes?: CssSelectorType[];
  tags?: string[];
  classNames?: string[];
  attributeNames?: string[];
  attributeValues?: string[];
};