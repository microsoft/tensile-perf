import type { RandomTreeNode, RandomTreeSelectorNode, SelectorTreeNode } from '@stress-test/tree'

export type ReactSelectorTreeComponentRenderer = (node: SelectorTreeNode, depth: number, index: number) => JSX.Element;

export type TestProps = {
  componentRenderer: ReactSelectorTreeComponentRenderer;
  tree: RandomTreeNode<RandomTreeSelectorNode>;
  selectors: string[];
  // testOptions: TestOptions;
};

export type TreeItemRendererProps<T> = {
  root: T;
  depth: number;
  index: number;
  attributes?: {[key:string]:string};
} & React.HTMLAttributes<HTMLElement>;

export type TreeItemRenderer<T> = (props: TreeItemRendererProps<T>) => JSX.Element;

export type TreeProps<T extends RandomTreeNode<unknown>> = {
  tree: T;
  itemRenderer: TreeItemRenderer<T> | null;
  renderers?: Map<string, unknown>;
};

export type TreeNodeProps<T extends RandomTreeNode<unknown>> = {
  root: T;
  depth?: number;
  index?: number;
  itemRenderer?: TreeItemRenderer<T> | null;
  attributes?: {[key:string]:string};
} & React.HTMLAttributes<HTMLElement>;

export type RandomUnknown = RandomTreeNode<unknown>;

export type TestRenderParams = {
  fixture: {
      tree: RandomTreeNode<unknown>,
      selectors: string[]
  };
  itemRenderer: (() => React.ReactElement) | null;
  onComplete: () => void;
  action?: () => void;
  renderTargetSelector: string;
  TestWrapper?: React.ComponentType;
};

export type TestRenderFunction = (params: TestRenderParams) => void;

export type TestType =
  | 'mount' 
  | 'add'
  | 'remove'; 
  // | 'invalidate';
export type TestMap = Record<TestType, TestRenderFunction>;