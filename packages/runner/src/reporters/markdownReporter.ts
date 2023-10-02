// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { markdownTable } from "markdown-table";
import { processReportMeasurements } from "./processReportMeasurements.js";
import { Reporter } from "../types.js";

export const markdownReporter: Reporter = (measurements) => {
    const processed = processReportMeasurements(measurements);

    return markdownTable([
        processed.header,
        ...processed.rows
    ]);
};

