// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { Measurements, ProcessedMeasurementData, ProcessedMeasurements, SimpleMeasurementData } from "./types"

export const processMeasurements = (measurements: Measurements): Measurements => {

    const { benchmarks, ...otherMeasurements } = measurements;
    const result: Measurements = { ...otherMeasurements, benchmarks: { ...benchmarks } };

    for (const browser of Object.keys(benchmarks)) {
        const measures = benchmarks[browser as keyof typeof benchmarks].rawMeasurements;
        const processedMeasurements: Partial<ProcessedMeasurements> = {};
        for (const key of Object.keys(measures[0])) {
            processedMeasurements[key as keyof SimpleMeasurementData] = process(measures, key as keyof SimpleMeasurementData);
        }

        result.benchmarks[browser as keyof typeof benchmarks].processedMeasurments = processedMeasurements as ProcessedMeasurements;

    }

    return result;
}

const process = (measures: SimpleMeasurementData[], key: keyof SimpleMeasurementData): ProcessedMeasurementData => {

    measures.sort((a, b) => a[key] - b[key]);
    return {
        average: measures.reduce((acc, measure) => acc + measure[key], 0) / measures.length,
        median: measures[Math.floor(measures.length / 2)][key],
        geometricMean: Math.exp(measures.reduce((acc, measure) => acc + Math.log(measure[key]), 0) / measures.length),
        low: measures[0][key],
        high: measures[measures.length - 1][key],
    }
};