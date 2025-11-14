# Deploy to Vercel Repository

## Quick Commands (Copy and Paste)

Run these commands in your terminal:

```bash
# Clone the repo with our code
git clone https://github.com/pilotwaffle/Full-Suite-Productivity-App.git
cd Full-Suite-Productivity-App

# Checkout the branch with our code
git checkout claude/productivity-suite-plan-01G1WEqreztmuPkm1Z8DEADC

# Add the Vercel repo as a remote
git remote add vercel https://github.com/pilotwaffle/full-suite-productivity.git

# Push this branch as 'main' to the Vercel repo (force push to overwrite)
git push vercel claude/productivity-suite-plan-01G1WEqreztmuPkm1Z8DEADC:main --force

# Done! Vercel will automatically deploy
```

## What This Does:

1. ✅ Downloads the repository with all our code
2. ✅ Switches to the branch containing the complete productivity suite
3. ✅ Connects to your Vercel-linked repository
4. ✅ Pushes our feature branch as the `main` branch to Vercel's repo
5. ✅ Triggers automatic deployment on Vercel

## After Running:

- Vercel will detect the push and start building
- Your app will be live at: `https://full-suite-productivity.vercel.app`
- Check deployment status at: `https://vercel.com/pilotwaffles-projects/full-suite-productivity`

## What Gets Deployed:

✨ **Complete Productivity Suite**
- Dashboard with stats
- Todo List (with filters, priorities, inline editing)
- Kanban Board (drag-and-drop, 3 columns)
- Calendar (month view, color-coded events)
- Modern UI with Tailwind CSS
- All data stored in localStorage
- 52 files, 9,517 lines of code

Deployment should complete in ~2 minutes!
