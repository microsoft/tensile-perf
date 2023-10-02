// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { tree } from '../tree/tree.js';
import { measurePerformance } from '../util/performanceMeasure.js';
import type { TestRenderFunction } from '../types.js';

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