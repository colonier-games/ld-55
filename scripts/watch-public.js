const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const publicDirPath = path.resolve(__dirname, '../public');
const distDirPath = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDirPath)) {
    fs.mkdirSync(distDirPath, { recursive: true });
    console.log('Created dist/');
}

const onChange = () => {
    console.log('Changes detected ...')
    fs.copySync(publicDirPath, distDirPath);
    console.log('Copied public/ to dist/');
};

chokidar.watch(publicDirPath, { usePolling: true }).on('all', onChange);
