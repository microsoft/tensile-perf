import express from "express";
// eslint-disable-next-line
import useragent from "express-useragent";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';
import { Server } from 'http';
import os from 'os';

import type { Browser, Config, MeasurementData, Measurements } from './types';
import { Handler } from "express";
import { baseDirectory, writeTestResults } from "./paths";
import { processMeasurements } from "./measurements";

const __dirname = dirname(fileURLToPath(import.meta.url));

let server: Server;
const port = 3000;
const MAX_WALKER_DEPTH = 10;

type FileWalkerCallback = (filename: string | undefined) => void;
const fileWalker = (path: string, url: string, cb: FileWalkerCallback, depth = 0): void => {

  const filename = join(path, url);
  if (existsSync(filename)) {
    return cb(filename);
  }

  if (depth >= MAX_WALKER_DEPTH) {
    return cb(undefined);
  }

  return fileWalker(dirname(path), url, cb, depth + 1);
};

const newMeasurments = (): Measurements => {
  return {
    platform: os.platform(),
    architecture: os.arch(),
    date: new Date(),
    testFile: '',
    fixtureName: '',
    fixtureParams: null,
    testType: '',
    benchmarks: {} as Measurements['benchmarks'],
  };
};

let measurements: Measurements = newMeasurments();

const handleGracefulShutdown: (arg: unknown) => void = arg => {
  console.log('Shutting down...');
  if (server && server.close) {
    console.log('Closing HTTP server');
    server.close();
    process.off('uncaughtException', handleGracefulShutdown);
  }

  if (arg instanceof Error) {
    console.error('Error', arg);
    process.exit(1);
  }
};

export const startServer = (config: Config) => {
    const app = express();

    // Use EJS templates
    app.set('views', join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Sniff the browser
    app.use(useragent.express());

    // Parse JSON bodies
    app.use(express.json());

    // Set COOP and COEP headers for memory measurements and higher res timers
    // See: https://web.dev/coop-coep/
    app.use(setHeaders);

    app.get('/benchmark.html', (_req, res) => {
      res.render('benchmark', {...config});
    });

    app.use("/stress-test-file", express.static(join(process.cwd(), baseDirectory(config.file))));
    app.use("/stress-test-assets", express.static(join(process.cwd(), ".stress-test")));
    app.use("/dist", express.static(join(process.cwd(), "dist")));

    // We might be running our script for a sub-package in a monorepo.
    // Walk up the file tree and try to find the package.
    app.get("/node_modules/*", (req, res) => {
      const { url } = req;

      fileWalker(process.cwd(), url, (filename) => {
        
        if (!filename) {
          return res.status(404).send('File not found');
        }

        return res.sendFile(filename);
      });
    });

    // Files under test
    const fileDirname = dirname(config.file);
    const testBaseDir = fileDirname.startsWith('.') ? fileDirname.substring(1) : fileDirname;
    const testServerDir = "/test-files" + (testBaseDir.length > 0 ? `/${testBaseDir}` : '');

    app.use(testServerDir, express.static(join(process.cwd(), testBaseDir)));

    app.post('/v1/measurements', handleMeasurements);
    
    process.on('uncaughtException', handleGracefulShutdown);

    server = app.listen(port, () => {
        console.log("stress-test server started!");
    });
};

export const stopServer = () => {
    if (!server) {
        throw new Error('No server running!');
    }

    const returnMeasurements = measurements;
    writeTestResults(processMeasurements(measurements));
    measurements = newMeasurments();

    server.close();

    return returnMeasurements;
}

const numberValidator = (value: unknown) => typeof value === 'number';
const objectValidator = (value: unknown) => typeof value === 'object';
const stringValidator = (value: unknown) => typeof value === 'string';

const MEASUREMENT_VALIDATION_MAP = {
  testFixture: stringValidator,
  testFile: stringValidator,
  testType: stringValidator,
  testParameters: objectValidator,
  javascriptTime: numberValidator,
  layoutTime: numberValidator,
  memory: numberValidator,
  lightDomSize: numberValidator,
  shadowDomSize: numberValidator,
  totalDomSize: numberValidator,
  maxLightBreadth: numberValidator,
  maxLightDepth: numberValidator,
  maxShadowBreadth: numberValidator,
  maxShadowDepth: numberValidator,
};

const isValidMeasurementRequest = (data: MeasurementData | undefined | null): data is MeasurementData => {

  if (!data) {
    return false;
  }

  for (const [ key, validator ] of Object.entries(MEASUREMENT_VALIDATION_MAP)) {
    if (!validator(data[key as keyof MeasurementData])) {
      return false;
    }
  }

  return true;
};

const setHeaders: Handler = (req, res, next) => {
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
};

const handleMeasurements: Handler = (req, res) => {
  console.log(req.body);

  if (!isValidMeasurementRequest(req.body)) {
    const msg = 'Invalid measurement request!';
    console.error(msg, req.body);
    res.status(400).send(msg);
    return;
  }

  const browser = (req.useragent?.browser ?? 'unknown').toLowerCase() as Browser;

  const { testFile, testFixture, testParameters, testType, ...otherData } = req.body;
  
  console.log('data', browser, req.body);

  measurements.testFile = measurements.testFile || testFile;
  measurements.fixtureName = measurements.fixtureName || testFixture;
  measurements.fixtureParams = measurements.fixtureParams || testParameters;
  measurements.testType = measurements.testType || testType;

  measurements.benchmarks[browser] = measurements.benchmarks[browser] ?? { rawMeasurements: []};
  measurements.benchmarks[browser].rawMeasurements.push(otherData);


  res.status(200).send('OK');
};