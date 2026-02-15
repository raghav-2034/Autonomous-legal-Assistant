#!/bin/bash

echo "🚀 Setting up AI Legal Intelligence System..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Setup backend
echo "📦 Setting up backend..."
cd backend
npm install
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created backend/.env - Please add your OPENAI_API_KEY"
fi
cd ..

# Setup frontend
echo "📦 Setting up frontend..."
cd frontend
npm install
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "✅ Created frontend/.env.local"
fi
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add your OpenAI API key to backend/.env"
echo "2. Run 'npm run dev' to start both servers"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
