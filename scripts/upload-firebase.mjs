#!/usr/bin/env node

/**
 * Upload processed images to Firebase Storage via Firebase Admin SDK
 * Uses Application Default Credentials (from `firebase login`)
 *
 * Usage: node scripts/upload-firebase.mjs [--dir ./processed]
 */

import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { readFile, readdir, stat } from 'fs/promises';
import { join, extname, relative } from 'path';

const BUCKET = 'urbanstyle-ltd.firebasestorage.app';

const CONTENT_TYPES = {
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

const CACHE_CONTROL = 'public, max-age=31536000, immutable';

async function getAllFiles(dir) {
  const results = [];
  const items = await readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...await getAllFiles(fullPath));
    } else if (!item.name.startsWith('.') && item.name !== 'manifest.json') {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const dirIdx = args.indexOf('--dir');
  const processedDir = dirIdx >= 0 ? args[dirIdx + 1] : './processed';

  // Initialize with application default credentials
  initializeApp({
    credential: applicationDefault(),
    storageBucket: BUCKET,
  });

  const bucket = getStorage().bucket();

  // Check manifest
  let manifest;
  try {
    manifest = JSON.parse(await readFile(join(processedDir, 'manifest.json'), 'utf-8'));
  } catch {
    console.error('❌ No manifest.json. Run: npm run images:process');
    process.exit(1);
  }

  const files = await getAllFiles(processedDir);

  console.log(`\n🔥 Firebase Storage Upload`);
  console.log(`   Bucket: ${BUCKET}`);
  console.log(`   Files:  ${files.length}\n`);

  let uploaded = 0;
  let failed = 0;

  // Upload in batches of 10 for speed
  const BATCH_SIZE = 10;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (file) => {
      const relativePath = relative(processedDir, file);
      const storagePath = `${manifest.basePath}/${relativePath}`;
      const ext = extname(file);
      const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

      try {
        await bucket.upload(file, {
          destination: storagePath,
          metadata: {
            contentType,
            cacheControl: CACHE_CONTROL,
          },
        });
        uploaded++;
        process.stdout.write(`  ✅ ${storagePath}\n`);
      } catch (err) {
        failed++;
        process.stdout.write(`  ❌ ${storagePath}: ${err.message}\n`);
      }
    });

    await Promise.all(promises);
  }

  console.log(`\n📊 Done: ${uploaded} uploaded, ${failed} failed`);
  console.log(`🌐 CDN: https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/`);
}

main().catch(console.error);
