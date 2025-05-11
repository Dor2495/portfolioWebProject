# Additional Project Images and GIFs

This directory contains sample additional images and GIFs for the project galleries. For the gallery to display multiple images and GIFs for a project, use the following naming conventions:

## Naming Conventions

1. Use the project name transformed to lowercase with spaces replaced by hyphens, followed by a number.
2. For example, for the "GasWise" project:
   - `gaswise2.jpg` - Additional image #2
   - `gaswise3.jpg` - Additional image #3
   - `gaswise2.gif` - Additional animation #2

## Supported Image Types

- JPG files (.jpg)
- PNG files (.png)
- GIF files (.gif)

## How to Add Your Images

1. Place image files in the `server/public/images/projects` directory
2. Place GIF files in the `server/public/images/gifs` directory
3. The gallery will automatically discover and display them

## Example Structure

```
server/public/images/projects/
  ├── gaswise.jpg          # Main image
  ├── gaswise2.jpg         # Additional image #2
  ├── gaswise3.jpg         # Additional image #3
  ├── countdown-timer.jpg  # Main image
  └── countdown-timer2.jpg # Additional image #2

server/public/images/gifs/
  ├── gaswise.gif          # Main animation
  ├── gaswise2.gif         # Additional animation #2
  ├── countdown-timer.gif  # Main animation
  └── countdown-timer2.gif # Additional animation #2
```

The project detail pages will automatically detect these files and display them in the gallery section. 