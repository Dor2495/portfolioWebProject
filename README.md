# Modern Portfolio Website

A beautiful, responsive portfolio website built with Next.js and Express.js to showcase iOS and backend projects.

## Features

- Modern UI with Tailwind CSS
- Responsive design for all devices
- Server-side API for project data
- Animated transitions with Framer Motion
- Dark/light mode support
- SEO optimized

## Project Structure

```
/
├── client/                 # Next.js frontend
│   ├── app/                # Next.js 14 app router
│   ├── components/         # React components
│   ├── public/             # Static assets
│   └── ...                 # Config files
│
├── server/                 # Express backend
│   ├── controllers/        # API controllers
│   ├── routes/             # API routes
│   └── index.js            # Server entry point
│
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies
```bash
npm run setup
```

3. Start the development server
```bash
npm run dev
```

This will start both the Next.js frontend (http://localhost:3000) and Express backend (http://localhost:5000) concurrently.

## Deployment

### Frontend

The Next.js frontend can be deployed to Vercel, Netlify, or any other static hosting service:

```bash
cd client
npm run build
```

### Backend

The Express backend can be deployed to Heroku, Railway, or any other Node.js hosting service.

## Customization

- Update the project data in `server/controllers/projectController.js`
- Modify the theme colors in `client/tailwind.config.js`
- Add your own images to `client/public/images/`

## License

MIT 