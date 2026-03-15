import fs from 'fs';
import path from 'path';

// Extract keys from images.ts
const imagesContent = fs.readFileSync('./src/data/images.ts', 'utf8');
const keys = [];
const regex = /"([^"]+)":\s*\{/g;
let match;
while ((match = regex.exec(imagesContent)) !== null) {
  if (['width', 'height', 'variants', 'avif', 'og', 'thumb', 'sm', 'md', 'lg', 'xl', 'category'].includes(match[1])) continue;
  keys.push(match[1]);
}

const uniqueKeys = [...new Set(keys)].filter(k => k.length > 2);
console.log(`Found ${uniqueKeys.length} image keys in images.ts.`);

function walkSync(dir, filelist = []) {
  const dirPath = path.resolve(dir);
  if (!fs.existsSync(dirPath)) return filelist;
  
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filepath = path.join(dirPath, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (!file.startsWith('.')) {
        filelist = walkSync(filepath, filelist);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      filelist.push(filepath);
    }
  }
  return filelist;
}

const allFiles = walkSync('./src');
let allContent = '';
for (const file of allFiles) {
  if (file.endsWith('images.ts')) continue; // Skip the images file itself
  allContent += fs.readFileSync(file, 'utf8') + '\n';
}

const unusedKeys = [];
for (const key of uniqueKeys) {
  if (!allContent.includes(key)) {
    unusedKeys.push(key);
  }
}

console.log(`\nUnused images (${unusedKeys.length}):`);
unusedKeys.forEach(k => console.log('- ' + k));
