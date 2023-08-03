import type { JavascriptMeasureFn } from '../types';

export const measureJavascript: JavascriptMeasureFn = (start, end, measureName = 'stress-test-javascript' ) => {
    performance.measure(measureName, {
        start,
        end
    });
};