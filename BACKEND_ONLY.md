# Backend-Only Deployment Guide

Your portfolio server is now running as a standalone API at: https://portfoliodordavid.onrender.com/

## Current Status

The server is running in **API-only mode**, which means it provides data through its API endpoints but doesn't serve the frontend application. This is ideal for:

1. Using as a backend for your frontend deployed elsewhere
2. Testing API functionality
3. Sharing your project data with other applications

## API Endpoints

Your API provides the following endpoints:

- **Root**: `https://portfoliodordavid.onrender.com/`
  - Returns basic API information

- **Projects**: `https://portfoliodordavid.onrender.com/api/projects`
  - Returns all projects

- **Single Project**: `https://portfoliodordavid.onrender.com/api/projects/:id`
  - Returns details for a specific project by ID

- **Project Media**: `https://portfoliodordavid.onrender.com/api/projects/:id/media`
  - Returns media files associated with a specific project

- **Contact**: `https://portfoliodordavid.onrender.com/api/contact`
  - POST endpoint for sending contact messages
  - Requires body: `{ "name": "...", "email": "...", "message": "..." }`

- **Test**: `https://portfoliodordavid.onrender.com/api/test`
  - Simple test endpoint to verify the API is working

## Next Steps

### Option 1: Deploy Frontend Separately

You can deploy your frontend (Next.js client) separately on Vercel or Netlify, and have it connect to this API.

1. **Deploy to Vercel**:
   - Create an account on [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Set the "Root Directory" to `client`
   - Add environment variable: `API_URL=https://portfoliodordavid.onrender.com`

2. **Deploy to Netlify**:
   - Create an account on [Netlify](https://netlify.com/)
   - Import your GitHub repository
   - Set build settings:
     - Base directory: `client`
     - Build command: `npm run build`
     - Publish directory: `out`
   - Add environment variable: `API_URL=https://portfoliodordavid.onrender.com`

### Option 2: Complete Deployment on Render

If you want to deploy both frontend and backend together on Render:

1. Build the client locally:
   ```bash
   cd client
   npm run build
   ```

2. Copy the built files to the server's static directory:
   ```bash
   cp -r client/out server/public/client
   ```

3. Update server code to serve these files.

### Option 3: Use as Data Source for Another Frontend

You can use this API as a data source for any frontend application, not just the provided Next.js client. This gives you flexibility to create different experiences using your project data.

## Monitoring & Maintenance

- **Logs**: Check the logs in your Render dashboard for any issues
- **Environment Variables**: Set up email credentials in Render dashboard if you want the contact form to send real emails
- **Scale**: Upgrade your Render plan if needed for more traffic 