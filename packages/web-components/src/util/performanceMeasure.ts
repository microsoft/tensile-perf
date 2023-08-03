import { measureJavascript, measureLayout } from "@stress-test/tools";

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