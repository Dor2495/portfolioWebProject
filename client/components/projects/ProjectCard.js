import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaServer, FaExpand } from 'react-icons/fa'
import FullscreenMedia from '../common/FullscreenMedia'
import { navigate } from '../../utils/navigation'

export default function ProjectCard({ project }) {
  // Default placeholder image if project image is not available
  const placeholderImage = '/images/placeholder-project.jpg';
  const apiBase = 'http://localhost:3001'; // Server base URL
  
  // Initial state with fallback
  const [imgSrc, setImgSrc] = useState(project.gifUrl || project.imageUrl || placeholderImage);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [serverAvailable, setServerAvailable] = useState(true);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  
  // Check if server is available and set up image sources
  useEffect(() => {
    // First check if server is available using a timeout to avoid blocking
    fetch(`${apiBase}/api/test`, { 
      signal: AbortSignal.timeout(2000) // 2 second timeout
    })
      .then(res => {
        if (res.ok) {
          console.log('Server is available');
          setServerAvailable(true);
          
          // Now try to load GIF or image from server
          if (project.gifUrl) {
            const gifFilename = project.gifUrl.split('/').pop();
            
            // Check if the GIF exists on the server
            return fetch(`${apiBase}/check-gif/${gifFilename}`)
              .then(res => res.json())
              .then(data => {
                if (data.exists) {
                  // GIF exists, use it
                  console.log(`GIF confirmed to exist: ${data.url}`);
                  setImgSrc(`${apiBase}${project.gifUrl}`);
                } else {
                  // GIF doesn't exist, fall back to static image
                  const imageFilename = project.imageUrl.split('/').pop();
                  return fetch(`${apiBase}/check-image/${imageFilename}`)
                    .then(res => res.json())
                    .then(imgData => {
                      if (imgData.exists) {
                        setImgSrc(`${apiBase}${project.imageUrl}`);
                      } else {
                        setImgSrc(placeholderImage);
                      }
                    });
                }
              });
          } else if (project.imageUrl) {
            // No GIF URL provided, use static image
            const imageFilename = project.imageUrl.split('/').pop();
            return fetch(`${apiBase}/check-image/${imageFilename}`)
              .then(res => res.json())
              .then(data => {
                if (data.exists) {
                  setImgSrc(`${apiBase}${project.imageUrl}`);
                } else {
                  setImgSrc(placeholderImage);
                }
              });
          } else {
            // No image or GIF URL provided
            setImgSrc(placeholderImage);
          }
        } else {
          throw new Error('Server unavailable');
        }
      })
      .catch(err => {
        console.error('Server unavailable:', err);
        setServerAvailable(false);
        
        // Use direct path for backup/static mode
        // If using relative paths without server, ensure they're accessible
        const currentPath = window.location.origin;
        
        if (project.gifUrl) {
          if (project.gifUrl.startsWith('/')) {
            // Handle relative paths by prepending current origin
            setImgSrc(`${currentPath}${project.gifUrl}`);
          } else {
            setImgSrc(project.gifUrl);
          }
        } else if (project.imageUrl) {
          if (project.imageUrl.startsWith('/')) {
            // Handle relative paths by prepending current origin
            setImgSrc(`${currentPath}${project.imageUrl}`);
          } else {
            setImgSrc(project.imageUrl);
          }
        } else {
          setImgSrc(placeholderImage);
        }
      });
  }, [project.gifUrl, project.imageUrl]);
  
  // Handle image loading error
  const handleImageError = () => {
    console.error('Media failed to load:', imgSrc);
    setImgError(true);
    
    if (serverAvailable) {
      // If using the GIF failed, try the static image
      if (imgSrc.includes('.gif') && project.imageUrl) {
        console.log('Falling back to static image');
        setImgSrc(`${apiBase}${project.imageUrl}`);
      } 
      // If using the static image failed, try the placeholder
      else if (imgSrc !== placeholderImage) {
        console.log('Falling back to placeholder image');
        setImgSrc(placeholderImage);
      }
    } else {
      // In backup mode, try direct paths
      if (imgSrc.includes('.gif') && project.imageUrl) {
        setImgSrc(project.imageUrl);
      } else {
        setImgSrc(placeholderImage);
      }
    }
  };
  
  // Handle image load success
  const handleImageLoad = () => {
    console.log('Media loaded successfully:', imgSrc);
    setImgLoaded(true);
  };
  
  // Open fullscreen view
  const openFullscreen = (e) => {
    e.stopPropagation(); // Prevent card click
    setIsFullscreenOpen(true);
  };
  
  // Navigate to project detail page
  const navigateToDetail = () => {
    navigate(`/projects/${project.id}`, false, true);
  };
  
  return (
    <>
      <div className="card h-full transition-all hover:shadow-lg hover:translate-y-[-5px] cursor-pointer" onClick={navigateToDetail}>
        <div className="relative w-full h-48 overflow-hidden group">
          {/* Debug info overlay */}
          {!imgLoaded && (
            <div className="absolute top-0 left-0 right-0 z-10 p-1 text-xs text-white bg-black bg-opacity-50">
              Loading: {imgSrc}
            </div>
          )}
          
          {/* Fallback display if image fails */}
          {imgError && imgSrc === placeholderImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                {project.title}
              </span>
            </div>
          )}
          
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            onLoad={handleImageLoad}
            unoptimized={true}
            priority={true}
          />
          
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              {project.category}
            </span>
          </div>
          
          {/* Fullscreen button overlay */}
          <button 
            onClick={openFullscreen}
            className="absolute bottom-2 right-2 p-2 text-white bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70 z-10"
            aria-label="View fullscreen"
            title="View fullscreen"
          >
            <FaExpand size={16} />
          </button>
        </div>
        
        <div className="p-5">
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            {project.title}
          </h3>
          
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded dark:bg-gray-700 dark:text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/projects/${project.id}`, false, true);
              }}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium bg-transparent border-0 cursor-pointer p-0"
            >
              View Details
            </button>
            
            <div className="flex space-x-3">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="GitHub repository"
                  title="Client GitHub Repository"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub size={20} />
                </a>
              )}
              
              {project.serverGithubUrl && (
                <a 
                  href={project.serverGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Server GitHub repository"
                  title="Server GitHub Repository"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaServer size={18} />
                </a>
              )}
              
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Live project"
                  title="Live Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen viewer modal */}
      <FullscreenMedia
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        src={imgSrc}
        alt={project.title}
        type={imgSrc.includes('.gif') ? 'gif' : 'image'}
      />
    </>
  )
}