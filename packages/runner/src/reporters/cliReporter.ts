// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Table from 'cli-table';
import { processReportMeasurements } from "./processReportMeasurements";
import type { Reporter } from "../types";

export const cliReporter: Reporter = (measurements) => {
    const processed = processReportMeasurements(measurements);
    const table = new Table({
        head: processed.header
    });
    
    table.push(...processed.rows);

    return table.toString();
};
