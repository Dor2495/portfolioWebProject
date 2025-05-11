# Portfolio Server

This server provides API endpoints for the portfolio website with a fully static data approach.

## Static Data Approach

This server deliberately uses a **no-database** approach:

- All project data is stored directly in JavaScript files as arrays and objects
- No database connection is required to run the application
- Data is loaded in memory when the server starts
- To modify projects, simply edit the data in `controllers/projectController.js`

## API Endpoints

- `GET /api/projects` - Returns all projects
- `GET /api/projects/:id` - Returns a specific project by ID
- `GET /images/projects/:filename` - Serves project images from the static files directory

## Static Assets

Project images are stored in the server's file system:

```
server/public/images/projects/
```

To add or update project images:
1. Place image files in the above directory
2. Name them according to the `imageUrl` property in the project data
3. Images will be served from `/images/projects/[filename]`

## Adding New Projects

To add a new project:

1. Edit `controllers/projectController.js`
2. Add a new object to the `projects` array
3. Include all required properties (id, title, description, etc.)
4. Add corresponding image to the public images directory

## Benefits of This Approach

- Simplicity: No database setup required
- Performance: Fast responses without database queries
- Reliability: No connection issues or database downtime
- Portability: Easy to deploy anywhere with Node.js support
- Maintainability: All data in one place for easy editing 