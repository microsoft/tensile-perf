// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tree } from '../tree/Tree.js';
import { usePerformanceMeasure } from '../hooks/usePerformanceMeasure.js';
import type { TestRenderFunction } from '../types.js';
import { TestApp } from './TestApp.js';

export const renderRemoveTest: TestRenderFunction = ({ fixture, itemRenderer, renderTargetSelector, TestWrapper = TestApp, onComplete }) => {
    const Remove = () => {

      const { startMeasure, endMeasure } = usePerformanceMeasure();
      const [removed, setRemoved] = React.useState(false);
      React.useEffect(() => {
        setTimeout(() => {
          startMeasure();
          setRemoved(true);
        }, 1000);
      }, []);

      React.useLayoutEffect(() => {
        if (removed) {
          endMeasure();
          onComplete();
        }
      }, [removed])
      
      return (<>
        <Tree tree={fixture.tree} itemRenderer={itemRenderer} />
        {!removed && <div className="added-element">Just an element that will be removed</div>}
      </>);
    };
    
    ReactDOM.render(<TestWrapper><Remove/></TestWrapper>, document.querySelector(renderTargetSelector));
};