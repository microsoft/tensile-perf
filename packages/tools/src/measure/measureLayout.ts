// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import afterframe from 'afterframe';
import type { LayoutMeasureFn } from '../types';

export const measureLayout: LayoutMeasureFn = (measureName = 'tensile-layout', startMark = 'tensile-start-layout') => {
  performance.mark(startMark);

  afterframe(() => {
    performance.measure(measureName, startMark);
  });
};