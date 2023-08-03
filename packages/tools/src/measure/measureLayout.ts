import afterframe from 'afterframe';
import type { LayoutMeasureFn } from '../types';

export const measureLayout: LayoutMeasureFn = (measureName = 'stress-test-layout', startMark = 'stress-test-start-layout') => {
  performance.mark(startMark);

  afterframe(() => {
    performance.measure(measureName, startMark);
  });
};