// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { tree } from '../tree/tree';
import { measurePerformance } from '../util/performanceMeasure';
import type { TestRenderFunction } from '../types';

export const renderMountTest: TestRenderFunction = ({ fixture, itemRenderer, renderTargetSelector, onComplete }) => {
    const { startMeasure, endMeasure } = measurePerformance();
    
    const renderRoot = document.querySelector(renderTargetSelector);
    
    startMeasure();

    renderRoot?.appendChild(tree({ tree: fixture.tree, itemRenderer }));

    endMeasure();

    onComplete();
};