const path = require('path');
const { readFileSync } = require('fs');
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');
const findUp = require('find-up');

const cwd = process.cwd();

function overrideTsPathConfig() {
  const baseTsConfigPath = path.resolve(cwd, findUp.sync('tsconfig.base.json'));

  const baseTsConfig = JSON.parse(readFileSync(baseTsConfigPath, 'utf8'));

  const updatedPaths = {};

  for (const pkgName in baseTsConfig.compilerOptions.paths) {
    const srcPath = baseTsConfig.compilerOptions.paths[pkgName];
    updatedPaths[pkgName] = [path.join('dist/out-tsc', srcPath[0]).replace('index.ts', 'index.d.ts')];
  }

  const pkgTsConfigPath = path.resolve(cwd, 'tsconfig.lib.json');
  const pkgTsConfig = JSON.parse(readFileSync(pkgTsConfigPath, 'utf8'));

  pkgTsConfig.compilerOptions.paths = updatedPaths;

  return pkgTsConfig;
}

function apiExtractor() {
  const args = process.argv.slice(2);
  const apiExtractorJsonPath = path.join(cwd, 'config/api-extractor.json');

  // Load and parse the api-extractor.json file
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

  // Override TSConfig file used by API Extractor to use the one with paths pointing to .d.ts files.
  extractorConfig.overrideTsconfig = overrideTsPathConfig();

  // Invoke API Extractor
  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: args.includes('--local'),
    showVerboseMessages: args.includes('--verbose'),
  });

  if (extractorResult.succeeded) {
    console.log(`API Extractor completed successfully`);
    process.exitCode = 0;
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`,
    );
    process.exitCode = 1;
  }
}

apiExtractor();
