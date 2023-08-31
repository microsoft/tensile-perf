const { join, posix, relative, sep } = require('path');
const { 
  chmodSync, 
  existsSync, 
  readdirSync, 
  readFileSync, 
  symlinkSync, 
  writeFileSync 
} = require('fs');
const { platform } = require('os');
const mkdirpSync = require('mkdirp').sync;

/**
 * This script links the built `runner` binary to all dependent packages along with
 * the repo root. This is necessary because when `yarn install` is run `runner` has
 * not yet been built so its binaries don't exist. There is probably a better way 
 * to do this with NX but it wasn't clear to me after digging through the docs.
 */

const IS_WINDOWS = platform() === 'win32';

const RUNNER_PACKAGE_NAME = '@tensile-perf/runner'

const repoRoot = join(__dirname, '..');
const distRoot = join(__dirname, '..', 'packages');
const runnerBinPath = join(distRoot, 'runner', 'dist', 'bin', 'tensile.js');
const folders = readdirSync(distRoot);
folders.push('..');

const getTemplateCmd = (path) => {
  const template = 
`@IF EXIST "%~dp0\\node.exe" (
  "%~dp0\\node.exe"  "%~dp0\\${path}" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\\${path}" %*
)`;

  return template;
}

const getTemplateBash = (path) => {
  const posixPath = path.split(sep).join(posix.sep);
  const template = 
`
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\\\,/,g')")

case \`uname\` in
    *CYGWIN*) basedir=\`cygpath -w "$basedir"\`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/${posixPath}" "$@"
  ret=$?
else 
  node  "$basedir/${posixPath}" "$@"
  ret=$?
fi
exit $ret

`;

return template;
}


for (const folder of folders) {
  const pkg = join(distRoot, folder, 'package.json');
  const isRoot = folder === '..';
  if (existsSync(pkg)) {
    const pkgJson = JSON.parse(readFileSync(pkg, 'utf8'));
    const deps = Object.keys({ ...pkgJson.dependencies, ...pkgJson.devDependencies, ...pkgJson.peerDependencies });

    const rootFolder = isRoot ? repoRoot : join(distRoot, folder);

    const pkgBinPath = join(rootFolder, 'node_modules', '.bin');
    const pkgBinBash = join(pkgBinPath, 'tensile');
    const pkgBinCmd = join(pkgBinPath, 'tensile.cmd');
    
    if (deps.includes(RUNNER_PACKAGE_NAME) || isRoot) {
      mkdirpSync(pkgBinPath);
      
      if (IS_WINDOWS) {

        if (!existsSync(pkgBinBash)) {
          writeFileSync(pkgBinBash,  getTemplateBash(relative(pkgBinPath, runnerBinPath)), { encoding: 'utf8' });
        }

        if (!existsSync(pkgBinCmd)) {
          writeFileSync(pkgBinCmd,  getTemplateCmd(relative(pkgBinPath, runnerBinPath)), { encoding: 'utf8' });
        }
      } else if (!existsSync(pkgBinBash)) {
        const relativePath = relative(pkgBinPath, runnerBinPath);
        chmodSync(runnerBinPath, '755');
        symlinkSync(relativePath, pkgBinBash);
      }

    }
  }
}


