# Project GIFs

This directory is for storing GIF demonstrations of projects that will be displayed on the portfolio website.

## How to Add GIFs

1. Create GIF files for each project with the following naming convention:
   - `pizzeria-app.gif`
   - `gaswise.gif`
   - `countdown-timer.gif`
   - `task-server.gif`
   - `cilin-time.gif`

2. Place the GIF files directly in this directory.

3. Ensure each GIF file:
   - Is optimized for web display (typically under 2-3MB)
   - Has dimensions similar to your project screenshots
   - Clearly demonstrates the key features of your application

## Tools for Creating GIFs

Here are some recommended tools for creating GIFs from your app:

- **For iOS Apps**: Use QuickTime Player to record your simulator or device, then convert to GIF using a tool like GIPHY Capture or ezgif.com
- **For Web Projects**: Use screen recording software like OBS or Loom, then convert to GIF
- **For Backend Projects**: Consider showing API interactions or console outputs in a GIF

## Troubleshooting

If your GIFs aren't showing up on the website:

1. Check that the file is correctly named and matches the project's `gifUrl` property
2. Verify that the file is in this directory (/server/public/images/gifs/)
3. Restart the server if needed
4. Check the browser console for any errors 