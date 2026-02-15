# Project Structure

```
ai-legal-intelligence/
├── backend/                      # Node.js/Express backend
│   ├── agents/                   # AI agent modules
│   │   ├── chatAgent.js         # Legal chat functionality
│   │   ├── classificationAgent.js # Problem classification
│   │   ├── constitutionAgent.js  # Constitution explainer
│   │   ├── rightsAgent.js       # Rights analysis
│   │   ├── riskAgent.js         # Document risk analysis
│   │   └── strategyAgent.js     # Strategy generation
│   ├── lib/                     # Shared utilities
│   │   └── openai.js           # OpenAI API wrapper
│   ├── routes/                  # API routes
│   │   └── index.js            # Main router
│   ├── .env.example            # Environment template
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express server
│
├── frontend/                    # Next.js 14 frontend
│   ├── app/                    # App router pages
│   │   ├── constitution/       # Constitution explainer page
│   │   ├── describe-problem/   # Problem description page
│   │   ├── legal-chat/        # Chat interface page
│   │   ├── rights-analyzer/   # Rights analysis page
│   │   ├── risk-radar/        # Risk analysis page
│   │   ├── strategy-simulator/ # Strategy simulator page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home page
│   ├── components/             # Reusable components
│   │   ├── LoadingSpinner.js  # Loading animation
│   │   ├── Navbar.js          # Navigation bar
│   │   └── ThemeProvider.js   # Dark/light theme
│   ├── lib/                   # Frontend utilities
│   │   └── api.js            # API client
│   ├── public/               # Static assets
│   ├── .env.local.example    # Environment template
│   ├── next.config.js        # Next.js config
│   ├── package.json          # Frontend dependencies
│   ├── postcss.config.js     # PostCSS config
│   └── tailwind.config.js    # Tailwind config
│
├── .gitignore                 # Git ignore rules
├── package.json              # Root package.json
├── PROJECT_STRUCTURE.md      # This file
├── README.md                 # Project overview
├── SETUP.md                  # Setup instructions
└── setup.sh                  # Automated setup script
```

## Key Files

### Backend

- **server.js**: Express server setup with CORS and error handling
- **routes/index.js**: API endpoint definitions
- **agents/*.js**: Modular AI logic for each feature
- **lib/openai.js**: OpenAI API integration

### Frontend

- **app/page.js**: Landing page with feature cards
- **app/*/page.js**: Feature-specific pages
- **components/Navbar.js**: Glass-style navigation
- **components/ThemeProvider.js**: Theme management
- **lib/api.js**: Axios-based API client
- **globals.css**: Glassmorphism and animation styles

## Architecture

### Backend Architecture

```
Client Request
    ↓
Express Router (routes/index.js)
    ↓
Input Validation
    ↓
Agent Module (agents/*.js)
    ↓
OpenAI API (lib/openai.js)
    ↓
Response Formatting
    ↓
JSON Response + Disclaimer
```

### Frontend Architecture

```
User Interaction
    ↓
React Component (app/*/page.js)
    ↓
API Client (lib/api.js)
    ↓
Backend API
    ↓
State Update
    ↓
Animated UI Render (Framer Motion)
```

## Design System

### Colors

- Primary: Blue to Purple gradient
- Secondary: Various gradients per feature
- Background: Soft gradient overlays
- Glass: Backdrop blur with transparency

### Animations

- Page transitions: Fade + slide
- Card hover: Scale + lift
- Loading: Spinner + shimmer
- Gradient: Continuous animation

### Components

- Glass cards with backdrop blur
- Gradient buttons with hover effects
- Smooth transitions via Framer Motion
- Responsive grid layouts
- Dark/light mode support

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/legal-chat` | POST | Legal chat conversation |
| `/api/describe-problem` | POST | Problem classification |
| `/api/risk-radar` | POST | Document risk analysis |
| `/api/strategy` | POST | Strategy generation |
| `/api/rights` | POST | Rights exposure analysis |
| `/api/constitution` | POST | Constitution explanation |
| `/health` | GET | Health check |

## Environment Variables

### Backend (.env)

- `OPENAI_API_KEY`: OpenAI API key (required)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

### Frontend (.env.local)

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Tech Stack Details

### Backend

- **Express.js**: Web framework
- **OpenAI**: AI completions
- **CORS**: Cross-origin support
- **dotenv**: Environment management

### Frontend

- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library
- **Axios**: HTTP client
- **Heroicons**: Icon library

## Security Features

- Environment variable protection
- Input validation on all endpoints
- Error handling middleware
- CORS configuration
- No hardcoded secrets
- Disclaimer on all AI responses
