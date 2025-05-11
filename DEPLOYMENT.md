# Deployment Guide for Portfolio Website

This guide explains how to deploy your portfolio website to make it accessible on the internet.

## Overview

Your portfolio website has two main components that need to be deployed:

1. **Frontend (Next.js)** - The client-side application
2. **Backend (Express.js)** - The server that provides the API and serves images

## Deploying the Backend (Server)

### Option 1: Deploy to Render

[Render](https://render.com/) provides a free tier for web services that's perfect for your portfolio backend.

1. Create an account on Render
2. Click "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: portfolio-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Advanced**: Add environment variables (EMAIL_USER, EMAIL_PASS)

After deployment, note your service URL (e.g., https://portfolio-backend.onrender.com).

### Option 2: Deploy to Railway

[Railway](https://railway.app/) is another good option with a generous free tier:

1. Create an account on Railway
2. Create a new project and select "Deploy from GitHub"
3. Select your repository
4. Configure the service with environment variables
5. Deploy the service

### Option 3: Digital Ocean App Platform

For a more robust solution (paid):

1. Create a Digital Ocean account
2. Go to App Platform
3. Create a new app from your GitHub repo
4. Configure as a Web Service
5. Add environment variables
6. Deploy

## Deploying the Frontend (Client)

### Option 1: Deploy to Vercel (Recommended)

[Vercel](https://vercel.com/) is the company behind Next.js and offers the best integration:

1. Create an account on Vercel
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: client
   - **Environment Variables**: Add `API_URL` pointing to your backend URL

### Option 2: Deploy to Netlify

1. Create a Netlify account
2. Import your GitHub repository
3. Configure the build settings:
   - **Base directory**: client
   - **Build command**: `npm run build`
   - **Publish directory**: client/out
   - **Environment variables**: Add `API_URL` pointing to your backend

## Custom Domain Setup

To use your own domain name (like yourname.com):

1. Purchase a domain from a registrar like Namecheap, GoDaddy, or Google Domains
2. In your hosting provider (Vercel, Netlify, etc.):
   - Go to the domains section
   - Add your custom domain
   - Follow the DNS configuration instructions provided

## CORS Configuration

Once deployed, you'll need to update the CORS settings in your server to allow requests from your new domain:

```javascript
// In server/index.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.com',
    'https://www.your-frontend-domain.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

## Environment Variables

Create a `.env` file on your server deployment with:

```
PORT=8080  # Or whatever port your host requires
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=production
```

## Final Steps

1. Test your deployed application thoroughly
2. Make sure all links and images work correctly
3. Verify the contact form sends emails properly
4. Share your portfolio URL with potential employers!

## Troubleshooting

- **404 errors**: Check that all routes and paths are correctly configured
- **Missing images**: Verify that image paths are correctly updated for production
- **CORS errors**: Update CORS settings in your backend to allow your frontend domain
- **Email not working**: Verify your email credentials are correctly set up on the server 