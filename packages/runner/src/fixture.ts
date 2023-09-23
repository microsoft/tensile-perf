// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { cssSelectorTreeCreator, RandomTreeBuilder } from '@tensile-perf/tree';
import type { RandomTreeSelectorNode } from '@tensile-perf/tree';

import fs from 'fs';
import { join } from 'path';
import { getConfigFilePath } from './paths.js';

import type { Config, ConfigFile, FixtureParams, FixtureSize, TreeJsonReplacer } from './types';

export const DEFAULT_FIXTURES: Record<FixtureSize, FixtureParams> = {
    xs: {
        seed: 4212021,
        minBreadth: 1,
        maxBreadth: 5,
        minDepth: 1,
        maxDepth: 5,
        targetSize: 250,
    },
    s: {
        seed: 4212021,
        minBreadth: 2,
        maxBreadth: 10,
        minDepth: 2,
        maxDepth: 10,
        targetSize: 500,
    },
    m: {
        seed: 4212021,
        minBreadth: 4,
        maxBreadth: 20,
        minDepth: 4,
        maxDepth: 20,
        targetSize: 1000,
    },
    l: {
        seed: 4212021,
        minBreadth: 8,
        maxBreadth: 40,
        minDepth: 8,
        maxDepth: 40,
        targetSize: 2000,
    },
    xl: {
        seed: 4212021,
        minBreadth: 16,
        maxBreadth: 80,
        minDepth: 16,
        maxDepth: 80,
        targetSize: 4000,
    }
};

const treeJsonReplace: TreeJsonReplacer = (key, value) => {
    if (key === 'parent') {
        return undefined;
    }

    return value;
}

export const generateFixtureFileName = (fixtureParams: FixtureParams, name?: string) => {

    if (name) {
        return `fixture__${name}.js`;
    }

    const fixtureName = [] as string[];

    Object.keys(fixtureParams).forEach(key => {
        fixtureName.push(`${key}-${fixtureParams[key as keyof FixtureParams]}`);
    });

    return `fixture__${fixtureName.join('_')}.js`;

}

export const generateFixtures = (config: Config): void => {

    if (config.size) {
        // for (const size of config.sizes) {
            const fixtureParams = DEFAULT_FIXTURES[config.size as FixtureSize];
            generateFixture(fixtureParams, config.size);
        // }
    }

    if (hasAllFixtureParamters(config) && config.parameters) {
        generateFixture(config.parameters, 'custom');
    }
};

export const generateFixture = (fixtureParams: FixtureParams, name?: string): void => {

    console.log('Generating fixture:', name, fixtureParams);

    const selectors = [] as string[];
    const treeBuilder = new RandomTreeBuilder<RandomTreeSelectorNode>(fixtureParams);
    const tree = treeBuilder.build(cssSelectorTreeCreator({ selectors }));

    const jsonTree = JSON.stringify(tree, treeJsonReplace, 2);

    const data = {
        tree: JSON.parse(jsonTree),
        selectors: Array.from(new Set(selectors))
    };

    const js = `/**
Fixture Parameters:
${JSON.stringify(fixtureParams, null, 2)}
*/

export const fixture = ${JSON.stringify(data, null, 2)};
`;

    const filePath = getConfigFilePath();
    const fileName = generateFixtureFileName(fixtureParams, name);

    fs.writeFileSync(join(filePath, fileName), js, { encoding: 'utf8' });
};

const REQUIRED_FIXTURE_PARAMETERS = [
    'seed',
    'minBreadth',
    'maxBreadth',
    'minDepth',
    'maxDepth',
    'targetSize',
];
export const hasAllFixtureParamters = (config: ConfigFile): boolean => {
    const { parameters } = config;

    if (!parameters) {
        return false;
    }

    const missingKeys = [];
    
    for (const requiredKey of REQUIRED_FIXTURE_PARAMETERS) {
        if (typeof parameters[requiredKey as keyof FixtureParams] === undefined) {
            missingKeys.push(requiredKey);
        }
    }

    if (missingKeys.length > 0) {
        console.warn(`Missing required config parameters: ${missingKeys.join(', ')}`);
        return false;
    }

    return true;
};