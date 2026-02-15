# Getting Started with AI Legal Intelligence System

Welcome! This guide will help you get the platform running in minutes.

## 📋 What You'll Need

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
3. **Terminal/Command Line** - Built into macOS/Linux
4. **Code Editor** (optional) - VS Code, Sublime, etc.

## 🚀 Installation Steps

### Step 1: Download the Project

If you have the project files, navigate to the directory:
```bash
cd ai-legal-intelligence
```

### Step 2: Install Dependencies

Run this single command to install everything:
```bash
npm run install:all
```

This installs dependencies for:
- Root project
- Backend server
- Frontend application

**Wait time:** 2-3 minutes depending on internet speed

### Step 3: Configure Backend

1. Navigate to backend folder:
```bash
cd backend
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Open `backend/.env` in any text editor and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-key-here
PORT=5000
NODE_ENV=development
```

**Where to get API key:**
- Go to https://platform.openai.com/api-keys
- Sign up or log in
- Click "Create new secret key"
- Copy the key (starts with `sk-`)
- Paste into `.env` file

4. Return to root directory:
```bash
cd ..
```

### Step 4: Start the Application

From the root directory, run:
```bash
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:5000
✓ Ready on http://localhost:3000
```

### Step 5: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

You should see the beautiful landing page with 6 feature cards!

## 🎯 Testing the Features

### 1. Legal Chat
- Click "Legal Chat" in navbar
- Type a question like: "What is a contract?"
- Click Send
- Watch the AI respond with animated bubbles

### 2. Describe Problem
- Click "Describe Problem"
- Enter: "My employer hasn't paid me for 3 months"
- Click "Analyze Problem"
- See categorization and next steps

### 3. Risk Radar
- Click "Risk Radar"
- Paste any contract text (or use sample below)
- Click "Analyze Document"
- See risk score and flagged clauses

**Sample Contract:**
```
EMPLOYMENT AGREEMENT

Employee agrees to work exclusively for Company for 5 years.
Employee may not work for any competitor for 10 years after leaving.
Company may terminate at any time without notice or severance.
Employee waives all rights to sue Company for any reason.
```

### 4. Strategy Simulator
- Click "Strategy"
- Enter: "Contract dispute over payment terms"
- See 3 different strategic approaches

### 5. Rights Analyzer
- Click "Rights"
- Enter: "Police searched my car without permission"
- See constitutional rights analysis

### 6. Constitution Explainer
- Click "Constitution"
- Enter: "Article 14" or "Right to Equality"
- Get simple explanation

## 🎨 UI Features to Try

### Dark/Light Mode
- Click sun/moon icon in top-right navbar
- Watch smooth theme transition
- Preference is saved automatically

### Animations
- Hover over feature cards on home page
- Watch cards lift and scale
- Notice gradient animations
- See smooth page transitions

### Mobile View
- Resize browser window
- Click hamburger menu (three lines)
- Test mobile navigation
- All features work on mobile

## 🔧 Troubleshooting

### "Cannot find module" Error
```bash
npm run install:all
```

### "Port 3000 already in use"
Kill the process using port 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

Or change the port:
```bash
PORT=3001 npm run dev:frontend
```

### "Port 5000 already in use"
Change backend port in `backend/.env`:
```env
PORT=5001
```

Then update frontend to match:
```bash
# In frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### "OpenAI API Error"
1. Check your API key in `backend/.env`
2. Verify no extra spaces before/after key
3. Ensure key starts with `sk-`
4. Check OpenAI account has credits
5. Try generating a new key

### Frontend Can't Connect to Backend
1. Verify backend is running (check terminal)
2. Visit http://localhost:5000/health
3. Should see: `{"status":"ok","message":"..."}`
4. Check `frontend/.env.local` has correct API URL

### "Module not found: @heroicons/react"
```bash
cd frontend
npm install @heroicons/react
cd ..
```

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 💡 Tips for Best Experience

1. **Use Chrome or Firefox** for best performance
2. **Enable JavaScript** (required)
3. **Allow cookies** for theme persistence
4. **Use good internet** for AI responses
5. **Try dark mode** - it looks amazing!

## 🎓 Learning the Platform

### For Users
1. Start with Legal Chat - easiest to understand
2. Try Describe Problem - see categorization
3. Explore Risk Radar - paste any contract
4. Experiment with Strategy Simulator
5. Learn with Constitution Explainer

### For Developers
1. Read [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
2. Check [FEATURES.md](FEATURES.md) for API details
3. Review code in `backend/agents/`
4. Explore UI in `frontend/app/`
5. Customize in `frontend/tailwind.config.js`

## 🚢 Next Steps

### Customize
- Change colors in `frontend/tailwind.config.js`
- Modify AI prompts in `backend/agents/*.js`
- Add your logo to `frontend/public/`
- Update meta tags in `frontend/app/layout.js`

### Deploy
- Follow [DEPLOYMENT.md](DEPLOYMENT.md)
- Deploy frontend to Vercel
- Deploy backend to Railway
- Share with the world!

### Extend
- Add new features
- Create more agents
- Implement authentication
- Add database for history

## 📚 Documentation

- **[README.md](README.md)** - Project overview
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup
- **[SETUP.md](SETUP.md)** - Detailed installation
- **[FEATURES.md](FEATURES.md)** - Feature docs
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production guide
- **[CHECKLIST.md](CHECKLIST.md)** - Pre-deployment checklist

## ❓ Common Questions

**Q: Do I need to pay for OpenAI?**
A: Yes, but it's pay-as-you-go. Typical usage: $10-50/month.

**Q: Can I use a different AI model?**
A: Yes! Modify `backend/lib/openai.js` to use other providers.

**Q: Is this production-ready?**
A: Yes! Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production setup.

**Q: Can I customize the UI?**
A: Absolutely! All styles are in Tailwind CSS - easy to modify.

**Q: Do I need a database?**
A: No, the platform is stateless. Add one if you want history.

**Q: Can I add authentication?**
A: Yes, integrate NextAuth.js or similar.

**Q: Is it mobile-friendly?**
A: Yes, fully responsive design works on all devices.

**Q: Can I remove features?**
A: Yes, just delete the page folder and remove from navbar.

## 🎉 You're Ready!

You now have a fully functional AI legal intelligence platform running locally!

**What to do next:**
1. ✅ Test all 6 features
2. ✅ Try dark/light mode
3. ✅ Test on mobile
4. ✅ Read the documentation
5. ✅ Customize to your needs
6. ✅ Deploy to production

## 💬 Need Help?

1. Check [SETUP.md](SETUP.md) for detailed instructions
2. Review [CHECKLIST.md](CHECKLIST.md) for common issues
3. Read error messages carefully
4. Check browser console (F12)
5. Check terminal output

## 🌟 Enjoy!

You're all set! Explore the platform, test the features, and see the power of AI-driven legal intelligence.

**Remember:** This is for educational purposes only. Always consult qualified legal professionals for actual legal advice.

---

**Happy coding! ⚖️**
