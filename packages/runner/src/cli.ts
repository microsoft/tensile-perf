// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import yargs from 'yargs/yargs';
import { generateConfigFromCliParams } from './testConfig';
import { generateFixtures } from './fixture';
import { startServer, stopServer } from './server';

import type { CliParams } from './types';
import { generateTachometerConfig } from './tachometerConfig';
import { runTachometer } from './tachometer';
// import { copyBenchFile } from './paths';

export const cli = async (processArgv: NodeJS.Process['argv']) => {
    const argv = yargs(processArgv.slice(2)).options({
        file: {
            type: 'string',
            description: 'Path to file to benchmark. Relative to where test is run from.'
        },
        size: {
            type: 'string',
            choices: ['xs', 's', 'm', 'l', 'xl'],
            default: 'm',
            description: 'Size of the tree to benchmark'
        },
        test: {
            type: 'string',
            choices: ['mount', 'add', 'remove'],
            default: 'mount',
            description: 'Test type to run'
        },
        config: {
            type: 'string',
            description: 'Path to config file. Use this for advanced options. Relative to where test is run from.'
        },
        dev: {
            type: 'boolean',
            description: 'Run in development mode. This will not run Tachometer, useful for debugging.',
        },
    }).parseSync();
    
    await run(argv as CliParams);
    // Not sure why it doesn't exit on its own
    process.exit(0);
}

export const run = async (argv: CliParams) => {
    argv.size ??= 'm';
    argv.test ??= 'mount'
    const isProd = !argv.dev;
    
    const config = await generateConfigFromCliParams(argv as CliParams);
    generateFixtures(config);
    
    // copyBenchFile(config);
    
    startServer(config);
    
    if (isProd) {
        generateTachometerConfig(config);
        await runTachometer();
        return stopServer();
    }

    return undefined;
}
