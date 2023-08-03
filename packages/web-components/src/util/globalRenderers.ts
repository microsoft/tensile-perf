import { TreeItemRenderer } from "../types";

export const getTestRenderer = <T>(renderer: string): TreeItemRenderer<T> | null => {
  const renderers = window.__STRESS_TEST__?.renderers;

  if (!renderers) {
    return null;
  }

  const globalRenderer = renderers.get(renderer);
  
  if (!globalRenderer) {
    return renderers.get('__default__') as TreeItemRenderer<T> | null;
  }

  return globalRenderer as TreeItemRenderer<T> | null;
};

export const setTestRenderer = <T>(name: string, renderer: TreeItemRenderer<T>): void => {
  window.__STRESS_TEST__?.renderers?.set(name, renderer);
};

export const appendTestRenderers = (renderers: Map<string, unknown>): void => {
  for (const [name, renderer] of renderers) {
    window.__STRESS_TEST__?.renderers?.set(name, renderer);
  }
};