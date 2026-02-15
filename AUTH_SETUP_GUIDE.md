# Authentication & Credit System Setup Guide

## Overview

The platform now includes:
- User authentication (JWT)
- PostgreSQL database with Prisma ORM
- Credit system (20 free credits on signup)
- Credit deduction per AI usage
- Upgrade system

## Prerequisites

1. **PostgreSQL** installed and running
2. **Node.js** 18+ and npm

## Step 1: Install PostgreSQL

### macOS (using Homebrew):
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Create Database:
```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE legal_intelligence;

# Create user (optional)
CREATE USER legalai WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE legal_intelligence TO legalai;

# Exit
\q
```

## Step 2: Configure Environment

Update `backend/.env`:
```env
# Replace with your actual database credentials
DATABASE_URL="postgresql://username:password@localhost:5432/legal_intelligence?schema=public"

# Generate a secure JWT secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

**Generate secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Install Dependencies

```bash
# Backend
cd backend
npm install

# This installs:
# - @prisma/client
# - prisma
# - bcryptjs
# - jsonwebtoken
```

## Step 4: Setup Prisma

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view database
npx prisma studio
```

## Step 5: Restart Backend

```bash
cd backend
npm run dev
```

The backend should now start with database connection!

## Database Schema

### Users Table
```sql
- id (UUID, primary key)
- email (unique)
- password (hashed with bcrypt)
- credits_remaining (integer, default 20)
- plan_type (string, default "free")
- created_at (timestamp)
- updated_at (timestamp)
```

### UsageLogs Table
```sql
- id (UUID, primary key)
- user_id (foreign key to users)
- feature_used (string)
- credits_deducted (integer)
- timestamp (timestamp)
```

## Credit Costs

| Feature | Credits |
|---------|---------|
| Legal Chat | 1 |
| Describe Problem | 1 |
| Risk Radar | 3 |
| Strategy Simulator | 2 |
| Rights Analyzer | 1 |
| Constitution Explainer | 1 |

## API Endpoints

### Authentication

**Register:**
```bash
POST /api/auth/register
Body: { "email": "user@example.com", "password": "password123" }
Response: { "token": "jwt_token", "user": {...} }
```

**Login:**
```bash
POST /api/auth/login
Body: { "email": "user@example.com", "password": "password123" }
Response: { "token": "jwt_token", "user": {...} }
```

**Get Current User:**
```bash
GET /api/auth/me
Headers: { "Authorization": "Bearer jwt_token" }
Response: { "user": {...} }
```

**Upgrade Plan:**
```bash
POST /api/auth/upgrade
Headers: { "Authorization": "Bearer jwt_token" }
Response: { "user": { "credits_remaining": 120, "plan_type": "pro" } }
```

**Usage History:**
```bash
GET /api/auth/usage-history
Headers: { "Authorization": "Bearer jwt_token" }
Response: { "logs": [...] }
```

### Protected AI Routes

All AI routes now require authentication:
```bash
POST /api/legal-chat
Headers: { "Authorization": "Bearer jwt_token" }
Body: { "message": "..." }
Response: { "response": "...", "credits_remaining": 19 }
```

## Frontend Pages

### New Pages Created:
1. `/login` - Login page
2. `/register` - Registration page
3. `/upgrade` - Upgrade plan page

### Updated Components:
1. `Navbar` - Shows credits and auth buttons
2. `AuthContext` - Global auth state
3. All feature pages - Now require authentication

## Testing the System

### 1. Register a New User
```bash
# Visit http://localhost:3000/register
# Enter email and password
# You'll get 20 free credits
```

### 2. Use a Feature
```bash
# Go to Legal Chat
# Send a message
# Credits will be deducted (1 credit)
# Remaining credits shown in navbar
```

### 3. Exhaust Credits
```bash
# Use features until credits reach 0
# You'll see "Credits exhausted" error
# Upgrade button will appear
```

### 4. Upgrade Plan
```bash
# Click "Upgrade" in navbar
# Click "Upgrade Now" button
# Get 100 additional credits
# Plan changes to "pro"
```

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
brew services list

# Test connection
psql -d legal_intelligence -U your_username

# Check DATABASE_URL in .env
```

### Prisma Errors
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database
npx prisma studio
```

### JWT Errors
```bash
# Ensure JWT_SECRET is set in .env
# Check token is being sent in Authorization header
# Token format: "Bearer your_jwt_token"
```

### Credit Deduction Not Working
```bash
# Check backend logs
# Verify user is authenticated
# Check middleware is applied to routes
```

## Security Notes

1. **Password Hashing**: Uses bcrypt with 10 salt rounds
2. **JWT Tokens**: Expire after 7 days (configurable)
3. **Protected Routes**: All AI routes require valid JWT
4. **SQL Injection**: Prisma prevents SQL injection
5. **CORS**: Configured for frontend domain

## Production Deployment

### Environment Variables:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"
JWT_SECRET="generate-a-secure-random-string"
JWT_EXPIRES_IN="7d"
NODE_ENV="production"
```

### Database:
- Use managed PostgreSQL (AWS RDS, Heroku Postgres, etc.)
- Enable SSL connection
- Regular backups
- Connection pooling

### Security:
- Use HTTPS only
- Rotate JWT secrets regularly
- Implement rate limiting
- Add refresh tokens
- Enable 2FA (optional)

## Next Steps

1. ✅ Register an account
2. ✅ Test all features
3. ✅ Monitor credit usage
4. ✅ Test upgrade flow
5. ✅ Check usage history

## Support

If you encounter issues:
1. Check backend logs
2. Verify PostgreSQL is running
3. Check .env configuration
4. Run `npx prisma studio` to inspect database
5. Check browser console for frontend errors

The authentication and credit system is now fully functional!
