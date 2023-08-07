// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { measureJavascript, measureLayout } from "@tensile-perf/tools";

export const measurePerformance = () => {
  let startTime: number;

  const startMeasure = () => {
    startTime = performance.now();
  }

  const endMeasure = () => {
    measureJavascript(startTime, performance.now());
    measureLayout();
  };

  return { startMeasure, endMeasure };
};