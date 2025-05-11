/**
 * Portfolio Server - Static Data Approach
 * 
 * This server uses a fully static data approach with no database connections.
 * All project data is stored in JavaScript files and images are served as static files.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002', 'http://127.0.0.1:3000', 'http://127.0.0.1:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Add special headers for image files to prevent caching issues
app.use('/images', (req, res, next) => {
  // Add CORS headers specifically for images
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

// Static file serving for project images
// This replaces database binary storage by using the filesystem
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Specific route for GIF files with appropriate headers
app.use('/gifs', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.header('Content-Type', 'image/gif');
  next();
});

// Serve GIFs from the gifs directory
app.use('/gifs', express.static(path.join(__dirname, 'public/images/gifs')));

// Specific route for serving resume PDF
app.get('/api/resume', (req, res) => {
  const resumePath = path.join(__dirname, 'public/files/resume/Dor_Mizrachi_Resume_PET_English.pdf');
  res.sendFile(resumePath);
});

// Debug endpoint to check if images exist
app.get('/check-image/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // First check in the projects directory
  let imagePath = path.join(__dirname, 'public/images/projects', filename);
  
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If not found in projects directory, check in the main images directory
      imagePath = path.join(__dirname, 'public/images', filename);
      
      fs.access(imagePath, fs.constants.F_OK, (errMain) => {
        if (errMain) {
          return res.status(404).json({ 
            exists: false, 
            message: `Image ${filename} not found in any image directory`,
            checkedPaths: [
              path.join('public/images/projects', filename),
              path.join('public/images', filename)
            ]
          });
        }
        
        // Get file info for the image in main directory
        fs.stat(imagePath, (statErr, stats) => {
          if (statErr) {
            return res.status(500).json({ error: 'Error checking image stats' });
          }
          
          res.json({
            exists: true,
            filename,
            path: imagePath,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
            url: `/images/${filename}`
          });
        });
      });
      return;
    }
    
    // Get file info for the image in projects directory
    fs.stat(imagePath, (err, stats) => {
      if (err) {
        return res.status(500).json({ error: 'Error checking image stats' });
      }
      
      res.json({
        exists: true,
        filename,
        path: imagePath,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        url: `/images/projects/${filename}`
      });
    });
  });
});

// Debug endpoint to check if GIFs exist
app.get('/check-gif/:filename', (req, res) => {
  const filename = req.params.filename;
  const gifPath = path.join(__dirname, 'public/images/gifs', filename);
  
  fs.access(gifPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ 
        exists: false, 
        message: `GIF ${filename} not found`,
        path: gifPath
      });
    }
    
    // Get file info
    fs.stat(gifPath, (err, stats) => {
      if (err) {
        return res.status(500).json({ error: 'Error checking GIF stats' });
      }
      
      res.json({
        exists: true,
        filename,
        path: gifPath,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        url: `/gifs/${filename}`
      });
    });
  });
});

// API endpoint to get all images and GIFs for a project
app.get('/api/projects/:id/media', (req, res) => {
  const projectId = parseInt(req.params.id);
  const projectController = require('./controllers/projectController');
  
  // Get the project data first
  const project = projectController.getProjectByIdSync(projectId);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  // Extract base name from project title
  const baseName = project.title.toLowerCase().replace(/\s+/g, '-');
  const mediaItems = [];
  
  // Add main image and GIF if they exist
  if (project.imageUrl) {
    const filename = project.imageUrl.split('/').pop();
    const imagePath = path.join(__dirname, 'public/images/projects', filename);
    
    if (fs.existsSync(imagePath)) {
      mediaItems.push({
        type: 'image',
        url: project.imageUrl,
        title: `${project.title} Main Image`
      });
    }
  }
  
  if (project.gifUrl) {
    const filename = project.gifUrl.split('/').pop();
    const gifPath = path.join(__dirname, 'public/images/gifs', filename);
    
    if (fs.existsSync(gifPath)) {
      mediaItems.push({
        type: 'gif',
        url: project.gifUrl,
        title: `${project.title} Animation`
      });
    }
  }
  
  // Look for additional numbered images (2-5)
  for (let i = 2; i <= 5; i++) {
    // Check for JPG
    const jpgPath = path.join(__dirname, 'public/images/projects', `${baseName}${i}.jpg`);
    if (fs.existsSync(jpgPath)) {
      mediaItems.push({
        type: 'image',
        url: `/images/projects/${baseName}${i}.jpg`,
        title: `${project.title} Image ${i}`
      });
    }
    
    // Check for PNG
    const pngPath = path.join(__dirname, 'public/images/projects', `${baseName}${i}.png`);
    if (fs.existsSync(pngPath)) {
      mediaItems.push({
        type: 'image',
        url: `/images/projects/${baseName}${i}.png`,
        title: `${project.title} Image ${i}`
      });
    }
    
    // Check for GIF
    const gifPath = path.join(__dirname, 'public/images/gifs', `${baseName}${i}.gif`);
    if (fs.existsSync(gifPath)) {
      mediaItems.push({
        type: 'gif',
        url: `/gifs/${baseName}${i}.gif`,
        title: `${project.title} Animation ${i}`
      });
    }
  }
  
  res.json(mediaItems);
});

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    approach: 'Static data - no database connection'
  });
});

// API Routes - uses static data from controllers
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Serve static files from the Next.js client in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/out')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/out/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`
===============================================
  Portfolio Server (Static Data Approach)
  Server running on port ${PORT}
  API endpoint: http://localhost:${PORT}/api/projects
  Static images: http://localhost:${PORT}/images/projects/
===============================================
  `);
}); 