// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { Tree } from '../tree/Tree';
// import { useMeasure } from '../hooks/usePerformanceMeasure';
// // eslint-disable-next-line
// import useContextSelector from 'use-context-selector';

// import type { TestRenderFunction } from '../types';

// type InvalidateContextValue = {
//   action?: () => void;
//   invalidated: boolean;
// };

// // eslint-disable-next-line
// // @ts-ignore
// const InvalidateContext = useContextSelector.createContext<InvalidateContextValue>({});
// const InvalidateProvider = InvalidateContext.Provider;

// export const useInvalidateContext = <T,>(selector: (value: InvalidateContextValue) => T) => {
//   return useContextSelector.useContextSelector(InvalidateContext, selector);
// };

// export const renderInvalidateTest: TestRenderFunction = ({ fixture, itemRenderer, action, renderTargetSelector }) => {
//     const App = () => {

//       // if (!action) {
//       //   throw new Error(`"action" must be defined for invalidation tests.`);
//       // }

//       const { startMeasure, endMeasure } = useMeasure();
//       const [invalidated, setInvalidated] = React.useState(false);
//       React.useEffect(() => {
//         console.log('useEffect');
//         setTimeout(() => {
//           startMeasure();
//           console.warn('invalidated');
//           setInvalidated(true);
//         }, 1000);
//       }, []);

//       React.useLayoutEffect(() => {
//         console.log('useLayoutEffect')
//         if (invalidated) {
//           requestAnimationFrame(() => {
//             console.warn('end invalidated')
//             endMeasure();
//           })
//         }
//       }, [invalidated])

//       const contextValue: InvalidateContextValue = React.useMemo(() => {
//         return { action, invalidated };
//       }, [action, invalidated])
      
//       return (
//         <InvalidateProvider value={contextValue}>
//           <Tree tree={fixture.tree} itemRenderer={itemRenderer} />
//         </InvalidateProvider>
//       );
//     };
    
//     ReactDOM.render(<App/>, document.querySelector(renderTargetSelector));
// };