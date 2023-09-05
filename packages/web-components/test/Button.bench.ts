const itemRenderer = (): HTMLElement => {
  const btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Simple HTML Button'));

  return btn;
};

export default itemRenderer;
// eslint-disable-next-line @nx/enforce-module-boundaries
export { tests } from '@tensile-perf/web-components';
