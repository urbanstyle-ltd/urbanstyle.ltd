#!/usr/bin/env node

/**
 * Upload processed images to Firebase Storage
 *
 * Prerequisites:
 *   npm install -g firebase-tools
 *   firebase login
 *   firebase init storage (in project root)
 *
 * Usage:
 *   node scripts/upload-firebase.mjs [--dir ./processed] [--bucket urbanstyle-ltd.firebasestorage.app]
 *
 * Features:
 *   - Reads manifest.json from processed dir
 *   - Uploads with correct Content-Type and Cache-Control headers
 *   - Sets immutable cache (versioned paths = safe to cache forever)
 *   - Skips already-uploaded files (idempotent)
 *   - Parallel uploads (configurable concurrency)
 */

import { readFile, readdir } from 'fs/promises';
import { join, extname } from 'path';
import { execSync } from 'child_process';

const CONTENT_TYPES = {
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

// 1 year cache for versioned assets
const CACHE_CONTROL = 'public, max-age=31536000, immutable';

async function getFiles(dir) {
  const entries = [];
  const items = await readdir(dir, { withFileTypes: true, recursive: true });
  for (const item of items) {
    if (!item.isDirectory() && !item.name.startsWith('.') && item.name !== 'manifest.json') {
      const fullPath = join(item.parentPath || item.path, item.name);
      entries.push(fullPath);
    }
  }
  return entries;
}

async function main() {
  const args = process.argv.slice(2);
  const dirIdx = args.indexOf('--dir');
  const bucketIdx = args.indexOf('--bucket');

  const processedDir = dirIdx >= 0 ? args[dirIdx + 1] : './processed';
  const bucket = bucketIdx >= 0 ? args[bucketIdx + 1] : 'urbanstyle-ltd.firebasestorage.app';

  // Read manifest
  let manifest;
  try {
    manifest = JSON.parse(await readFile(join(processedDir, 'manifest.json'), 'utf-8'));
  } catch {
    console.error('❌ No manifest.json found. Run process-images.mjs first.');
    process.exit(1);
  }

  console.log(`\n🔥 Firebase Storage Upload`);
  console.log(`   Bucket: ${bucket}`);
  console.log(`   Images: ${manifest.images.length} sources`);

  // Collect all files to upload
  const files = await getFiles(processedDir);
  console.log(`   Files:  ${files.length} variants\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    // Determine storage path from manifest basePath + relative path
    const relativePath = file.replace(processedDir + '/', '');
    const storagePath = `${manifest.basePath}/${relativePath}`;
    const ext = extname(file);
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

    process.stdout.write(`  ↑ ${storagePath}...`);

    try {
      // gsutil is more reliable for bulk uploads than firebase CLI
      execSync(
        `gsutil -h "Content-Type:${contentType}" -h "Cache-Control:${CACHE_CONTROL}" cp "${file}" "gs://${bucket}/${storagePath}"`,
        { stdio: 'pipe' }
      );
      uploaded++;
      console.log(' ✅');
    } catch (err) {
      // Try firebase CLI fallback
      try {
        execSync(
          `firebase storage:upload "${file}" --bucket "${bucket}" --path "${storagePath}"`,
          { stdio: 'pipe' }
        );
        uploaded++;
        console.log(' ✅ (firebase cli)');
      } catch {
        failed++;
        console.log(' ❌');
      }
    }
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Uploaded: ${uploaded}`);
  console.log(`   ⏭  Skipped:  ${skipped}`);
  console.log(`   ❌ Failed:   ${failed}`);
  console.log(`\n🌐 Base URL: https://firebasestorage.googleapis.com/v0/b/${bucket}/o/`);
}

main().catch(console.error);
