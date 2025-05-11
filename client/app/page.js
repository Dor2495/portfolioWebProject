'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import axios from 'axios'
import ProjectCard from '../components/projects/ProjectCard'
import Hero from '../components/sections/Hero'
import Skills from '../components/sections/Skills'

// API URL for the static server
const API_URL = 'http://localhost:3001/api/projects';

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects from API:', API_URL)
        const { data } = await axios.get(API_URL)
        console.log('Projects received:', data)
        setProjects(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setError('Failed to load projects. Please try again later.')
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div>
      <Hero />
      
      {/* Featured Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Featured Projects
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                Here are some of my recent iOS and backend projects
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="col-span-full text-center">Loading projects...</p>
            ) : error ? (
              <p className="col-span-full text-center text-red-500">{error}</p>
            ) : projects.length === 0 ? (
              <p className="col-span-full text-center">No featured projects found.</p>
            ) : (
              projects
                .filter(project => project.featured)
                .map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * project.id }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects" className="btn btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      <Skills />
    </div>
  )
} 