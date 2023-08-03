import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tree } from '../tree/Tree';
import { useMeasure } from '../hooks/usePerformanceMeasure';
import type { TestRenderFunction } from '../types';
import { TestApp } from './TestApp';

export const renderRemoveTest: TestRenderFunction = ({ fixture, itemRenderer, renderTargetSelector, TestWrapper = TestApp, onComplete }) => {
    const Remove = () => {

      const { startMeasure, endMeasure } = useMeasure();
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