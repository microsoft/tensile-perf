import * as React from 'react';
import { useTestRenderer } from '../context/TestRendererContext';
import type { TreeItemRenderer, TreeNodeProps } from '../types';
import type { Attribute, RandomTreeNode } from '@tensile-perf/tree';

type TreeValue = {
  classNames?: string[];
  attributes?: Attribute[];
  renderer: string;
}

const EMPTY_OBJECT = {} as { [key: string]: string };

// Generic wrapper that parses the information from the fixture/
export const TreeNode = <T extends RandomTreeNode<unknown>>(props: TreeNodeProps<T>): JSX.Element => {
  const { root, className, depth = 0, index = 0, itemRenderer, ...others } = props;
  if (!root) return <div/>;
  const { value } = root;

  const Renderer = useTestRenderer<TreeItemRenderer<T>>(itemRenderer ?? (value as TreeValue).renderer);
  if (!Renderer) {
    throw new Error('no Renderer set!');
  }

  const cn = (value as TreeValue)?.classNames?.map(cn => cn.substring(1)).join(' ') ?? '';
  const attrs = (value as TreeValue)?.attributes?.reduce((map, attr) => {
    map[attr.key] = attr.value ?? '';
    return map;
  }, EMPTY_OBJECT) ?? EMPTY_OBJECT;

  return <Renderer root={root} depth={depth} index={index} className={cn} attributes={attrs} {...others} />
}

// Generator that wraps simple components in the "Components must render their children" paradigm.
export const generateDefaultNode = <T extends RandomTreeNode<unknown>>(renderer: TreeItemRenderer<T>) : TreeItemRenderer<T> => {
  const ComponentRenderer: TreeItemRenderer<T> = (props) => {
    const { root, depth, index, className, attributes, ...others } = props;
    return <div className={`tree-node ${className} depth-${depth} index-${index}`} {...attributes} {...others}>
            {renderer({ root, depth, index })}
            {root.children.map((child : any, i : number) => {
              return <TreeNode root={child} key={i} depth={depth+1} index={index+1} />;
            })}
          </div>
  }
  return ComponentRenderer;
}