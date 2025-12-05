# OPS Tech Stylesheet Documentation

This document provides guidelines and resources for maintaining consistent styling across the OPS Digital Learning Hub.

## Table of Contents
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Media Assets](#media-assets)
- [Usage Examples](#usage-examples)

---

## Color Palette

### Primary Blue
- **Primary**: `#2d3f89`
- **Dark**: `#1d2a5d`
- **Light**: `#4356a0`
- **Lighter**: `#eaecf5`

### Red Accents
- **Primary**: `#ad2122`
- **Dark**: `#7a1718`
- **Light**: `#c13435`
- **Lighter**: `#e5c7c7`

### Gray Scale
- **Darkest**: `#333333`
- **Primary**: `#666666`
- **Light**: `#999999`
- **Lighter**: `#CCCCCC`
- **Lightest**: `#f3f3f3`
- **Body Text**: `#555555`

---

## Typography

**Primary Font**: [Lexend](https://fonts.google.com/specimen/Lexend)

**Font Weights Available**:
- Light (300)
- Regular (400)
- Medium (500)
- Semi-Bold (600)
- Bold (700)

**Google Fonts Import**:
```html
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**CSS**:
```css
font-family: 'Lexend', sans-serif;
```

---

## Media Assets

All media assets are hosted on GitHub and publicly accessible via raw.githubusercontent.com.

### Logos (Original)

#### Primary Logo
- **Dimensions**: 3450 x 603
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/OPS%20Tech%20Logo_Primary.png

#### Secondary Badge
- **Dimensions**: 1280 x 720
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/OPS%20Tech%20Logo_Secondary_badge.png

#### Torch Icon
- **Dimensions**: 1024 x 1024
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/Torch%20Icon.png

#### Spartan Head SVG
- **Format**: Vector (SVG)
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/spartan_head.svg

---

### Logos (Web-Optimized)

#### Primary Logo (Responsive Sizes)

**1200px width** - Large displays
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/OPS%20Tech%20Logo_Primary_1200.png
- **File Size**: ~41KB

**600px width** - Medium displays
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/OPS%20Tech%20Logo_Primary_600.png
- **File Size**: ~17KB

**300px width** - Mobile/Small displays
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/OPS%20Tech%20Logo_Primary_300.png
- **File Size**: ~7.3KB

#### Secondary Badge (Responsive Sizes)

**640px width** - Large displays
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/OPS%20Tech%20Logo_Secondary_badge_640.png
- **File Size**: ~109KB

**320px width** - Small displays
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/OPS%20Tech%20Logo_Secondary_badge_320.png
- **File Size**: ~36KB

#### Torch Icon (Favicon Sizes)

**512x512** - High-res favicon
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/Torch%20Icon_512.png
- **File Size**: ~85KB

**256x256** - Standard favicon
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/Torch%20Icon_256.png
- **File Size**: ~29KB

**128x128** - Medium icon
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/Torch%20Icon_128.png
- **File Size**: ~11KB

**64x64** - Small icon
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/Torch%20Icon_64.png
- **File Size**: ~4.6KB

**32x32** - Tiny icon
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/Torch%20Icon_32.png
- **File Size**: ~2.6KB

---

### Animations

#### Intro Image
- **Dimensions**: 1600 x 900
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/animations/OPS%20TEch%20Intro%20vid.png

#### Loader Video
- **Format**: MP4
- **URL**: https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/animations/OPS%20Tech%20Loader.mp4

---

## Usage Examples

### Responsive Logo with Tailwind CSS

```html
<img
  src="https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/OPS%20Tech%20Logo_Primary_1200.png"
  alt="OPS Tech Logo"
  class="w-full max-w-md mx-auto"
>
```

### Multiple Favicon Sizes

```html
<link rel="icon" type="image/png" sizes="32x32"
  href="https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/Torch%20Icon_32.png">
<link rel="icon" type="image/png" sizes="64x64"
  href="https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/Torch%20Icon_64.png">
<link rel="icon" type="image/png" sizes="128x128"
  href="https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/logos/resized/Torch%20Icon_128.png">
```

### Looping Video Animation (MP4 as GIF replacement)

```html
<video autoplay loop muted playsinline class="w-32 h-32">
  <source
    src="https://raw.githubusercontent.com/OPS-PIvers/OPS_Digital_Learning_Hub/main/assets/animations/OPS%20Tech%20Loader.mp4"
    type="video/mp4">
</video>
```

### Tailwind Config (OPS Color Palette)

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ops: {
          primary: '#2d3f89',
          dark: '#1d2a5d',
          light: '#4356a0',
          lighter: '#eaecf5',
          red: {
            primary: '#ad2122',
            dark: '#7a1718',
            light: '#c13435',
            lighter: '#e5c7c7',
          },
          gray: {
            darkest: '#333333',
            primary: '#666666',
            light: '#999999',
            lighter: '#CCCCCC',
            lightest: '#f3f3f3',
            body: '#555555',
          }
        }
      }
    }
  }
}
```

---

## Generating Optimized Images

Use the included `resize-images.sh` script to regenerate optimized versions of logos:

```bash
./resize-images.sh
```

This script uses ImageMagick to create web-optimized versions of all logos while maintaining quality.

---

**Last Updated**: December 2024
**Maintained By**: OPS Tech Team
