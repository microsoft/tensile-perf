import { getValue, getValueMs } from './values';
import { decimalFormatter, roundFormatter } from "./formatters";
import type { Browser, Processor, ProcessedMeasurementData } from "../types";

const metricKey: keyof ProcessedMeasurementData = 'geometricMean';

export const processReportMeasurements: Processor = (measurements) => {
    const rows = [];
    for (const { testFile, testType, benchmarks } of measurements) {
        for (const browser of Object.keys(benchmarks)) {
            const { javascriptTime, layoutTime, totalDomSize, shadowDomSize, lightDomSize, memory } = benchmarks[browser as Browser].processedMeasurments ?? {};
            rows.push([ testFile, browser, testType, getValueMs(javascriptTime, metricKey, decimalFormatter), getValueMs(layoutTime, metricKey, decimalFormatter), getValue(totalDomSize, metricKey, roundFormatter), getValue(shadowDomSize, metricKey, roundFormatter), getValue(lightDomSize, metricKey, roundFormatter), getValue(memory, metricKey, decimalFormatter) ]);
        }
    }

    return {
        header: ['Benchmark', 'Browser', 'Test', 'JS time', 'Layout time', 'Total DOM size', 'Shadow DOM size', 'Light DOM size', 'Memory'],
        rows
    };
}