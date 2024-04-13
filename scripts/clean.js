const fs = require('fs-extra');
const path = require('path');

const distDirPath = path.resolve(__dirname, '../dist');

if (fs.existsSync(distDirPath)) {
    fs.removeSync(distDirPath);
    console.log('Deleted dist/');
}

fs.mkdirSync(distDirPath, { recursive: true });
console.log('Created dist/');
