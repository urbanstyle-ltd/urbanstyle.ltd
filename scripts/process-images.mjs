#!/usr/bin/env node

/**
 * UrbanStyle Image Processing Pipeline
 *
 * Processes source images into optimized responsive variants:
 * - Multiple sizes (thumbnail, sm, md, lg, xl, hero)
 * - WebP + AVIF formats (+ PNG fallback for OG/social)
 * - Organized output structure matching Firebase Storage layout
 * - Generates manifest.json for the website to consume
 *
 * Usage:
 *   node scripts/process-images.mjs [--source ./public/images] [--output ./processed]
 */

import sharp from 'sharp';
import { readdir, stat, mkdir, writeFile } from 'fs/promises';
import { join, parse, relative } from 'path';

// ─── Configuration ───────────────────────────────────────────────────────────

const CONFIG = {
  // Size presets (name → max width in px)
  sizes: {
    thumb: 400,    // product grid mobile, social thumbnails
    sm: 640,       // product grid tablet
    md: 960,       // product detail, team cards
    lg: 1280,      // product hero, about sections
    xl: 1920,      // full-bleed hero banners
  },

  // Output formats
  formats: ['webp', 'avif'],

  // Quality per format
  quality: {
    webp: 82,
    avif: 65,       // AVIF compresses better, lower quality = still great
    png: 85,        // fallback only for OG images
  },

  // Category-specific size overrides
  // Only generate sizes that make sense for each category
  categoryPresets: {
    products: {
      sizes: ['thumb', 'sm', 'md', 'lg'],
      aspectRatio: null, // keep original
    },
    personas: {
      sizes: ['thumb', 'sm', 'md'],
      aspectRatio: null,
    },
    hero: {
      sizes: ['md', 'lg', 'xl'],
      aspectRatio: null,
    },
    brand: {
      sizes: ['thumb', 'sm', 'md'],
      aspectRatio: null,
    },
    social: {
      sizes: ['md'],  // social cards need specific sizes
      aspectRatio: null,
    },
  },

  // Firebase Storage structure
  storagePath: 'images/v1', // versioned for cache busting
};

// ─── Image Processor ─────────────────────────────────────────────────────────

async function getFiles(dir) {
  const entries = [];
  try {
    const items = await readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = join(dir, item.name);
      if (item.isDirectory()) {
        entries.push(...await getFiles(fullPath));
      } else if (/\.(png|jpg|jpeg|webp|tiff?)$/i.test(item.name)) {
        entries.push(fullPath);
      }
    }
  } catch {
    // directory doesn't exist
  }
  return entries;
}

function getCategory(filePath, sourceDir) {
  const rel = relative(sourceDir, filePath);
  const parts = rel.split('/');
  return parts.length > 1 ? parts[0] : 'uncategorized';
}

function getCleanName(filename) {
  // Remove timestamp suffixes: product_1a_denim_hero_1773575639250.png → product_1a_denim_hero
  return parse(filename).name.replace(/_\d{10,}$/, '');
}

