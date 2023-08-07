// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type CliParams = {
    file: string;
    size: string;
    test: string;
    config: string;
    dev: boolean;
};

export type Browser = 'chrome' | 'edge' | 'firefox' | 'safari';

export type ConfigFile = Partial<{
    file: string;
    size: string;
    test: string;
    browsers: Browser[];
    numRuns: number;
    imports: Record<string, string>;
    scripts: string[];
    cssSheets: string[];
    metrics: Partial<ConfigMetrics>;
    parameters: Partial<FixtureParams>;
    extends: string;
}>;

export type Config = {
    file: string;
    testFile: string;
    size: string;
    test: string;
    browsers: Browser[];
    numRuns: number;
    fixtureFileName: string;
    imports?: Record<string, string>;
    scripts?: string[];
    cssSheets?: string[];
    metrics?: ConfigMetrics;
    parameters?: FixtureParams;
};

export type ConfigMetrics = {
    memory: boolean;
    domSize: boolean;
}

export type FixtureParams = {
    seed: number;
    minBreadth: number;
    maxBreadth: number;
    minDepth: number;
    maxDepth: number;
    targetSize: number;
};

export type FixtureSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type TreeJsonReplacer = (key: string, value: unknown) => unknown;

export type MeasurementData = {
    /**
     * Name of the fixture used in the test.
     */
    testFixture: string;

    /**
     * Name of the benchmark test file.
     */
    testFile: string;

    /**
     * Type of benchmark test.
     */
    testType: string;

    /**
     * Fixture parameters used to generate the test.
     */
    testParameters: FixtureParams;

    /**
     * Javascript execution time in milliseconds.
     */
    javascriptTime: number;

    /**
     * Style recalculation, layout, paint, etc. time in milliseconds.
     */
    layoutTime: number;

    /**
     * Total memory usage at end of test in bytes.
     * NOTE: implementation dependent, not available in all browsers and 
     * not meant for comparison between browsers (or even different version of the same browser).
     * For more details see: https://developer.mozilla.org/en-US/docs/Web/API/Performance/measureUserAgentSpecificMemory
     */
    memory: number;

    /**
     * Total number of light DOM nodes in the document.
     * Retrieved with `document.querySelectorAll('*').length`.
     * NOTE: this will include custom elements that are in the light DOM (e.g., <body><my-element></my-element></body>)
     */
    lightDomSize: number;

    /**
     * Total number of DOM elements in all shadow hosts in the document.
     * Retrieved with `shadowRoot.querySelectorAll('*').length` on each shadow host.
     * NOTE: this is recursive so it will find nests shadow hosts (e.g., <my-element><my-nested-element></my-nested-element></my-element>)
     */
    shadowDomSize: number;

    /**
     * Sum of `lightDomSize` and `shadowDomSize`.
     * No magic here just for convenience!
     */
    totalDomSize: number;
};

export type SimpleMeasurementData = Omit<MeasurementData, 'testFixture' | 'testFile' | 'testType' | 'testParameters'>;
export type MeasurementBenchmark = {
    processedMeasurments?: ProcessedMeasurements;
    rawMeasurements: SimpleMeasurementData[];
};

export type Measurements = {
    platform: string;
    architecture: string;
    date: Date,
    testFile: string;
    fixtureName: string;
    fixtureParams: FixtureParams | null;
    testType: string;
    benchmarks: Record<Browser, MeasurementBenchmark>;
};

export type ProcessedMeasurementData = {
    average: number;
    median: number;
    geometricMean: number;
    low: number;
    high: number;
};

export type ProcessedMeasurements = Record<keyof SimpleMeasurementData, ProcessedMeasurementData>;

export type Processor = (measurements: Measurements[]) => { header: string[], rows: string[][] };
export type Reporter = (measurements: Measurements[]) => string;
export type Formatter = (value: number) => number;
export type ValueGetter = (measurement: ProcessedMeasurementData | undefined, key: keyof ProcessedMeasurementData, formatter?: Formatter) => string;