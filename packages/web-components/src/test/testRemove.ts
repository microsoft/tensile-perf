import { tree } from '../tree/tree';
import { measurePerformance } from '../util/performanceMeasure';
import type { TestRenderFunction } from '../types';

export const renderRemoveTest: TestRenderFunction = ({ fixture, itemRenderer, renderTargetSelector, onComplete }) => { 
  const { startMeasure, endMeasure } = measurePerformance();

  const renderRoot = document.querySelector(renderTargetSelector);

  renderRoot?.appendChild(tree({ tree: fixture.tree, itemRenderer }));
  const addedElement = document.createElement('div');
  addedElement.classList.add('added-element');
  addedElement.textContent = 'Just an element that was added';
  renderRoot?.appendChild(addedElement);

  setTimeout(() => {
    startMeasure();
    renderRoot?.removeChild(addedElement);
    endMeasure();
    onComplete();
  }, 1000);
};