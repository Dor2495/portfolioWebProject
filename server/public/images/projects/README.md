# Project Images Directory

This directory contains all the static images for portfolio projects.

## Adding Project Images

1. Place your project screenshot images in this directory
2. Use the exact filenames specified in the project data:
   - `pizzeria-app.jpg` - For the Pizzeria app
   - `gaswise.jpg` - For the GasWise app
   - `countdown-timer.jpg` - For the CountDown Game Timer app
   - `task-server.jpg` - For the Task Server
   - `cilin-time.jpg` - For the Cilin Time App

## Image Guidelines

- Recommended image size: 1280×720px (16:9 aspect ratio)
- Format: JPG or PNG
- Keep file sizes reasonable (optimize for web)
- Images should clearly showcase the project's UI or functionality

## How Images Are Served

- Images are served directly from the file system
- No database or blob storage is used
- The Express server uses static file serving
- URL pattern: `http://localhost:3001/images/projects/[filename]`

## Troubleshooting

If images aren't appearing:
1. Confirm the image filename matches exactly what's in the project data
2. Check that the file exists in this directory
3. Make sure the server is running
4. Restart the server if you've just added new images

No database operations are needed to serve these images! 