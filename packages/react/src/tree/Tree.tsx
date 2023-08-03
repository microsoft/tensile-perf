import * as React from 'react';
import type { RandomTreeNode } from '@stress-test/tree'
import type { TreeProps } from '../types';
import { TreeNode, generateDefaultNode } from './TreeNode';
import { useTestRendererContext } from '../context/TestRendererContext';

export const Tree = <T extends RandomTreeNode<unknown>>({ tree, itemRenderer, renderers }: TreeProps<T>): JSX.Element => {

  const testRendererContext = useTestRendererContext();
  if (!testRendererContext.renderers.has('__default__')) {
    testRendererContext.renderers.set('__default__', generateDefaultNode(itemRenderer ?? ( ()=><div/> )));
  }

  if (renderers) {
    testRendererContext.appendRenderers(renderers);
  }

  return <TreeNode root={tree as T} />
};
