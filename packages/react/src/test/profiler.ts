// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type GetProfilerOnRender = () => React.ProfilerOnRenderCallback;
import { measureLayout } from '@tensile-perf/tools';

// Leaving this here because it was useful/needed in the previous
// version of tensile but I cannot recall why.
// export const getProfilerOnRender: GetProfilerOnRender = () => {
//     let start: number;
//     let timeoutId: number;
//     return (_profilerId, _mode, _actualTime, _baseTime, startTime, commitTime) => {
//       if (!start) {
//         start = startTime;
//       }
  
//       // If the renderer is called again clear the timeout.
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }

//       measureLayout();
//       timeoutId = window.setTimeout(() => {
//         requestAnimationFrame(() => {
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           // @ts-ignore
//           performance.measure('stress', {
//             start,
//             end: performance.now(),
//           });
//         });
//       }, 20);

//     };
// };

export const profilerOnRender: React.ProfilerOnRenderCallback = (_profilerId, _mode, _actualTime, _baseTime, startTime, _commitTime) => {
  performance.measure('tensile-javascript', {
    start: startTime,
    end: performance.now()
  });

  measureLayout();
}