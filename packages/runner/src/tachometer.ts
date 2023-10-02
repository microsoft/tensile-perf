// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { main } from 'tachometer/lib/cli.js';
import { getTachometerConfigFilePath, getTestResultFilePath } from './paths.js';
import path from 'path';

type RunTachometerFn = () => Promise<void>;

export const runTachometer: RunTachometerFn = async () => {

  const tachCommands: string[] = [
    `--json-file=${path.join(getTestResultFilePath(), `tachometer.json`)}`,
    `--config=${path.join(getTachometerConfigFilePath(), `tachometer.json`)}`,
  ];

  const tachResults = await main(tachCommands);

  if (!tachResults) {
    throw new Error("No Tachometer results!");
  }

  for (const tachResult of tachResults) {
    const name = tachResult.result.name;
    const low = tachResult.stats.meanCI.low.toFixed(2);
    const high = tachResult.stats.meanCI.high.toFixed(2);
    console.log(`${name}: ${low}ms - ${high}ms`);
  }
};