const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function addDirectoryToZip(zip, dirPath, rootDir, excludePatterns = []) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativePath = path.relative(rootDir, fullPath);

    if (excludePatterns.some(pattern => pattern.test(relativePath) || pattern.test(item))) {
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const folderZip = zip.folder(item);
      await addDirectoryToZip(folderZip, fullPath, rootDir, excludePatterns);
    } else {
      const data = fs.readFileSync(fullPath);
      zip.file(item, data);
    }
  }
}

async function createPackages() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const distDir = path.join(rootDir, 'dist');

  console.log('Building source zip...');
  const sourceZip = new JSZip();
  const sourceExcludes = [
    /node_modules/,
    /^\.git/,
    /^\.aistudio/,
    /^dist/,
    /^bun\.lock$/,
    /nextmovemath-source\.zip/,
    /nextmovemath-dist\.zip/
  ];

  await addDirectoryToZip(sourceZip, rootDir, rootDir, sourceExcludes);

  const sourceBuffer = await sourceZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  const sourceZipPath = path.join(publicDir, 'nextmovemath-source.zip');
  fs.writeFileSync(sourceZipPath, sourceBuffer);
  console.log(`Source zip created at: ${sourceZipPath} (${(sourceBuffer.length / 1024).toFixed(1)} KB)`);
  console.log('Package prepared successfully!');
}

createPackages().catch(err => {
  console.error('Error generating packages:', err);
  process.exit(1);
});
