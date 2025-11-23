#!/bin/bash

# Post-Session Commit Script
# Run this after completing work with an AI agent

echo "🤖 AI Collaboration - Post-Session Commit"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Build Check
echo "🔨 Running final build check..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    echo -e "${RED}Fix build errors before committing!${NC}"
    echo ""
    echo "Run: npm run build"
    exit 1
fi
echo ""

# 2. Show changes
echo "📋 Changes to be committed:"
git status --short
echo ""

# 3. Ask for agent name
echo -e "${BLUE}Which AI agent did you work with?${NC}"
echo "1) Claude"
echo "2) Antigravity"
read -p "Enter choice (1 or 2): " agent_choice

if [ "$agent_choice" = "1" ]; then
    AGENT="Claude"
elif [ "$agent_choice" = "2" ]; then
    AGENT="Antigravity"
else
    echo -e "${RED}Invalid choice. Exiting.${NC}"
    exit 1
fi

# 4. Ask for description
echo ""
read -p "Short description of changes: " description

# 5. Show modified files
echo ""
echo "Modified files:"
git diff --name-only | head -20

# 6. Build commit message
echo ""
echo -e "${BLUE}Commit message:${NC}"
echo "---"
echo "Session with $AGENT: $description"
echo ""
echo "Modificări:"
git diff --name-only | while read file; do
    echo "- $file"
done
echo ""
echo "Build: ✅ Success"
echo "---"
echo ""

# 7. Confirm
read -p "Commit with this message? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "Commit cancelled."
    exit 0
fi

# 8. Commit
COMMIT_MSG="Session with $AGENT: $description

Modificări:
$(git diff --name-only | while read file; do echo "- $file"; done)

Build: ✅ Success"

git add -A
git commit -m "$COMMIT_MSG"

echo ""
echo -e "${GREEN}✅ Changes committed!${NC}"
echo ""

# 9. Ask about push
read -p "Push to GitHub? (y/n): " push_confirm

if [ "$push_confirm" = "y" ]; then
    git push origin main
    echo -e "${GREEN}✅ Pushed to GitHub!${NC}"
else
    echo -e "${YELLOW}⚠️  Remember to push later: git push origin main${NC}"
fi

echo ""

# 10. Ask about session log
read -p "Update SESSION_LOG.md? (y/n): " log_confirm

if [ "$log_confirm" = "y" ]; then
    # Get current date and time
    DATETIME=$(date "+%Y-%m-%d %H:%M")

    # Prepare entry
    LOG_ENTRY="
## $DATETIME - $AGENT
**Status:** ✅ Deployed
**Modificări:**
$(git diff HEAD~1 --name-only | while read file; do echo "- \`$file\`: [add description]"; done)
**Build:** ✅ Success
**Issues Fixed:** [add description]
**Issues Found:** None
**Notes:** $description

---
"

    # Insert at line 16 (after the template section)
    if [ -f "SESSION_LOG.md" ]; then
        # Create temp file with new entry
        head -n 15 SESSION_LOG.md > SESSION_LOG.tmp
        echo "$LOG_ENTRY" >> SESSION_LOG.tmp
        tail -n +16 SESSION_LOG.md >> SESSION_LOG.tmp
        mv SESSION_LOG.tmp SESSION_LOG.md

        echo -e "${GREEN}✅ SESSION_LOG.md updated!${NC}"
        echo -e "${YELLOW}Please edit SESSION_LOG.md to add detailed descriptions.${NC}"

        # Commit the log update
        git add SESSION_LOG.md
        git commit -m "docs: Update session log for $AGENT session"

        if [ "$push_confirm" = "y" ]; then
            git push origin main
        fi
    else
        echo -e "${YELLOW}⚠️  SESSION_LOG.md not found. Skipping.${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Session complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Review changes on GitHub"
echo "2. Check Vercel deployment status"
echo "3. Test the app if possible"