async function processImage(inputPath, outputDir, category) {
  const filename = parse(inputPath).name;
  const cleanName = getCleanName(parse(inputPath).base);
  const preset = CONFIG.categoryPresets[category] || CONFIG.categoryPresets.products;
  const sizesToGenerate = preset.sizes;

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const results = [];

  for (const sizeName of sizesToGenerate) {
    const maxWidth = CONFIG.sizes[sizeName];

    // Don't upscale
    const targetWidth = Math.min(maxWidth, metadata.width || maxWidth);

    for (const format of CONFIG.formats) {
      const outFileName = `${cleanName}_${sizeName}.${format}`;
      const outPath = join(outputDir, category, outFileName);
      await mkdir(join(outputDir, category), { recursive: true });

      const pipeline = sharp(inputPath)
        .resize(targetWidth, null, {
          fit: 'inside',
          withoutEnlargement: true,
        });

      if (format === 'webp') {
        pipeline.webp({ quality: CONFIG.quality.webp, effort: 6 });
      } else if (format === 'avif') {
        pipeline.avif({ quality: CONFIG.quality.avif, effort: 6 });
      }

      const info = await pipeline.toFile(outPath);

      results.push({
        file: outFileName,
        path: `${CONFIG.storagePath}/${category}/${outFileName}`,
        format,
        size: sizeName,
        width: info.width,
        height: info.height,
        bytes: info.size,
      });
    }
  }

  // Generate one PNG for OG/social (md size)
  const ogWidth = Math.min(CONFIG.sizes.md, metadata.width || CONFIG.sizes.md);
  const ogFileName = `${cleanName}_og.png`;
  const ogPath = join(outputDir, category, ogFileName);
  const ogInfo = await sharp(inputPath)
    .resize(ogWidth, null, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: CONFIG.quality.png })
    .toFile(ogPath);

  results.push({
    file: ogFileName,
    path: `${CONFIG.storagePath}/${category}/${ogFileName}`,
    format: 'png',
    size: 'og',
    width: ogInfo.width,
    height: ogInfo.height,
    bytes: ogInfo.size,
  });

  return {
    id: cleanName,
    category,
    originalFile: parse(inputPath).base,
    originalWidth: metadata.width,
    originalHeight: metadata.height,
    variants: results,
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const sourceIdx = args.indexOf('--source');
  const outputIdx = args.indexOf('--output');

  const sourceDir = sourceIdx >= 0 ? args[sourceIdx + 1] : './public/images';
  const outputDir = outputIdx >= 0 ? args[outputIdx + 1] : './processed';

  console.log(`\n📸 UrbanStyle Image Pipeline`);
  console.log(`   Source: ${sourceDir}`);
  console.log(`   Output: ${outputDir}\n`);

  const files = await getFiles(sourceDir);
  if (files.length === 0) {
    console.log('No images found.');
    return;
  }

  console.log(`Found ${files.length} source images\n`);

  const manifest = {
    version: '1.0',
    generated: new Date().toISOString(),
    storageBucket: 'urbanstyle-ltd.firebasestorage.app',
    basePath: CONFIG.storagePath,
    images: [],
  };

  let totalBytes = 0;
  let totalVariants = 0;

  for (const file of files) {
    const category = getCategory(file, sourceDir);
    const name = parse(file).base;
    process.stdout.write(`  Processing ${category}/${name}...`);

    try {
      const result = await processImage(file, outputDir, category);
      manifest.images.push(result);

      const variants = result.variants.length;
      const bytes = result.variants.reduce((sum, v) => sum + v.bytes, 0);
      totalVariants += variants;
      totalBytes += bytes;

      console.log(` ${variants} variants (${(bytes / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.log(` ❌ ${err.message}`);
    }
  }

  // Write manifest
  const manifestPath = join(outputDir, 'manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  // Write a simplified image map for the website (src/data/images.ts)
  const imageMap = {};
  for (const img of manifest.images) {
    imageMap[img.id] = {
      category: img.category,
      width: img.originalWidth,
      height: img.originalHeight,
      variants: Object.fromEntries(
        img.variants
          .filter(v => v.format === 'webp')
          .map(v => [v.size, v.path])
      ),
      avif: Object.fromEntries(
        img.variants
          .filter(v => v.format === 'avif')
          .map(v => [v.size, v.path])
      ),
      og: img.variants.find(v => v.size === 'og')?.path,
    };
  }

  const dataDir = './src/data';
  await mkdir(dataDir, { recursive: true });
  const tsContent = `// Auto-generated by scripts/process-images.mjs — do not edit manually
// Generated: ${new Date().toISOString()}

export type ImageVariant = {
  thumb?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  og?: string;
};

export type ImageEntry = {
  category: string;
  width: number;
  height: number;
  variants: ImageVariant;
  avif: ImageVariant;
  og?: string;
};

export const STORAGE_BUCKET = '${manifest.storageBucket}';
export const STORAGE_BASE = 'https://firebasestorage.googleapis.com/v0/b/${manifest.storageBucket}/o';

export function getImageUrl(path: string): string {
  return \`\${STORAGE_BASE}/\${encodeURIComponent(path)}?alt=media\`;
}

export const images: Record<string, ImageEntry> = ${JSON.stringify(imageMap, null, 2)} as const;
`;

  await writeFile(join(dataDir, 'images.ts'), tsContent);

  console.log(`\n✅ Done!`);
  console.log(`   ${manifest.images.length} images → ${totalVariants} variants`);
  console.log(`   Total size: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Manifest: ${manifestPath}`);
  console.log(`   TypeScript: ${dataDir}/images.ts`);
}

main().catch(console.error);
