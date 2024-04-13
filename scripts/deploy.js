const dotenv = require('dotenv');
dotenv.config({
    path: '.deploy.env'
});
const fs = require('fs-extra');
const path = require('path');
const cp = require('child_process');
const crypto = require('crypto');

if (!process.env.GCP_PROJECT) {
    console.error('Environment was not properly loaded, missing values from .deploy.env!');
    process.exit(1);
}

const distDirPath = path.resolve(__dirname, '../dist');

console.log(`Deploying from ${distDirPath}, calculating deployment hash ...`);

// Calculate an SHA-256 hash of the contents of the dist/ directory
const hashDir = (dirPath) => {
    const hash = crypto.createHash('sha256');
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            hash.update(hashDir(filePath));
        } else {
            hash.update(fs.readFileSync(filePath));
        }
    }
    return hash.digest('hex');
}

const hashDigest = hashDir(distDirPath);

console.log(`Deployment hash: ${hashDigest}, uploading to GCS ...`);

// Upload the contents of the dist/ directory to a GCS bucket
cp.execSync(
    `gsutil -m cp -r ${distDirPath}/* gs://${process.env.GCS_STAGING_BUCKET}/${hashDigest}/`,
    {
        stdio: 'ignore'
    }
);

console.log(`Uploaded dist/ to gs://${process.env.GCS_STAGING_BUCKET}/${hashDigest}/`);
console.log(`Deploying to server ${process.env.GCE_INSTANCE} @ ${process.env.GCE_ZONE} ...`);

// Run deploy script on server:
// 1. Remove /var/www/ld55/, remake the empty directory
// 2. Copy from GCS path to /var/www/ld55/
cp.execSync(
    `gcloud compute ssh --command="sudo rm -rf /var/www/ld55/ && sudo mkdir -p /var/www/ld55/ && sudo gsutil -m cp -r gs://${process.env.GCS_STAGING_BUCKET}/${hashDigest}/* /var/www/ld55/" --project=${process.env.GCP_PROJECT} --zone=${process.env.GCE_ZONE} ${process.env.GCE_USERNAME}@${process.env.GCE_INSTANCE}`,
    {
        stdio: 'ignore'
    }
);
console.log('Deployed to server!');
