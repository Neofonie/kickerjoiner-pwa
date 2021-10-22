const fs = require('fs-extra');
const srcPath = './src/index.html';
const destPath = './public/index.html';
const srcSWPath = './src/pwa/new-service-worker.js';
const destSWPath = './public/js/new-service-worker.js';
const cacheBuster = (new Date().getTime());
const argv = process.argv;
const isDev = argv.includes('--dev');
let indexHTML = fs.readFileSync(srcPath, 'utf-8');
let swCode = fs.readFileSync(srcSWPath, 'utf-8');

indexHTML = indexHTML
    // replace cachebuster at <script /> and <link />
    .replace(/\?cb=\d*"/g, `?cb=${cacheBuster}"`)
    // replace cachebuster for ajax on global window
    .replace(/(cacheBuster = ')\d*(')/, `$1${cacheBuster}$2`);

swCode = swCode.replace(/window.cacheBuster/, `${cacheBuster}`);

if (!isDev) {
    indexHTML = indexHTML
        // activate tracking scripts
        .replace(/Xsrc/g, 'src');
}

fs.writeFileSync(destPath, indexHTML, 'utf-8');
fs.writeFileSync(destSWPath, swCode, 'utf-8');

console.log('updated cache bust and tracking in', destPath, destSWPath)
