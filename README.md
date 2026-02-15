# ⚖️ AI Legal Intelligence System

> A full-stack AI-powered legal intelligence platform with modern glassmorphism UI and fluid animations.

![Status](https://img.shields.io/badge/status-production--ready-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

## ✨ Features

🤖 **6 Powerful AI Tools:**
- 💬 **Legal Chat** - Interactive AI legal assistant
- 📋 **Problem Analyzer** - Categorize and understand legal issues
- 🎯 **Risk Radar** - Document risk analysis with fairness scoring
- 🎲 **Strategy Simulator** - Multiple approach recommendations
- ⚖️ **Rights Analyzer** - Constitutional rights exposure analysis
- 📖 **Constitution Explainer** - Simple constitutional education

🎨 **Modern UI/UX:**
- Glassmorphism design with backdrop blur
- Water-style fluid gradient animations
- Dark/Light mode with smooth transitions
- Fully responsive (mobile, tablet, desktop)
- Framer Motion powered animations
- Floating chatbot button for quick access

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# 1. Install all dependencies
npm run install:all

# 2. Configure backend
cd backend
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# 3. Start development servers
cd ..
npm run dev
```

**Access the app:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

📖 **Detailed guides:** See [QUICKSTART.md](QUICKSTART.md) or [SETUP.md](SETUP.md)

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **Heroicons** - Icon library

### Backend
- **Express.js** - Web framework
- **OpenAI API** - AI completions
- **Node.js** - Runtime environment
- **Modular Architecture** - Clean agent separation

## 📁 Project Structure

```
ai-legal-intelligence/
├── backend/              # Express.js API
│   ├── agents/          # AI logic modules (6 agents)
│   ├── lib/             # OpenAI integration
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
├── frontend/            # Next.js application
│   ├── app/            # Pages (App Router)
│   ├── components/     # Reusable UI components
│   ├── lib/            # API client
│   └── public/         # Static assets
└── docs/               # Documentation
```

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](SETUP.md)** - Detailed installation guide
- **[FEATURES.md](FEATURES.md)** - Complete feature documentation
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Architecture details
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[SUMMARY.md](SUMMARY.md)** - Project overview

## 🎯 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/legal-chat` | POST | Legal chat conversation |
| `/api/describe-problem` | POST | Problem classification |
| `/api/risk-radar` | POST | Document risk analysis |
| `/api/strategy` | POST | Strategy generation |
| `/api/rights` | POST | Rights exposure analysis |
| `/api/constitution` | POST | Constitution explanation |
| `/health` | GET | Health check |

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🛠️ Development

```bash
# Run both servers
npm run dev

# Run separately
npm run dev:frontend
npm run dev:backend

# Build for production
npm run build

# Verify setup
chmod +x verify-setup.sh
./verify-setup.sh
```

## 🚢 Deployment

**Recommended:**
- Frontend: [Vercel](https://vercel.com) (optimized for Next.js)
- Backend: [Railway](https://railway.app) or [Render](https://render.com)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🎨 UI Showcase

- **Glassmorphism** - Frosted glass effect with backdrop blur
- **Fluid Gradients** - Animated water-style backgrounds
- **Smooth Animations** - Framer Motion powered transitions
- **Dark/Light Mode** - Full theme support with toggle
- **Responsive Design** - Works beautifully on all devices

## 🔒 Security

- ✅ Environment variable protection
- ✅ Input validation on all endpoints
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ No hardcoded secrets
- ✅ Educational disclaimer on all AI responses

## ⚠️ Disclaimer

**This information is for educational purposes only and does not constitute legal advice.**

This platform provides AI-generated information to help users understand legal concepts. Always consult with a qualified attorney for legal advice specific to your situation.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 🤝 Contributing

Contributions welcome! To add features:

1. Add new agent in `backend/agents/`
2. Create route in `backend/routes/index.js`
3. Build page in `frontend/app/`
4. Update API client in `frontend/lib/api.js`
5. Test thoroughly

## 💡 Support

- 📖 Check documentation files
- 🐛 Report issues on GitHub
- 💬 Review code comments
- 🔍 Check console logs for errors

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [OpenAI API](https://platform.openai.com/docs)
- [Express.js](https://expressjs.com)

---

**Built with ❤️ for legal education and accessibility**
# Autonomous-legal-Assistant
