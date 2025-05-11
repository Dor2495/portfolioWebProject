'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt, FaServer, FaArrowLeft, FaExpand } from 'react-icons/fa'
import FullscreenMedia from '../../../components/common/FullscreenMedia'
import MediaGallery from '../../../components/projects/MediaGallery'
import { navigate, goBack } from '../../../utils/navigation'

const API_BASE = 'http://localhost:3001';

export default function ProjectDetail({ project }) {
  const [mainMedia, setMainMedia] = useState(
    project.gifUrl 
      ? project.gifUrl.startsWith('http') ? project.gifUrl : `${API_BASE}${project.gifUrl}`
      : project.imageUrl.startsWith('http') ? project.imageUrl : `${API_BASE}${project.imageUrl}`
  );
  const [mediaType, setMediaType] = useState(project.gifUrl ? 'gif' : 'image');
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  
  // Toggle between GIF and static image
  const toggleMediaType = () => {
    if (project) {
      // Check if we're using backup data (no API_BASE in the URL)
      const isExternalUrl = mainMedia.startsWith('http') && !mainMedia.includes(API_BASE);
      
      if (mediaType === 'gif' && project.imageUrl) {
        if (isExternalUrl || project.imageUrl.startsWith('http')) {
          setMainMedia(project.imageUrl);
        } else {
          setMainMedia(`${API_BASE}${project.imageUrl}`);
        }
        setMediaType('image');
      } else if (mediaType === 'image' && project.gifUrl) {
        if (isExternalUrl || project.gifUrl.startsWith('http')) {
          setMainMedia(project.gifUrl);
        } else {
          setMainMedia(`${API_BASE}${project.gifUrl}`);
        }
        setMediaType('gif');
      }
    }
  };
  
  // Open fullscreen media viewer
  const openFullscreen = () => {
    setIsFullscreenOpen(true);
  };
  
  // Close fullscreen media viewer
  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };
  
  // Handle back button click
  const handleBackClick = () => {
    // Try first with the navigation API
    if (window.history.length > 1) {
      goBack();
    } else {
      // Fallback to direct navigation
      navigate('/projects', false, true);
    }
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container max-w-5xl">
        <button 
          onClick={handleBackClick}
          className="inline-flex items-center mb-8 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 bg-transparent border-0 cursor-pointer"
        >
          <FaArrowLeft className="mr-2" /> Back to all projects
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Project Media */}
            <div className="space-y-6">
              <div 
                className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg aspect-video cursor-pointer group"
                onClick={openFullscreen}
              >
                {mainMedia && (
                  <Image
                    src={mainMedia}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={true}
                    priority={true}
                  />
                )}
                
                <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  {project.category}
                </span>
                
                {/* Fullscreen icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                  <FaExpand className="text-white text-2xl" />
                </div>
              </div>
              
              {/* Media Toggle Button */}
              <div className="flex gap-2">
                {project.gifUrl && project.imageUrl && (
                  <button 
                    onClick={toggleMediaType}
                    className="flex-1 px-4 py-2 mt-4 text-sm font-medium text-white transition bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    {mediaType === 'gif' ? 'View Static Image' : 'View Animation'}
                  </button>
                )}
                
                <button 
                  onClick={openFullscreen}
                  className="px-4 py-2 mt-4 text-sm font-medium text-white transition bg-gray-700 rounded-md hover:bg-gray-800"
                >
                  <FaExpand className="mr-1 inline-block" /> Fullscreen
                </button>
              </div>
            </div>

            {/* Project Info */}
            <div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h1>
              
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
              
              <div className="mb-6">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium transition bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  >
                    <FaGithub className="mr-2" /> GitHub Repo
                  </a>
                )}
                
                {project.serverGithubUrl && (
                  <a 
                    href={project.serverGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium transition bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  >
                    <FaServer className="mr-2" /> Server Repo
                  </a>
                )}
                
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Project Details */}
          <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Project Details
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              {project.extendedDescription ? (
                // Split paragraphs and render them with proper spacing
                project.extendedDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                // Fallback to the regular description if no extended description exists
                <p>{project.description}</p>
              )}
            </div>
          </div>
          
          {/* Media Gallery - All project images and GIFs */}
          <MediaGallery 
            projectName={project.title}
            projectId={project.id}
            baseImageUrl={project.imageUrl}
            baseGifUrl={project.gifUrl}
          />
        </motion.div>
      </div>
      
      {/* Fullscreen Media Viewer for main media */}
      <FullscreenMedia
        isOpen={isFullscreenOpen}
        onClose={closeFullscreen}
        src={mainMedia}
        alt={project.title}
        type={mediaType}
      />
    </div>
  );
} 