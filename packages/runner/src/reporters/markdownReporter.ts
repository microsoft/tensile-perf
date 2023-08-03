import { markdownTable } from "markdown-table";
import { processReportMeasurements } from "./processReportMeasurements";
import { Reporter } from "../types";

export const markdownReporter: Reporter = (measurements) => {
    const processed = processReportMeasurements(measurements);

    return markdownTable([
        processed.header,
        ...processed.rows
    ]);
};

