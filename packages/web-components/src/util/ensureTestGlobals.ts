export const ensureTestGlobals = (): void => {
  if (!window.__TENSILE__) {
    window.__TENSILE__ = {
      renderers: new Map(),
    };
  } else if (!window.__TENSILE__.renderers) {
    window.__TENSILE__.renderers = new Map();
  }
}