// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import yargs from 'yargs/yargs';
import { generateConfigFromCliParams } from './testConfig.js';
import { generateFixtures } from './fixture.js';
import { startServer, stopServer } from './server.js';

import type { CliParams } from './types.js';
import { generateTachometerConfig } from './tachometerConfig.js';
import { runTachometer } from './tachometer.js';
// import { copyBenchFile } from './paths.js';

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
    const isProd = !argv.dev;
    if (isProd) {
        process.exit(0);
    }
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
