#!/bin/bash

# Pre-Session Check Script
# Run this before starting work with any AI agent

echo "🤖 AI Collaboration - Pre-Session Check"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track errors
ERRORS=0

# 1. Git Status
echo "📋 Checking Git Status..."
if git diff-index --quiet HEAD --; then
    echo -e "${GREEN}✅ Working tree is clean${NC}"
else
    echo -e "${RED}❌ You have uncommitted changes!${NC}"
    echo -e "${YELLOW}Run: git status${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Pull latest changes
echo "🔄 Checking for remote updates..."
git fetch origin main > /dev/null 2>&1
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo -e "${GREEN}✅ Local is up to date with remote${NC}"
else
    echo -e "${YELLOW}⚠️  Remote has new changes!${NC}"
    echo -e "${YELLOW}Run: git pull origin main${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Build Check
echo "🔨 Running build check..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    echo -e "${YELLOW}Run: npm run build${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Recent Changes
echo "📝 Recent commits (last 3):"
git log --oneline -3 --decorate --color=always
echo ""

# 5. Modified Files
echo "📂 Recently modified files:"
git diff --name-only HEAD~3 HEAD | head -10
echo ""

# 6. Environment Check
echo "🔐 Environment Variables Check..."
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local exists${NC}"

    # Check for required variables
    REQUIRED_VARS=("ANTHROPIC_API_KEY" "OPENAI_API_KEY" "NEXT_PUBLIC_SUPABASE_URL" "STRIPE_SECRET_KEY")
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" .env.local; then
            echo -e "${GREEN}  ✅ ${var} found${NC}"
        else
            echo -e "${YELLOW}  ⚠️  ${var} missing${NC}"
        fi
    done
else
    echo -e "${RED}❌ .env.local not found!${NC}"
    echo -e "${YELLOW}Run: cp .env.example .env.local${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 7. Session Log
echo "📊 Session Log Status:"
if [ -f "SESSION_LOG.md" ]; then
    echo -e "${GREEN}✅ SESSION_LOG.md exists${NC}"
    LAST_SESSION=$(grep -m 1 "^## 20" SESSION_LOG.md)
    echo "   Last session: ${LAST_SESSION#\#\# }"
else
    echo -e "${YELLOW}⚠️  SESSION_LOG.md not found${NC}"
    echo -e "${YELLOW}Consider creating it for tracking${NC}"
fi
echo ""

# Final verdict
echo "========================================"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready to work.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Inform the AI agent about recent changes"
    echo "2. Start your session"
    echo "3. Commit frequently"
else
    echo -e "${RED}❌ $ERRORS issue(s) found. Please fix before continuing.${NC}"
    exit 1
fi
