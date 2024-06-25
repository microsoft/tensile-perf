// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tree } from '../tree/Tree.js';
import { usePerformanceMeasure } from '../hooks/usePerformanceMeasure.js';
import type { TestRenderFunction } from '../types.js';
import { TestApp } from './TestApp.js';

export const renderMountTest: TestRenderFunction = ({ fixture, itemRenderer, renderTargetSelector, TestWrapper = TestApp, onComplete }) => {
    const Mount = () => {

        const { startMeasure, endMeasure } = usePerformanceMeasure();
        startMeasure();
        React.useLayoutEffect(() => {
            endMeasure();
            onComplete();
        }, [])

        return <Tree tree={fixture.tree} itemRenderer={itemRenderer} />;
    };
    
    ReactDOM.render(<TestWrapper><Mount/></TestWrapper>, document.querySelector(renderTargetSelector));
};