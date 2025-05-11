import { notFound } from 'next/navigation'
import ProjectDetail from './ProjectDetail'

// API URL for the static server
const API_URL = 'http://localhost:3001/api/projects';

// Backup data in case server is not responding
const backupProjects = [
  {
    id: 1,
    title: 'Pizzeria App',
    description: 'A Swift iOS application for a pizza restaurant with a custom server backend. The app allows users to browse menu items, customize pizzas, place orders, and track delivery status.',
    category: 'iOS App',
    technologies: ['Swift', 'UIKit', 'SwiftUI', 'REST APIs', 'Node.js'],
    imageUrl: '/images/projects/pizzeria-app.jpg',
    gifUrl: '/gifs/pizzeria-app.gif',
    githubUrl: 'https://github.com/Dor2495/Pizzeria',
    serverGithubUrl: 'https://github.com/Dor2495/SwiftServer_Pizzeria',
    featured: true
  },
  {
    id: 2,
    title: 'GasWise',
    description: 'An iOS application for tracking garage gas and charging bills with comprehensive statistics. Helps users monitor fuel consumption, costs, and maintain better vehicle expense records.',
    category: 'iOS App',
    technologies: ['Swift', 'Core Data', 'Charts', 'UIKit'],
    imageUrl: '/images/projects/gaswise.jpg',
    gifUrl: '/gifs/gaswisegif.gif',
    githubUrl: 'https://github.com/Dor2495/GasWise',
    featured: true
  },
  {
    id: 3,
    title: 'CountDown Game Timer',
    description: 'A specialized countdown timer designed for gaming scenarios with customizable alerts, themes, and sound effects. Perfect for tracking turn-based games or timed challenges.',
    category: 'iOS App',
    technologies: ['Swift', 'Timer API', 'UIKit', 'Animation'],
    imageUrl: '/images/projects/countdown-timer.jpg',
    gifUrl: '/gifs/countdown-timer.gif',
    githubUrl: 'https://github.com/Dor2495/CountDownGameTimer',
    featured: true
  },
  {
    id: 4,
    title: 'Task Server',
    description: 'A JavaScript server implementation that works with a Swift client application for task management and organization.',
    category: 'Backend',
    technologies: ['JavaScript', 'Node.js', 'Express', 'REST API'],
    imageUrl: '/images/projects/task-server.jpg',
    gifUrl: '/gifs/task-server.gif',
    githubUrl: 'https://github.com/Dor2495/task-server',
    clientGithubUrl: 'https://github.com/Dor2495/task-app-swift',
    featured: false
  },
  {
    id: 5,
    title: 'Cilin Time App',
    description: 'A time management application built with Swift for iOS devices, helping users organize their day and track activities.',
    category: 'iOS App',
    technologies: ['Swift', 'UIKit', 'Core Data'],
    imageUrl: '/images/projects/cilin-time.jpg',
    gifUrl: '/gifs/cilin-time.gif',
    githubUrl: 'https://github.com/Dor2495/CilinTimeApp',
    featured: false
  }
];

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  try {
    // Add timeout to prevent hanging if server is down
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    // Fetch all project IDs for pre-rendering
    const response = await fetch(API_URL, { 
      signal: controller.signal,
      next: { revalidate: 60 }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error('Server responded with an error');
    
    const projects = await response.json();
    
    // Return an array of objects with id params
    return projects.map((project) => ({
      id: project.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params, using backup data:', error);
    // Fallback to hardcoded IDs if fetch fails
    return backupProjects.map(project => ({
      id: project.id.toString(),
    }));
  }
}

// Fetch project data on the server side
async function getProjectData(id) {
  try {
    // Use only one caching strategy - removed redundant options
    const res = await fetch(`${API_URL}/${id}`, { 
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) throw new Error('Failed to fetch project');
    return await res.json();
  } catch (error) {
    console.error('Server fetch error:', error);
    // Use backup data
    const backupProject = backupProjects.find(p => p.id.toString() === id.toString());
    if (!backupProject) return null;
    return backupProject;
  }
}

// Server component
export default async function ProjectPage({ params }) {
  const projectData = await getProjectData(params.id);
  
  if (!projectData) {
    notFound();
  }
  
  return <ProjectDetail project={projectData} />;
} 