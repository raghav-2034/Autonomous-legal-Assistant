# Deployment Guide

## Overview

This guide covers deploying the AI Legal Intelligence Platform to production.

**Recommended Stack:**
- Frontend: Vercel (Next.js optimized)
- Backend: Railway, Render, or Heroku
- Database: Not required (stateless API)

---

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ai-legal-intelligence.git
git push -u origin main
```

2. **Connect to Vercel**
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Select the `frontend` directory as root

3. **Configure Build Settings**
```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

4. **Environment Variables**
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

5. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Your site will be live at `https://your-project.vercel.app`

### Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

## Backend Deployment (Railway)

### Prerequisites
- GitHub account
- Railway account (free tier available)

### Steps

1. **Prepare Backend**

Create `backend/Procfile`:
```
web: node server.js
```

Update `backend/package.json`:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

2. **Deploy to Railway**
- Go to https://railway.app
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository
- Select the `backend` directory

3. **Environment Variables**
Add in Railway dashboard:
```
OPENAI_API_KEY=your_openai_api_key
PORT=5000
NODE_ENV=production
```

4. **Configure Start Command**
```
npm start
```

5. **Get Public URL**
- Railway will provide a public URL
- Copy this URL for frontend configuration

6. **Update Frontend**
Update `NEXT_PUBLIC_API_URL` in Vercel to point to Railway URL

---

## Backend Deployment (Render)

### Steps

1. **Create render.yaml**
```yaml
services:
  - type: web
    name: legal-intelligence-api
    env: node
    region: oregon
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: OPENAI_API_KEY
        sync: false
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

2. **Deploy**
- Go to https://render.com
- Click "New +"
- Select "Web Service"
- Connect GitHub repository
- Render will auto-detect render.yaml

3. **Add Environment Variables**
- Add `OPENAI_API_KEY` in dashboard
- Get public URL from Render

---

## Backend Deployment (Heroku)

### Steps

1. **Install Heroku CLI**
```bash
brew install heroku/brew/heroku  # macOS
```

2. **Login and Create App**
```bash
heroku login
heroku create your-app-name
```

3. **Configure Buildpack**
```bash
heroku buildpacks:set heroku/nodejs
```

4. **Set Environment Variables**
```bash
heroku config:set OPENAI_API_KEY=your_key
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git subtree push --prefix backend heroku main
```

---

## Environment Variables Summary

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```env
OPENAI_API_KEY=sk-your-actual-key
PORT=5000
NODE_ENV=production
```

---

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] Backend health check works (`/health`)
- [ ] All 6 features functional
- [ ] API calls succeed
- [ ] Dark/light mode works
- [ ] Mobile responsive
- [ ] Error handling works
- [ ] Disclaimers display
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled

---

## Monitoring & Maintenance

### Vercel
- Check deployment logs in dashboard
- Monitor function execution times
- Set up error alerts

### Railway/Render
- Monitor API response times
- Check error logs
- Set up uptime monitoring
- Monitor OpenAI API usage

### OpenAI
- Monitor API usage at https://platform.openai.com/usage
- Set spending limits
- Track token consumption

---

## Scaling Considerations

### Frontend
- Vercel auto-scales
- Use Edge Functions for better performance
- Enable ISR for static pages

### Backend
- Upgrade to paid tier for more resources
- Add Redis for caching
- Implement rate limiting
- Add request queuing for high traffic

### Cost Optimization
- Cache OpenAI responses
- Implement request throttling
- Use cheaper OpenAI models for simple queries
- Set up usage alerts

---

## Security Best Practices

1. **API Keys**
   - Never commit `.env` files
   - Rotate keys regularly
   - Use different keys for dev/prod

2. **CORS**
   - Restrict to your frontend domain
   - Don't use `*` in production

3. **Rate Limiting**
   - Implement on backend
   - Prevent abuse
   - Protect OpenAI quota

4. **Input Validation**
   - Already implemented
   - Monitor for injection attempts

5. **HTTPS**
   - Enabled by default on Vercel/Railway/Render
   - Enforce HTTPS redirects

---

## Troubleshooting

### "Cannot connect to backend"
- Check CORS configuration
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running

### "OpenAI API Error"
- Verify API key is set
- Check OpenAI account status
- Monitor rate limits

### "Build Failed"
- Check Node.js version compatibility
- Verify all dependencies installed
- Review build logs

### "502 Bad Gateway"
- Backend may be starting up (wait 30s)
- Check backend logs
- Verify environment variables

---

## Rollback Procedure

### Vercel
- Go to Deployments
- Click on previous deployment
- Click "Promote to Production"

### Railway/Render
- Go to Deployments
- Select previous deployment
- Click "Redeploy"

---

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Next.js Docs: https://nextjs.org/docs
- OpenAI API Docs: https://platform.openai.com/docs

---

## Cost Estimates (Monthly)

### Free Tier
- Vercel: Free (hobby projects)
- Railway: $5 credit/month
- Render: Free tier available
- OpenAI: Pay per use (~$10-50 depending on usage)

### Paid Tier (Recommended for Production)
- Vercel Pro: $20/month
- Railway: ~$10-20/month
- Render: ~$7-25/month
- OpenAI: ~$50-200/month (varies with traffic)

**Total Estimated Cost:** $87-265/month for production use

---

## Next Steps After Deployment

1. Set up custom domain
2. Configure analytics (Vercel Analytics, Google Analytics)
3. Add error tracking (Sentry)
4. Implement user authentication (if needed)
5. Add usage analytics
6. Set up automated backups
7. Create staging environment
8. Set up CI/CD pipeline
