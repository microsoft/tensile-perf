import { ensureTestGlobals } from "../util/ensureTestGlobals";
import { generateDefaultNode, treeNode } from "./treeNode";
import { appendTestRenderers, getTestRenderer, setTestRenderer } from "../util/globalRenderers";
import type { RandomTreeNode } from "@stress-test/tree";
import type { TreeAttrs } from "../types";


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