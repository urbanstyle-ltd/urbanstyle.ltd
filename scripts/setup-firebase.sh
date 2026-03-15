#!/bin/bash
# UrbanStyle Firebase Storage Setup
#
# Run this once to initialize Firebase for image hosting.
# Requires: npm install -g firebase-tools
#
# Usage: bash scripts/setup-firebase.sh

set -e

echo "🔥 UrbanStyle Firebase Setup"
echo ""

# Check Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Login check
echo "1. Checking Firebase auth..."
firebase login --no-localhost 2>/dev/null || firebase login

# Initialize Storage
echo ""
echo "2. Initializing Firebase Storage..."
echo "   → Select 'Storage' when prompted"
echo "   → Use default rules for now"
echo ""

firebase init storage --project urbanstyle-ltd

# Set CORS for the bucket (allows urbanstyle.ltd to load images)
echo ""
echo "3. Setting CORS rules..."

cat > cors.json << 'CORS'
[
  {
    "origin": ["https://urbanstyle.ltd", "https://*.urbanstyle.ltd", "http://localhost:3000"],
    "method": ["GET", "HEAD"],
    "maxAgeSeconds": 86400,
    "responseHeader": ["Content-Type", "Content-Length", "Cache-Control"]
  }
]
CORS

gsutil cors set cors.json gs://urbanstyle-ltd.firebasestorage.app
rm cors.json

echo ""
echo "4. Setting storage rules..."

cat > storage.rules << 'RULES'
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read access for all images
    match /images/{allPaths=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
RULES

firebase deploy --only storage

echo ""
echo "✅ Firebase Storage is ready!"
echo ""
echo "Next steps:"
echo "  1. Process images:  npm run images:process"
echo "  2. Upload:          npm run images:upload"
echo ""
