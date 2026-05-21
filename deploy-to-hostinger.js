#!/usr/bin/env node

/**
 * Hostinger Deployment Preparation Script
 * Prepares the build for deployment to Hostinger
 */

import { execSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, 'dist');
const ZIP_OUTPUT = join(__dirname, 'hostinger-deploy.zip');

console.log('🚀 Hostinger Deployment Preparation\n');

// Step 1: Clean previous build
console.log('🧹 Cleaning previous build...');
try {
  if (existsSync(DIST_DIR)) {
    execSync('rm -rf dist', { stdio: 'inherit' });
  }
} catch (error) {
  console.log('   Using PowerShell to clean...');
  execSync('Remove-Item -Path dist -Recurse -Force -ErrorAction SilentlyContinue', { 
    shell: 'powershell.exe',
    stdio: 'inherit' 
  });
}

// Step 2: Run production build
console.log('\n📦 Building for production...');
execSync('npm run build', { stdio: 'inherit' });

// Step 3: Verify .htaccess exists
console.log('\n✅ Verifying .htaccess file...');
const htaccessSource = join(__dirname, 'client', 'public', '.htaccess');
const htaccessDest = join(DIST_DIR, '.htaccess');

if (existsSync(htaccessSource)) {
  console.log('   ✓ .htaccess found in dist/');
} else {
  console.error('   ❌ ERROR: .htaccess file not found!');
  console.error('   Please ensure client/public/.htaccess exists');
  process.exit(1);
}

// Step 4: Create deployment info file
console.log('\n📝 Creating deployment info...');
const deployInfo = {
  buildDate: new Date().toISOString(),
  version: '1.0.0',
  environment: 'production',
  platform: 'Hostinger',
  instructions: 'Upload all files from dist/ to public_html/ on Hostinger'
};

writeFileSync(
  join(DIST_DIR, 'deployment-info.json'),
  JSON.stringify(deployInfo, null, 2)
);

// Step 5: Create ZIP for easy upload
console.log('\n🗜️  Creating deployment ZIP...');

const output = createWriteStream(ZIP_OUTPUT);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', function() {
  const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`   ✓ Created: hostinger-deploy.zip (${sizeMB} MB)`);
  console.log('\n✅ DEPLOYMENT PACKAGE READY!\n');
  console.log('📋 Next Steps:');
  console.log('   1. Login to Hostinger hPanel');
  console.log('   2. Go to File Manager → public_html/');
  console.log('   3. Upload hostinger-deploy.zip');
  console.log('   4. Extract the ZIP file');
  console.log('   5. Move all files from dist/ to public_html/');
  console.log('   6. Visit your domain to verify\n');
  console.log('📖 Full guide: See HOSTINGER_DEPLOYMENT.md\n');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);
archive.directory(DIST_DIR, false);
archive.finalize();
