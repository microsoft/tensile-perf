import { RandomTreeNode } from "@stress-test/tree";

declare global {
  interface Window {
    __STRESS_TEST__: {
      renderers?: Map<string, unknown>;
    }
  }
}

export type TreeItemRendererProps<T> = {
  root: T;
  depth: number;
  index: number;
} & Partial<HTMLElement>;

export type TreeItemRenderer<T> = (attrs: TreeItemRendererProps<T>) => HTMLElement;

export type TreeAttrs<T extends RandomTreeNode<unknown>> = {
  tree: T;
  itemRenderer: TreeItemRenderer<T> | null;
  renderers?: Map<string, unknown>;
};

export type TreeNodeAttrs<T extends RandomTreeNode<unknown>> = {
  root: T;
  depth?: number;
  index?: number;
  itemRenderer?: TreeItemRenderer<T> | null;
} & Partial<HTMLElement>;

export type TestRenderParams = {
  fixture: {
      tree: RandomTreeNode<unknown>,
      selectors: string[]
  };
  renderTargetSelector: string;
  onComplete: () => void;
  itemRenderer: (() => HTMLElement) | null;
  action?: () => void;
  testWrapper?: (child: HTMLElement) => HTMLElement;
};

export type TestRenderFunction = (params: TestRenderParams) => void;

export type TestType =
  | 'mount' 
  | 'add'
  | 'remove'; 
  // | 'invalidate';
export type TestMap = Record<TestType, TestRenderFunction>;
