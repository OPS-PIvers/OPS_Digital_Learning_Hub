#!/bin/bash

# OPS Tech Image Resizer Script
# This script resizes logos and images to web-optimized sizes
# Usage: ./resize-images.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOGOS_DIR="$SCRIPT_DIR/assets/logos"
RESIZED_DIR="$LOGOS_DIR/resized"

echo "=========================================="
echo "OPS Tech Image Resizer"
echo "=========================================="
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed."
    echo "Install it with: sudo apt-get install imagemagick"
    exit 1
fi

# Create resized directory if it doesn't exist
mkdir -p "$RESIZED_DIR"

echo "Resizing images in: $LOGOS_DIR"
echo "Output directory: $RESIZED_DIR"
echo ""

# Function to resize image
resize_image() {
    local input="$1"
    local output="$2"
    local size="$3"
    local quality="${4:-95}"

    echo "  Creating: $(basename "$output") (${size})"
    convert "$input" -resize "$size" -quality "$quality" "$output"
}

# Resize Primary Logo
if [ -f "$LOGOS_DIR/OPS Tech Logo_Primary.png" ]; then
    echo "Resizing Primary Logo..."
    resize_image "$LOGOS_DIR/OPS Tech Logo_Primary.png" "$RESIZED_DIR/OPS Tech Logo_Primary_1200.png" "1200x"
    resize_image "$LOGOS_DIR/OPS Tech Logo_Primary.png" "$RESIZED_DIR/OPS Tech Logo_Primary_600.png" "600x"
    resize_image "$LOGOS_DIR/OPS Tech Logo_Primary.png" "$RESIZED_DIR/OPS Tech Logo_Primary_300.png" "300x"
    echo ""
fi

# Resize Secondary Badge
if [ -f "$LOGOS_DIR/OPS Tech Logo_Secondary_badge.png" ]; then
    echo "Resizing Secondary Badge..."
    resize_image "$LOGOS_DIR/OPS Tech Logo_Secondary_badge.png" "$RESIZED_DIR/OPS Tech Logo_Secondary_badge_640.png" "640x"
    resize_image "$LOGOS_DIR/OPS Tech Logo_Secondary_badge.png" "$RESIZED_DIR/OPS Tech Logo_Secondary_badge_320.png" "320x"
    echo ""
fi

# Resize Torch Icon (Favicon sizes)
if [ -f "$LOGOS_DIR/Torch Icon.png" ]; then
    echo "Resizing Torch Icon (Favicon sizes)..."
    resize_image "$LOGOS_DIR/Torch Icon.png" "$RESIZED_DIR/Torch Icon_512.png" "512x512"
    resize_image "$LOGOS_DIR/Torch Icon.png" "$RESIZED_DIR/Torch Icon_256.png" "256x256"
    resize_image "$LOGOS_DIR/Torch Icon.png" "$RESIZED_DIR/Torch Icon_128.png" "128x128"
    resize_image "$LOGOS_DIR/Torch Icon.png" "$RESIZED_DIR/Torch Icon_64.png" "64x64"
    resize_image "$LOGOS_DIR/Torch Icon.png" "$RESIZED_DIR/Torch Icon_32.png" "32x32"
    echo ""
fi

echo "=========================================="
echo "Resize complete!"
echo "=========================================="
echo ""
echo "File sizes:"
ls -lh "$RESIZED_DIR"
