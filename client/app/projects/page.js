'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../../components/projects/ProjectCard'

// API URL for the static server
const API_URL = 'http://localhost:3001/api/projects';

// Backup data in case the server is not responding
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
    category: 'iOS App, Backend',
    technologies: ['Swift', 'Timer API', 'UIKit', 'Animation'],
    imageUrl: '/images/projects/countdown-timer.jpg',
    gifUrl: '/gifs/countdown-timer.gif',
    githubUrl: 'https://github.com/Dor2495/CountDownGameTimer',
    featured: true
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects from static API:', API_URL)
        
        // Try to fetch from server with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch(API_URL, { 
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Static projects received:', data);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        console.log('Using backup project data');
        
        // Use backup data if server is not responding
        setProjects(backupProjects);
        setLoading(false);
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    return project.category.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            My Projects
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Explore my iOS apps and backend projects
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('iOS App')}
            className={`px-4 py-2 rounded-full transition ${
              filter === 'iOS App'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            iOS Apps
          </button>
          <button
            onClick={() => setFilter('Backend')}
            className={`px-4 py-2 rounded-full transition ${
              filter === 'Backend'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Backend
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="col-span-full text-center">Loading projects...</p>
          ) : error ? (
            <p className="col-span-full text-center text-red-500">{error}</p>
          ) : filteredProjects.length === 0 ? (
            <p className="col-span-full text-center">No projects found with the selected filter.</p>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 