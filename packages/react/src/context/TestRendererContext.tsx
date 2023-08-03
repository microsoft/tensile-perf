import * as React from 'react';

export type TestRendererContext<T> = {
  renderers: Map<string, T>;
  appendRenderers: (renderers: Map<string, T>) => void;
}

const defaultContext: TestRendererContext<unknown> = {
  renderers: new Map(),
  appendRenderers: (renderers) => {
    for (const [name, renderer] of renderers) {
      defaultContext.renderers.set(name, renderer);
    }
  },
}

const TestRendererContext = React.createContext<TestRendererContext<unknown>>(defaultContext);

export const useTestRenderer = <T,>(renderer: string | T): T | null=> {

  const ctx = React.useContext(TestRendererContext);

  if (renderer && typeof renderer !== 'string') {
    return renderer;
  }

  if (!ctx) {
    return null;
  }

  const ctxRenderer = ctx.renderers.get(renderer as string);

  if (!ctxRenderer) {
    return ctx.renderers.get('__default__') as T ?? null;
  }

  return ctxRenderer as T;
};

export const useTestRendererContext = () => {
  return React.useContext(TestRendererContext);
};

export const TestRendererProvider: React.FC<Partial<TestRendererContext<unknown>>> = ({ children, renderers }) => {

  const ctx = useTestRendererContext();
  const nextCtx = React.useMemo(() => {
    return shallowMerge(ctx, { renderers })
  }, [ctx, renderers]);


  return <TestRendererContext.Provider value={nextCtx}>{children}</TestRendererContext.Provider>
};


function shallowMerge<T>(a: TestRendererContext<T>, b: Partial<TestRendererContext<T>>): TestRendererContext<T> {
  if (b) {
    return { 
      ...a, ...b, 
      renderers: b.renderers ? new Map([...a.renderers, ...b.renderers]) : a.renderers
    };
  }

  return a;
}