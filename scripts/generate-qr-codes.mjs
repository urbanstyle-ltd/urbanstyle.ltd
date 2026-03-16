#!/usr/bin/env node

/**
 * QR Code Generator for UrbanStyle Conference Cards
 *
 * Generates branded QR code SVGs for each audience type.
 *
 * Usage:
 *   node scripts/generate-qr-codes.mjs
 *
 * Prerequisites:
 *   npm install qrcode
 *
 * Output:
 *   public/qr/qr-learner.svg
 *   public/qr/qr-employer.svg
 *   public/qr/qr-partner.svg
 *   public/qr/qr-contact.svg
 */

import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const OUTPUT_DIR = join(PROJECT_ROOT, "public", "qr");

// UrbanStyle brand colors
const CHARCOAL = "#2C2C2C";
const OFFWHITE = "#F5F0EB";
const BURNT_ORANGE = "#C4622D";

const AUDIENCES = [
  { id: "learner", label: "For Learners", url: "https://urbanstyle.ltd/en/qr/learner" },
  { id: "employer", label: "For Employers", url: "https://urbanstyle.ltd/en/qr/employer" },
  { id: "partner", label: "For Partners", url: "https://urbanstyle.ltd/en/qr/partner" },
  { id: "contact", label: "Contact Card", url: "https://urbanstyle.ltd/en/qr/contact" },
  { id: "calendly", label: "Book a Meeting", url: "https://calendly.com/alekkozlov/daca-with-producer-data-analyst-career-accelerator" },
];

// --- QR Code generation ---

let QRCode;
try {
  QRCode = (await import("qrcode")).default;
} catch {
  QRCode = null;
  console.warn(
    "\n  WARNING: 'qrcode' package not installed.\n" +
    "  Install it with: npm install --save-dev qrcode\n" +
    "  Generating placeholder SVGs instead.\n"
  );
}

/**
 * Generate a QR code SVG string using the `qrcode` library,
 * or fall back to a placeholder if the library is unavailable.
 */
async function generateQrSvgContent(url) {
  if (QRCode) {
    const svgString = await QRCode.toString(url, {
      type: "svg",
      color: {
        dark: CHARCOAL,
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
      margin: 2,
      width: 260,
    });
    return svgString;
  }

  // Fallback: placeholder QR-like pattern
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" width="260" height="260">
  <rect width="260" height="260" fill="white"/>
  <!-- Placeholder: install qrcode package for real QR codes -->
  <!-- npm install --save-dev qrcode -->
  <rect x="20" y="20" width="60" height="60" fill="${CHARCOAL}" rx="4"/>
  <rect x="180" y="20" width="60" height="60" fill="${CHARCOAL}" rx="4"/>
  <rect x="20" y="180" width="60" height="60" fill="${CHARCOAL}" rx="4"/>
  <rect x="30" y="30" width="40" height="40" fill="white" rx="2"/>
  <rect x="190" y="30" width="40" height="40" fill="white" rx="2"/>
  <rect x="30" y="190" width="40" height="40" fill="white" rx="2"/>
  <rect x="42" y="42" width="16" height="16" fill="${CHARCOAL}" rx="1"/>
  <rect x="202" y="42" width="16" height="16" fill="${CHARCOAL}" rx="1"/>
  <rect x="42" y="202" width="16" height="16" fill="${CHARCOAL}" rx="1"/>
  <text x="130" y="135" text-anchor="middle" font-family="monospace" font-size="10" fill="${CHARCOAL}" opacity="0.3">QR PLACEHOLDER</text>
  <text x="130" y="150" text-anchor="middle" font-family="monospace" font-size="8" fill="${CHARCOAL}" opacity="0.2">npm i qrcode</text>
</svg>`;
}

/**
 * Wrap the QR SVG in a branded card (300x380) with label and domain.
 */
function wrapInBrandedCard(qrSvgInner, label) {
  // Extract the viewBox from the inner SVG to preserve QR module coordinates
  const viewBoxMatch = qrSvgInner.match(/viewBox="([^"]+)"/);
  const innerViewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 33 33";

  // Extract the inner SVG content (strip the outer <svg> wrapper if present)
  const innerContent = qrSvgInner
    .replace(/<\?xml[^?]*\?>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380">
  <defs>
    <clipPath id="card-clip">
      <rect width="300" height="380" rx="16" ry="16"/>
    </clipPath>
  </defs>

  <!-- Card background -->
  <rect width="300" height="380" rx="16" ry="16" fill="white"/>
  <rect width="300" height="380" rx="16" ry="16" fill="none" stroke="${CHARCOAL}" stroke-width="1" opacity="0.1"/>

  <!-- QR Code area -->
  <g transform="translate(20, 20)">
    <svg width="260" height="260" viewBox="${innerViewBox}">
      ${innerContent}
    </svg>
  </g>

  <!-- Accent line -->
  <line x1="20" y1="295" x2="280" y2="295" stroke="${BURNT_ORANGE}" stroke-width="2" opacity="0.6"/>

  <!-- Label -->
  <text x="150" y="328" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="${CHARCOAL}" letter-spacing="0.5">
    ${label}
  </text>

  <!-- Domain -->
  <text x="150" y="355" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="${CHARCOAL}" opacity="0.4" letter-spacing="2">
    urbanstyle.ltd
  </text>
</svg>`;
}

// --- Main ---

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Generating QR codes...\n");

  for (const audience of AUDIENCES) {
    const qrSvg = await generateQrSvgContent(audience.url);
    const branded = wrapInBrandedCard(qrSvg, audience.label);
    const outPath = join(OUTPUT_DIR, `qr-${audience.id}.svg`);

    writeFileSync(outPath, branded, "utf-8");
    console.log(`  ${outPath}`);
    console.log(`    -> ${audience.url}\n`);
  }

  console.log("Done! QR codes saved to public/qr/");
  console.log("\nTo use real QR codes (if placeholders were generated):");
  console.log("  npm install --save-dev qrcode");
  console.log("  node scripts/generate-qr-codes.mjs");
}

main().catch((err) => {
  console.error("Error generating QR codes:", err);
  process.exit(1);
});
