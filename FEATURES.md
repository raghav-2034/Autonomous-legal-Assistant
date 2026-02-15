# Features Documentation

## 1. Legal Chat 💬

**Route:** `/legal-chat`

**Description:** Interactive AI-powered chat interface for legal questions and consultations.

**Features:**
- Real-time conversation with AI legal assistant
- Message history display
- Smooth fade-in animations for responses
- User/AI message differentiation
- Automatic disclaimer on AI responses

**UI Elements:**
- Glassmorphism chat container
- Gradient message bubbles
- Textarea input with send button
- Loading spinner during processing
- Responsive design

**API Endpoint:** `POST /api/legal-chat`

**Request:**
```json
{
  "message": "What is the statute of limitations for breach of contract?"
}
```

**Response:**
```json
{
  "response": "The statute of limitations for breach of contract...",
  "disclaimer": "This information is for educational purposes only..."
}
```

---

## 2. Describe Your Legal Problem 📋

**Route:** `/describe-problem`

**Description:** Analyzes and categorizes legal problems with actionable guidance.

**Features:**
- Problem classification
- Relevant legal sections identification
- Step-by-step next actions
- Animated result cards
- Staggered fade-in effects

**UI Elements:**
- Large textarea for problem description
- Three result cards (Category, Sections, Steps)
- Numbered action items
- Bullet-pointed legal sections
- Hover scale animations

**API Endpoint:** `POST /api/describe-problem`

**Request:**
```json
{
  "problem": "My landlord refuses to return my security deposit..."
}
```

**Response:**
```json
{
  "category": "Landlord-Tenant Law",
  "sections": ["State Landlord-Tenant Act", "Security Deposit Regulations"],
  "nextSteps": ["Document all communications", "Send formal demand letter", "File small claims"],
  "disclaimer": "..."
}
```

---

## 3. Legal Risk Radar 🎯

**Route:** `/risk-radar`

**Description:** Advanced document intelligence with risk scoring and fairness analysis.

**Features:**
- Document summary generation
- Risk severity assessment (Low/Medium/High)
- Fairness score (0-100)
- Flagged problematic clauses
- Improvement suggestions
- Recommended actions

**UI Elements:**
- Large document input area
- Color-coded severity badges
- Animated progress bar for fairness score
- Flagged clauses with warning icons
- Improvement suggestions with checkmarks
- Numbered action recommendations

**API Endpoint:** `POST /api/risk-radar`

**Request:**
```json
{
  "document": "EMPLOYMENT AGREEMENT\n\nThis agreement states that..."
}
```

**Response:**
```json
{
  "summary": "Employment agreement with standard terms...",
  "riskSeverity": "Medium",
  "fairnessScore": 65,
  "flaggedClauses": ["Non-compete clause too broad", "Unlimited liability"],
  "improvements": ["Limit non-compete to 1 year", "Cap liability at salary"],
  "actions": ["Negotiate non-compete terms", "Request liability cap"],
  "disclaimer": "..."
}
```

---

## 4. Legal Strategy Simulator 🎲

**Route:** `/strategy-simulator`

**Description:** Generates multiple strategic approaches for legal situations.

**Features:**
- Three strategy types: Conservative, Balanced, Aggressive
- Pros and cons for each strategy
- Timeline estimates
- Side-by-side comparison
- Animated strategy cards

**UI Elements:**
- Three-column grid layout
- Gradient-themed cards per strategy
- Icon representation (🛡️ ⚖️ ⚡)
- Pros with checkmarks
- Cons with X marks
- Timeline information

**API Endpoint:** `POST /api/strategy`

**Request:**
```json
{
  "situation": "Contract dispute with vendor over payment terms..."
}
```

**Response:**
```json
{
  "conservative": {
    "description": "Seek mediation and negotiate settlement",
    "pros": ["Lower cost", "Faster resolution"],
    "cons": ["May not get full desired outcome"],
    "timeline": "2-4 months"
  },
  "balanced": { ... },
  "aggressive": { ... },
  "disclaimer": "..."
}
```

---

## 5. Rights Exposure Analyzer ⚖️

**Route:** `/rights-analyzer`

**Description:** Analyzes scenarios for constitutional rights implications.

**Features:**
- Affected rights identification
- Relevant constitutional articles
- Severity level assessment
- Detailed explanation
- Color-coded severity badges

**UI Elements:**
- Severity badge (Low/Medium/High/Critical)
- Rights cards with scale icons
- Article badges with gradients
- Detailed explanation section
- Responsive card layout

**API Endpoint:** `POST /api/rights`

**Request:**
```json
{
  "scenario": "Police searched my home without a warrant..."
}
```

**Response:**
```json
{
  "affectedRights": ["Right to Privacy", "Protection from Unreasonable Search"],
  "articles": ["Article 21", "Fourth Amendment"],
  "severityLevel": "High",
  "explanation": "The scenario involves potential violation of...",
  "disclaimer": "..."
}
```

---

## 6. Constitution Explainer 📖

**Route:** `/constitution`

**Description:** Explains constitutional provisions in simple, accessible language.

**Features:**
- Simple explanations
- Key points extraction
- Real-world examples
- Related provisions
- Educational focus

**UI Elements:**
- Single input field for article/part
- Simple explanation card
- Numbered key points
- Example cards with backgrounds
- Related provision badges

**API Endpoint:** `POST /api/constitution`

**Request:**
```json
{
  "query": "Article 14"
}
```

**Response:**
```json
{
  "explanation": "Article 14 guarantees equality before law...",
  "keyPoints": ["Equal protection", "No discrimination", "Reasonable classification"],
  "examples": ["Reservation policies", "Gender equality cases"],
  "relatedProvisions": ["Article 15", "Article 16"],
  "disclaimer": "..."
}
```

---

## Common UI Features

### Glassmorphism Design
- Backdrop blur effects
- Transparent backgrounds
- Soft borders
- Layered depth

### Animations
- Framer Motion powered
- Fade-in on mount
- Staggered children
- Hover scale effects
- Smooth transitions

### Dark/Light Mode
- System preference detection
- Manual toggle in navbar
- Persistent localStorage
- Smooth theme transitions

### Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Adaptive typography

### Loading States
- Spinner animations
- Shimmer effects
- Disabled states
- Progress indicators

### Error Handling
- User-friendly messages
- Retry mechanisms
- Validation feedback
- Fallback content

---

## Disclaimer

All features include the following disclaimer:

> "This information is for educational purposes only and does not constitute legal advice."

This appears at the bottom of every AI-generated response to ensure users understand the limitations of the platform.
