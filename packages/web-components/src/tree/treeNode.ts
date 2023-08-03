import type { Attribute, RandomTreeNode } from '@tensile-perf/tree';
import { TreeItemRenderer, TreeNodeAttrs } from '../types';
import { getTestRenderer } from '../util/globalRenderers';

type TreeValue = {
  classNames?: string[];
  attributes?: Attribute[];
  renderer: string;
};

const EMPTY_OBJECT = {};

export const treeNode = <T extends RandomTreeNode<unknown>>(attrs: TreeNodeAttrs<T>): HTMLElement => {
  const { root, depth = 0, index = 0, itemRenderer, ...others } = attrs;

  if (!root) {
    return document.createElement('div');
  }

  const { value } = root;
  const renderer = itemRenderer ?? getTestRenderer((value as TreeValue).renderer);

  if (!renderer) {
    throw new Error('no Renderer set!');
  }

  const testAttrs = (value as TreeValue)?.attributes?.reduce((map, attr) => {
    map[attr.key] = attr.value ?? '';
    return map;
  }, {} as { [key: string]: string }) ?? EMPTY_OBJECT

  const rendererAttrs = {
    'class': (value as TreeValue)?.classNames?.map(cn => cn.substring(1)).join(' ') ?? '',
    ...testAttrs,
    ...others,
  };

  const el = renderer({ root, depth, index, ...rendererAttrs });

  return el;
}

// Generator that wraps simple components in the "Components must render their children" paradigm.
export const generateDefaultNode = <T extends RandomTreeNode<unknown>>(renderer: TreeItemRenderer<T>) : TreeItemRenderer<T> => {
  const componentRenderer: TreeItemRenderer<T> = (props) => {
    const { root, depth, index, className } = props;

    const div = document.createElement('div');
    div.classList.add('tree-node')
    if (className) {
      div.classList.add(className);
    }
    div.classList.add(`depth-${depth}`, `index-${index}`);

    const child = renderer({ root, depth, index });
    div.appendChild(child);

    root.children.forEach((child : RandomTreeNode<unknown>) => {
      div.appendChild(treeNode({ root: child, depth: depth+1, index: index+1 }));
    });

    return div;
  }

  return componentRenderer;
}


// export type VanillaTreeItemRenderer<T> = (node: T, depth: number, index: number) => HTMLElement;

// export const renderVanillaTree = <T extends TreeNode<unknown>>(
//   tree: T,
//   itemRenderer: VanillaTreeItemRenderer<T>,
//   depth: number = 0,
//   index: number = 0,
// ): HTMLElement => {
//   const root = document.createElement('div');
//   root.classList.add('vanilla-tree-node');

//   const { value } = tree;

//   /* eslint-disable @typescript-eslint/ban-ts-comment */
//   // @ts-ignore
//   root.classList.add(...value.classNames.map(cn => cn.substring(1)));
//   // @ts-ignore
//   value.attributes.forEach(attr => {
//     root.setAttribute(attr.key, attr.value ?? '');
//   });

//   root.appendChild(itemRenderer(tree, depth, index));

//   tree.children.forEach((child, i) => {
//     const node = renderVanillaTree(child as T, itemRenderer, depth + 1, i + 1);
//     root.appendChild(node);
//   });

//   return root;
// };
