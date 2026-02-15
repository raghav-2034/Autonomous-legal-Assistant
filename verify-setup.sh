#!/bin/bash

echo "🔍 Verifying AI Legal Intelligence System Setup..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Found $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} Found v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check root dependencies
echo -n "Checking root dependencies... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Not installed - run 'npm install'"
fi

# Check backend
echo ""
echo "Backend:"
echo -n "  Dependencies... "
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Not installed - run 'cd backend && npm install'"
fi

echo -n "  Environment... "
if [ -f "backend/.env" ]; then
    if grep -q "OPENAI_API_KEY=sk-" backend/.env; then
        echo -e "${GREEN}✓${NC} Configured"
    else
        echo -e "${YELLOW}⚠${NC} API key not set in backend/.env"
    fi
else
    echo -e "${RED}✗${NC} backend/.env not found - copy from .env.example"
fi

# Check frontend
echo ""
echo "Frontend:"
echo -n "  Dependencies... "
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Not installed - run 'cd frontend && npm install'"
fi

echo -n "  Environment... "
if [ -f "frontend/.env.local" ]; then
    echo -e "${GREEN}✓${NC} Configured"
else
    echo -e "${YELLOW}⚠${NC} frontend/.env.local not found (optional)"
fi

# Check project structure
echo ""
echo "Project Structure:"

REQUIRED_DIRS=(
    "backend/agents"
    "backend/lib"
    "backend/routes"
    "frontend/app"
    "frontend/components"
    "frontend/lib"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    echo -n "  $dir... "
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
    fi
done

# Check key files
echo ""
echo "Key Files:"

REQUIRED_FILES=(
    "backend/server.js"
    "backend/routes/index.js"
    "frontend/app/page.js"
    "frontend/app/layout.js"
    "package.json"
)

for file in "${REQUIRED_FILES[@]}"; do
    echo -n "  $file... "
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
    fi
done

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "backend/.env" ] && grep -q "OPENAI_API_KEY=sk-" backend/.env && [ -d "backend/node_modules" ] && [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓ Setup Complete!${NC}"
    echo ""
    echo "Ready to start:"
    echo "  npm run dev"
    echo ""
    echo "Access at:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:5000"
else
    echo -e "${YELLOW}⚠ Setup Incomplete${NC}"
    echo ""
    echo "Next steps:"
    if [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
        echo "  1. Run: npm run install:all"
    fi
    if [ ! -f "backend/.env" ]; then
        echo "  2. Copy: cp backend/.env.example backend/.env"
    fi
    if ! grep -q "OPENAI_API_KEY=sk-" backend/.env 2>/dev/null; then
        echo "  3. Add your OpenAI API key to backend/.env"
    fi
    echo ""
    echo "Then run: npm run dev"
fi

echo ""
