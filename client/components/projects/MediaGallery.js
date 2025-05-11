'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaExpand, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import FullscreenMedia from '../common/FullscreenMedia'

const API_BASE = 'http://localhost:3001';

export default function MediaGallery({ projectName, projectId, baseImageUrl, baseGifUrl }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  
  // Generate potential media file paths based on project name
  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        setLoading(true);
        const items = [];
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        // Add the main image and GIF
        if (baseImageUrl) {
          items.push({
            type: 'image',
            url: baseImageUrl.startsWith('http') ? baseImageUrl : `${API_BASE}${baseImageUrl}`,
            title: `${projectName} Main Image`
          });
        }
        
        if (baseGifUrl) {
          items.push({
            type: 'gif',
            url: baseGifUrl.startsWith('http') ? baseGifUrl : `${API_BASE}${baseGifUrl}`,
            title: `${projectName} Animation`
          });
        }
        
        // Generate additional potential image names (up to 5 additional images)
        const baseName = projectName.toLowerCase().replace(/\s+/g, '-');
        
        // Check for additional numbered images (2-5)
        for (let i = 2; i <= 5; i++) {
          // Check JPG format
          try {
            const res = await fetch(`${API_BASE}/check-image/${baseName}${i}.jpg`, { signal });
            const data = await res.json();
            if (data.exists) {
              items.push({
                type: 'image',
                url: `${API_BASE}/images/projects/${baseName}${i}.jpg`,
                title: `${projectName} Screenshot ${i}`
              });
            }
          } catch (e) {
            console.log(`No ${baseName}${i}.jpg found`);
          }
          
          // Also check PNG format
          try {
            const res = await fetch(`${API_BASE}/check-image/${baseName}${i}.png`, { signal });
            const data = await res.json();
            if (data.exists) {
              items.push({
                type: 'image',
                url: `${API_BASE}/images/projects/${baseName}${i}.png`,
                title: `${projectName} Screenshot ${i}`
              });
            }
          } catch (e) {
            console.log(`No ${baseName}${i}.png found`);
          }
          
          // Check GIF format
          try {
            const res = await fetch(`${API_BASE}/check-gif/${baseName}${i}.gif`, { signal });
            const data = await res.json();
            if (data.exists) {
              items.push({
                type: 'gif',
                url: `${API_BASE}/gifs/${baseName}${i}.gif`,
                title: `${projectName} Animation ${i}`
              });
            }
          } catch (e) {
            console.log(`No ${baseName}${i}.gif found`);
          }
        }
        
        clearTimeout(timeoutId);
        
        // If we found at least the main image/GIF, consider it a success
        if (items.length > 0) {
          setMediaItems(items);
          setSelectedItem(items[0]);
        }
      } catch (error) {
        console.error('Error fetching media items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMediaItems();
  }, [projectName, baseImageUrl, baseGifUrl]);
  
  // Open fullscreen view of the selected media
  const openFullscreen = () => {
    if (selectedItem) {
      setIsFullscreenOpen(true);
    }
  };
  
  // Navigate to next item in gallery
  const nextItem = () => {
    if (mediaItems.length <= 1) return;
    
    const currentIndex = mediaItems.findIndex(item => item.url === selectedItem.url);
    const nextIndex = (currentIndex + 1) % mediaItems.length;
    setSelectedItem(mediaItems[nextIndex]);
  };
  
  // Navigate to previous item in gallery
  const prevItem = () => {
    if (mediaItems.length <= 1) return;
    
    const currentIndex = mediaItems.findIndex(item => item.url === selectedItem.url);
    const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setSelectedItem(mediaItems[prevIndex]);
  };
  
  // If no media found, don't render
  if (mediaItems.length === 0 && !loading) {
    return null;
  }
  
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Project Gallery
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main display area */}
          {selectedItem && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg cursor-pointer group" onClick={openFullscreen}>
              <Image
                src={selectedItem.url}
                alt={selectedItem.title}
                fill
                className="object-contain"
                unoptimized={true}
                priority={true}
              />
              
              {/* Fullscreen icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                <FaExpand className="text-white text-2xl" />
              </div>
              
              {/* Navigation controls */}
              {mediaItems.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      prevItem();
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      nextItem();
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-center">
                {selectedItem.title}
              </div>
            </div>
          )}
          
          {/* Thumbnail navigation */}
          {mediaItems.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`relative h-20 w-32 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedItem?.url === item.url ? 'border-primary-600' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                  <div className={`absolute inset-0 bg-black ${
                    selectedItem?.url === item.url ? 'bg-opacity-0' : 'bg-opacity-40'
                  }`}></div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Fullscreen viewer */}
      {selectedItem && (
        <FullscreenMedia
          isOpen={isFullscreenOpen}
          onClose={() => setIsFullscreenOpen(false)}
          src={selectedItem.url}
          alt={selectedItem.title}
          type={selectedItem.type}
        />
      )}
    </div>
  );
} 