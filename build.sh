#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
npm ci --no-audit --no-fund

echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"