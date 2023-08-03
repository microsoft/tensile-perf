export const ensureTestGlobals = (): void => {
  if (!window.__STRESS_TEST__) {
    window.__STRESS_TEST__ = {
      renderers: new Map(),
    };
  } else if (!window.__STRESS_TEST__.renderers) {
    window.__STRESS_TEST__.renderers = new Map();
  }
}