# Deploy Dark Mode to full-suite-productivity.vercel.app

## Quick Instructions

Since this environment can only push to the `Full-Suite-Productivity-App` repository, you'll need to manually apply the dark mode changes to your `full-suite-productivity` repository (connected to deployment #2).

### Option 1: Using the Patch File (Recommended)

1. **Navigate to your local `full-suite-productivity` repository:**
   ```bash
   cd /path/to/full-suite-productivity
   ```

2. **Copy the patch file from this repo to that repo:**
   ```bash
   cp /path/to/Full-Suite-Productivity-App/dark-mode-feature.patch .
   ```

3. **Apply the patch:**
   ```bash
   git apply dark-mode-feature.patch
   ```

4. **Review the changes:**
   ```bash
   git status
   git diff
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: add dark mode support with toggle button

- Add useDarkMode hook with localStorage persistence
- Update all components with dark mode styles
- Add moon/sun toggle button in TopBar
- Configure Tailwind for dark mode
- Update README with dark mode documentation"

   git push origin main
   ```

6. **Vercel will automatically deploy** the changes to `full-suite-productivity.vercel.app`

### Option 2: Manual File Copy

If the patch doesn't apply cleanly, you can manually copy the changed files:

1. **Copy these files from `Full-Suite-Productivity-App` to `full-suite-productivity`:**

   **New file:**
   - `src/hooks/useDarkMode.ts`

   **Modified files:**
   - `tailwind.config.js`
   - `src/app/globals.css`
   - `src/app/page.tsx`
   - `src/components/layout/TopBar.tsx`
   - `src/components/layout/Sidebar.tsx`
   - `src/components/layout/AppShell.tsx`
   - `src/components/shared/Button.tsx`
   - `src/components/shared/Input.tsx`
   - `src/components/shared/Modal.tsx`
   - `README.md`

2. **Commit and push as shown in Option 1 step 5**

### What's Included

The patch includes all 5 commits:
1. ✅ Vercel deployment instructions
2. ✅ Dark mode core implementation (useDarkMode hook)
3. ✅ Updated all components with dark mode styles
4. ✅ Updated README documentation
5. ✅ Fixed Vercel URL in README

## Verification

After deployment, visit `https://full-suite-productivity.vercel.app` and:
- Look for the moon/sun icon in the top-right corner
- Click it to toggle between light and dark modes
- Refresh the page - your preference should be saved
- Check all pages (Dashboard, Todos, Kanban, Calendar) for consistent dark mode styling
