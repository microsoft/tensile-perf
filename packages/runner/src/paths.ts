// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { basename, join, posix, sep } from 'path';
import mkdirp from 'mkdirp';
import { Config, Measurements } from './types';
import fs from 'fs';

const tensilePath = '.tensile';

/**
 * Returns the path to config directory and ensures the directory exists.
 */
export const getConfigFilePath: () => string = () => {
    const filePath = join(process.cwd(), tensilePath);
    mkdirp.sync(filePath);

    return filePath;
};

export const getTachometerConfigFilePath: () => string = () => {
    const filePath = join(process.cwd(), tensilePath, 'tachometer');
    mkdirp.sync(filePath);

    return filePath;
};

export const getTestResultFilePath: () => string = () =>{
    const filePath = join(process.cwd(), tensilePath, 'results');
    mkdirp.sync(filePath);

    return filePath;
};

export const getTestResultFileName: (measurements: Measurements) => string = (measurements) => {
    const { testFile, fixtureName, testType, date } = measurements;

    const formatter = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const [{ value: month }, , { value: day }, , { value: year }] = formatter.formatToParts(date);

    const dateStr = `${year}-${month}-${day}`;

    const fileName = `${toPosixPath(testFile).replace(/\//g, '-')}-${fixtureName}-${testType}-${dateStr}`;

    let counter = 0;
    const maxCount = 9999;
    const filePath = getTestResultFilePath();
    if (fs.existsSync(join(filePath, `${fileName}.json`))) {
        counter++;
        while (fs.existsSync(join(filePath, `${fileName}.${counter}.json`)) && counter < maxCount) {
            counter++;
        }
    }

    return counter > 0 ? `${fileName}.${counter}.json` : `${fileName}.json`;
};

export const writeTestResults: (measurements: Measurements) => void = (measurements) => {
    const resultsPath = getTestResultFilePath();
    const name = getTestResultFileName(measurements);

    fs.writeFileSync(join(resultsPath, name), JSON.stringify(measurements, null, 2), { encoding: 'utf8' });
};

export const copyBenchFile = (config: Config): void => {
    const { file } = config;
    fs.copyFileSync(file, join(getConfigFilePath(), basename(file)));
};

const toPosixPath = (filePath: string): string => {
    return filePath.split(sep).join(posix.sep);;
};

/**
 * Gets the first non-relative path segment in a file path
 * Ex: "base/of/my/long/path" returns "base".
 */
export const baseDirectory = (filePath: string): string => {
    return toPosixPath(filePath).split(posix.sep).filter(part => part !== '.')[0];
};