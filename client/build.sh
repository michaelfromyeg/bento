#!/bin/bash

# Copy the site into dist/ for deployment. Usage: `bash build.sh`

set -euo pipefail

rm -rf dist
mkdir -p dist

echo "bento.michaeldemar.co" > dist/CNAME

cp -r assets dist
cp app.css index.html dist

echo "Build complete!"
