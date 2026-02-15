# Setup Instructions

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key

## Quick Start

### Option 1: Automated Setup (macOS/Linux)

```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. Install root dependencies:
```bash
npm install
```

2. Setup backend:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
cd ..
```

3. Setup frontend:
```bash
cd frontend
npm install
cp .env.local.example .env.local
cd ..
```

## Configuration

### Backend (.env)

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

Run both frontend and backend:
```bash
npm run dev
```

Or run separately:

Backend only:
```bash
npm run dev:backend
```

Frontend only:
```bash
npm run dev:frontend
```

### Production Build

Build frontend:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## Features

1. **Legal Chat** - `/legal-chat`
   - Interactive AI chat for legal questions

2. **Describe Problem** - `/describe-problem`
   - Categorize and analyze legal problems

3. **Risk Radar** - `/risk-radar`
   - Document risk analysis and fairness scoring

4. **Strategy Simulator** - `/strategy-simulator`
   - Generate multiple legal strategy approaches

5. **Rights Analyzer** - `/rights-analyzer`
   - Constitutional rights exposure analysis

6. **Constitution Explainer** - `/constitution`
   - Simple explanations of constitutional provisions

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

Backend:
```bash
PORT=5001 npm run dev:backend
```

Frontend:
```bash
PORT=3001 npm run dev:frontend
```

### OpenAI API Errors

- Verify your API key is correct in `backend/.env`
- Check your OpenAI account has credits
- Ensure no extra spaces in the API key

### Module Not Found

```bash
# Clean install
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

## Development Tips

- Hot reload is enabled for both frontend and backend
- Check browser console for frontend errors
- Check terminal for backend errors
- Use dark/light mode toggle in navbar

## License

MIT
