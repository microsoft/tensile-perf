// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { tree } from '../tree/tree';
import { measurePerformance } from '../util/performanceMeasure';
import type { TestRenderFunction } from '../types';

export const renderAddTest: TestRenderFunction = ({ fixture, itemRenderer, renderTargetSelector, onComplete }) => { 
  const { startMeasure, endMeasure } = measurePerformance();

  const renderRoot = document.querySelector(renderTargetSelector);

  renderRoot?.appendChild(tree({ tree: fixture.tree, itemRenderer }));

  setTimeout(() => {
    startMeasure();
    const addedElement = document.createElement('div');
    addedElement.classList.add('added-element');
    addedElement.textContent = 'Just an element that was added';
    renderRoot?.appendChild(addedElement);
    endMeasure();

    onComplete();
  }, 1000);
};