import fs from 'fs';
import path from 'path';
import { getTachometerConfigFilePath } from './paths';
import type { ConfigFile } from 'tachometer/lib/configfile.js';
import type { Config } from './types';

type TachometerConfigGeneratorFn = (testConfig: Config) => Partial<ConfigFile>;
type MakeConfigJsonFn = (testConfig: Config) => Partial<ConfigFile>;

const getUrl = (): string => {
  return `http://localhost:3000/benchmark.html`;
};

export const generateTachometerConfig: TachometerConfigGeneratorFn = (testConfig) => {
  const tachConfig = makeConfigJson(testConfig);

  const filePath = getTachometerConfigFilePath();
  //const fileName = getTestResultFileName(testConfig);
  const fileName = 'tachometer.json';

  fs.writeFileSync(path.join(filePath, fileName), JSON.stringify(tachConfig, null, 2), { encoding: 'utf8' });
  return tachConfig;
};

// const binaries = {
//   chrome: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
//   firefox: `C:\\Program Files\\Mozilla Firefox\\firefox.exe`,
//   edge: `C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe`,
//   safari: '',
// }

const makeConfigJson: MakeConfigJsonFn = ({ numRuns, browsers, file, test, fixtureFileName }) => {

  const benchmarks: ConfigFile['benchmarks'] = browsers.map((browser => {
    return {
      name: `${file} - ${fixtureFileName} - ${test}`,
      url: getUrl(),
      measurement: 'global',
      browser: {
        name: browser,
        // binary: binaries[browser],
      }
    }
  }))

  const json: ConfigFile = {
    $schema: 'https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json',
    sampleSize: numRuns,
    timeout: 0,
    resolveBareModules: false,
    benchmarks,
    // : [
    //   {
    //     name: `${file} - ${fixtureFileName} - ${test}`,
    //     url: getUrl(),
    //     measurement: 'global',
    //     expand: browsers.map(browser => ({ binary: binaries[browser], browser })),
    //   },
    // ],
  };

  return json;
};