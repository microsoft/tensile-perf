const { join } = require('path');
const { copySync } = require('fs-extra');

const lib = join(__dirname, '..', 'lib');
const src = join(__dirname, '..', 'src');

const folders = [ 'public', 'views' ];

for (const folder of folders) {
  copySync(join(src, folder), join(lib, folder));
}


