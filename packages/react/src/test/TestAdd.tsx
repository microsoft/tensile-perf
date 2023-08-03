import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tree } from '../tree/Tree';
import { useMeasure } from '../hooks/usePerformanceMeasure';
import type { TestRenderFunction } from '../types';
import { TestApp } from './TestApp';

export const renderAddTest: TestRenderFunction = ({ fixture, itemRenderer, renderTargetSelector, TestWrapper = TestApp, onComplete }) => {
    const Add = () => {

      const { startMeasure, endMeasure } = useMeasure();
      const [added, setAdded] = React.useState(false);
      React.useEffect(() => {
        setTimeout(() => {
          startMeasure();
          setAdded(true);
        }, 1000);
      }, []);

      React.useLayoutEffect(() => {
        if (added) {
          endMeasure();
          onComplete();
        }
      }, [added])
      
      return (<>
        <Tree tree={fixture.tree} itemRenderer={itemRenderer} />
        {added && <div className="added-element">Just an element that was added</div>}
      </>);
    };
    
    ReactDOM.render(<TestWrapper><Add/></TestWrapper>, document.querySelector(renderTargetSelector));
};