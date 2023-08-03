const { join } = require('path');
const { symlinkSync } = require('fs');
const mkdirpSync = require('mkdirp').sync;

const targetPackage = process.argv[2];
const packages = {
    runner: [
        'react',
        'tools',
        'tree',
        'web-components',
    ],
    tree: [
        'tools'
    ],
    react: [
        'tools'
    ],
    'web-components': [
        'tools',
    ]
};

const distRoot = join(process.cwd(), 'dist', 'packages');
const runnerPackageRoot = join(distRoot, targetPackage, 'node_modules', '@stress-test');

mkdirpSync(runnerPackageRoot);

packages[targetPackage].forEach(pkg => {
    symlinkSync(join(distRoot, pkg), join(runnerPackageRoot, pkg));
});
