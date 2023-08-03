import type { Formatter, ProcessedMeasurementData } from "../types";

const unknown = '<unknown>';

const noopFormatter: Formatter = (value) => value;

export const getValue = (measurement: ProcessedMeasurementData | undefined, key: keyof ProcessedMeasurementData, formatter = noopFormatter): string => {
    const value = measurement?.[key];

    if (value === undefined) {
        return unknown;
    }

    return formatter(value).toString();
};

export const getValueMs = (measurement: ProcessedMeasurementData | undefined, key: keyof ProcessedMeasurementData, formatter = noopFormatter): string => {
    const value = getValue(measurement, key, formatter);
    if (value === unknown) {
        return value;
    }

    return `${value}ms`;
};