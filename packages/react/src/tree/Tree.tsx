// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as React from 'react';
import type { RandomTreeNode } from '@tensile-perf/tree'
import type { TreeProps } from '../types.js';
import { TreeNode, generateDefaultNode } from './TreeNode.js';
import { useTestRendererContext } from '../context/TestRendererContext.js';

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
