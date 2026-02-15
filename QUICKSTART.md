# Quick Start Guide

Get your AI Legal Intelligence Platform running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm run install:all
```

This installs dependencies for root, backend, and frontend.

## Step 2: Configure Backend

1. Copy the environment template:
```bash
cd backend
cp .env.example .env
```

2. Edit `backend/.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=5000
NODE_ENV=development
```

Get your API key from: https://platform.openai.com/api-keys

## Step 3: Configure Frontend (Optional)

```bash
cd frontend
cp .env.local.example .env.local
```

Default configuration works for local development.

## Step 4: Start Development Servers

From the root directory:

```bash
npm run dev
```

This starts both servers:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Step 5: Explore Features

Open http://localhost:3000 and try:

1. **Legal Chat** - Ask legal questions
2. **Describe Problem** - Get case categorization
3. **Risk Radar** - Analyze document risks
4. **Strategy Simulator** - Explore legal strategies
5. **Rights Analyzer** - Check constitutional rights
6. **Constitution Explainer** - Learn about provisions

## Troubleshooting

### "Cannot find module"
```bash
npm run install:all
```

### "Port already in use"
Change port in `backend/.env`:
```env
PORT=5001
```

### "OpenAI API Error"
- Check your API key in `backend/.env`
- Verify your OpenAI account has credits
- Remove any extra spaces from the key

### Frontend not connecting to backend
Check `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Development Tips

- **Hot Reload**: Both servers auto-reload on file changes
- **Dark Mode**: Toggle in navbar (top right)
- **API Health**: Visit http://localhost:5000/health
- **Console Logs**: Check browser console and terminal for errors

## Production Deployment

1. Build frontend:
```bash
cd frontend
npm run build
```

2. Set production environment:
```bash
# backend/.env
NODE_ENV=production
```

3. Start servers:
```bash
# Backend
cd backend
npm start

# Frontend (in another terminal)
cd frontend
npm start
```

## Next Steps

- Customize the UI colors in `frontend/tailwind.config.js`
- Add more agents in `backend/agents/`
- Modify prompts for better responses
- Add authentication if needed
- Deploy to Vercel (frontend) and Railway/Render (backend)

## Support

For issues or questions:
1. Check SETUP.md for detailed instructions
2. Review PROJECT_STRUCTURE.md for architecture
3. Check the console logs for error messages

Happy coding! ⚖️
