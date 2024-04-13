const fs = require('fs-extra');
const path = require('path');

const publicDirPath = path.resolve(__dirname, '../public');
const distDirPath = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDirPath)) {
    fs.mkdirSync(distDirPath, { recursive: true });
    console.log('Created dist/');
}

fs.copySync(publicDirPath, distDirPath);
console.log('Copied public/ to dist/');
