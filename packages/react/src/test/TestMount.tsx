// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tree } from '../tree/Tree';
import { useMeasure } from '../hooks/usePerformanceMeasure';
import type { TestRenderFunction } from '../types';
import { TestApp } from './TestApp';

export const renderMountTest: TestRenderFunction = ({ fixture, itemRenderer, renderTargetSelector, TestWrapper = TestApp, onComplete }) => {
    const Mount = () => {

        const { startMeasure, endMeasure } = useMeasure();
        startMeasure();
        React.useLayoutEffect(() => {
            endMeasure();
            onComplete();
        }, [])

        return <Tree tree={fixture.tree} itemRenderer={itemRenderer} />;
    };
    
    ReactDOM.render(<TestWrapper><Mount/></TestWrapper>, document.querySelector(renderTargetSelector));
};