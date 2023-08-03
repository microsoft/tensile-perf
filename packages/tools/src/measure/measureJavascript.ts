import type { JavascriptMeasureFn } from '../types';

export const measureJavascript: JavascriptMeasureFn = (start, end, measureName = 'tensile-javascript' ) => {
    performance.measure(measureName, {
        start,
        end
    });
};