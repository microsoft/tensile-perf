import { generateFixtureFileName, hasAllFixtureParamters, DEFAULT_FIXTURES } from "./fixture";
import { defaultConfig } from "./defaultConfig";
import { baseDirectory, getConfigFilePath } from "./paths";
import fs from 'fs';
import { join } from 'path';
import { pathToFileURL } from "url";

import type { CliParams, Config, ConfigFile, FixtureSize } from "./types";

type ConfigGeneratorFn = (params: CliParams) => Promise<Config>;

const mergeConfig = (base: ConfigFile, overrides: ConfigFile): ConfigFile => {

    const config: ConfigFile = {
        ...base,
        ...overrides,
        imports: {
            ...base.imports,
            ...overrides.imports
        },
        scripts: [
            ...(base.scripts ?? []),
            ...(overrides.scripts ?? []),
        ],
        cssSheets: [
            ...(base.cssSheets ?? []),
            ...(overrides.cssSheets ?? []),
        ],
        metrics: {
            ...base.metrics,
            ...overrides.metrics
        },
        parameters: {
            ...base.parameters,
            ...overrides.parameters
        }
    };

    return config;

}

export const generateConfigFromCliParams: ConfigGeneratorFn = async ({ file, size, test, config: configFilePath }) => {

    let userConfig = await readConfigFile(configFilePath);
    const { extends: userConfigExtendsPath } = userConfig;

    if (userConfigExtendsPath) {
        const baseConfig = await readConfigFile(userConfigExtendsPath);
        userConfig = mergeConfig(baseConfig, userConfig);
        delete userConfig.extends;
    }

    const config = mergeConfig(defaultConfig, userConfig) as Partial<Config>;
    
    config.file ??= file;
    config.size ??= size;
    config.test ??= test;

    console.log('config', config);
    console.log('userConfig', userConfig);

    if (!config.file) {
        throw new Error("A test file or files must be provided!");
    }

    if (!config.test) {
        throw new Error("A test case must be provided!");
    }

    if (!config.browsers) {
        throw new Error('At least one browser must be provided!');
    }

    const validConfigParams = hasAllFixtureParamters(config)
    if (!config.size && !validConfigParams) {
        throw new Error('Test size or customer parameters must be provided!');
    }
;
    if (config.size) {
        const fixture = generateFixtureFileName(DEFAULT_FIXTURES[size as FixtureSize], size);
        config.fixtureFileName = fixture;
        config.parameters = DEFAULT_FIXTURES[size as FixtureSize];
    } else if (validConfigParams && config.parameters) {
        const fixture = generateFixtureFileName(config.parameters, 'custom');
        config.fixtureFileName = fixture;
    }

    config.testFile = config.file.replace(baseDirectory(config.file), '');

    const js = `
export const config = ${JSON.stringify(config, null, 2)};
`;

    const filePath = getConfigFilePath();
    const fileName = 'config.js';

    fs.writeFileSync(join(filePath, fileName), js, { encoding: 'utf8' });

    return config as Config;
};

const readConfigFile = async (configFilePath: string): Promise<ConfigFile> => {
    
    const { default: config } = await import(pathToFileURL(join(process.cwd(), configFilePath)).toString());

    return config as ConfigFile;
};

