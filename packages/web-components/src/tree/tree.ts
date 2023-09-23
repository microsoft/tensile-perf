// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ensureTestGlobals } from "../util/ensureTestGlobals.js";
import { generateDefaultNode, treeNode } from "./treeNode.js";
import { appendTestRenderers, getTestRenderer, setTestRenderer } from "../util/globalRenderers.js";
import type { RandomTreeNode } from "@tensile-perf/tree";
import type { TreeAttrs } from "../types.js";


export const tree = <T extends RandomTreeNode<unknown>>({ tree, itemRenderer, renderers }: TreeAttrs<T>): HTMLElement => {

  ensureTestGlobals();

  if (!getTestRenderer('__default__')) {
    setTestRenderer('__default__', generateDefaultNode(itemRenderer ?? ( () => document.createElement('div') )));
  }

  if (renderers) {
    appendTestRenderers(renderers);
  }

  return treeNode({ root: tree });
}