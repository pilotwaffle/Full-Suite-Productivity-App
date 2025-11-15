# PWA Icons

This directory contains icons for the Progressive Web App.

## Required Icons

The following icon sizes are needed for PWA support across all platforms:

- `icon-72x72.png` - Android Chrome
- `icon-96x96.png` - Android Chrome, shortcuts
- `icon-128x128.png` - Android Chrome
- `icon-144x144.png` - Android Chrome
- `icon-152x152.png` - iOS Safari
- `icon-192x192.png` - Android Chrome (standard)
- `icon-384x384.png` - Android Chrome
- `icon-512x512.png` - Android Chrome (high-res), splash screens

## Generating Icons

### Option 1: Use an Online Generator

1. Visit [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
2. Upload a 512x512px source image (SVG or PNG)
3. Configure PWA settings
4. Download and extract icons to this directory

### Option 2: Use PWA Asset Generator

```bash
npm install -g pwa-asset-generator

# Generate all icons from a single source image
pwa-asset-generator source-icon.svg ./public/icons \
  --favicon \
  --type png \
  --padding "10%" \
  --background "#2563eb"
```

### Option 3: Manual Creation

Use any image editor (Photoshop, Figma, GIMP) to create icons at each required size.

**Design Guidelines:**
- Use a simple, recognizable symbol
- Ensure good contrast
- Test visibility at small sizes
- Consider safe area for rounded corners
- Background color: `#2563eb` (primary blue)
- Icon color: White or light gray

## Current Placeholder

Until proper icons are generated, create a simple icon with:
- Blue background (`#2563eb`)
- White "P" letter or checkmark symbol
- Centered, bold, easily recognizable

## Icon Design Ideas

- Checkmark + Calendar + Columns (representing all 3 features)
- Simple "P" letter in modern sans-serif
- Abstract productivity symbol
- Minimalist task completion icon
