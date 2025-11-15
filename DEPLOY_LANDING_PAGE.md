# Deploy Landing Page to full-suiteproductivity-app

## Quick Instructions

Since the web environment can only push to `Full-Suite-Productivity-App`, you need to manually apply the landing page to `full-suiteproductivity-app`.

### Option 1: Apply the Patch File (Recommended)

```bash
# Navigate to your full-suiteproductivity-app repository
cd /path/to/full-suiteproductivity-app

# Download and apply the patch
curl -o landing-page.patch https://raw.githubusercontent.com/pilotwaffle/Full-Suite-Productivity-App/claude/productivity-suite-plan-01G1WEqreztmuPkm1Z8DEADC/landing-page.patch

# Apply the patch
git apply landing-page.patch

# Review the changes
git status
git diff

# Commit and push
git add .
git commit -m "feat: add comprehensive marketing landing page"
git push origin main
```

### Option 2: Manual File Copy

If the patch doesn't apply cleanly, manually copy these files from `Full-Suite-Productivity-App` to `full-suiteproductivity-app`:

**New directories:**
```bash
src/app/landing/
src/components/landing/
```

**Modified file:**
```bash
src/components/layout/Sidebar.tsx
```

**All new files:**
- `src/app/landing/layout.tsx`
- `src/app/landing/page.tsx`
- `src/components/landing/BenefitsSection.tsx`
- `src/components/landing/CTASection.tsx`
- `src/components/landing/FAQSection.tsx`
- `src/components/landing/FeaturesSection.tsx`
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/LandingFooter.tsx`
- `src/components/landing/ScreenshotsSection.tsx`
- `src/components/landing/TestimonialsSection.tsx`

### What You'll Get

Once deployed to Vercel, the landing page will be available at:
- `https://full-suiteproductivity-app.vercel.app/landing`

**Landing Page Sections:**
1. ✅ Hero Section - Compelling headline, CTAs, benefits, stats
2. ✅ Features Section - 6 feature cards with icons
3. ✅ Benefits Section - 4 productivity improvements
4. ✅ Screenshots Section - Visual showcase
5. ✅ Testimonials - 6 user reviews with stats
6. ✅ FAQ - 8 common questions with accordion
7. ✅ CTA Section - Conversion-focused gradient section
8. ✅ Footer - Links and social media

**Features:**
- Fully responsive (mobile/tablet/desktop)
- Complete dark mode support
- Professional animations and hover effects
- SEO optimized
- Accessibility compliant (WCAG)

### Verification

After deployment:
1. Visit `/landing` on your Vercel deployment
2. Check dark mode toggle works
3. Test responsiveness on mobile
4. Verify all links work correctly
5. Check all sections scroll smoothly
