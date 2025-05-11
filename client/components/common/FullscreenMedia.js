'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa'

export default function FullscreenMedia({ 
  isOpen, 
  onClose, 
  src, 
  alt, 
  type = 'image' // 'image' or 'gif'
}) {
  const [imageError, setImageError] = useState(false);
  
  // Reset error state when src changes
  useEffect(() => {
    setImageError(false);
  }, [src]);
  
  // Handle keyboard events for closing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Handle image error
  const handleImageError = () => {
    console.error('Failed to load image in fullscreen mode:', src);
    setImageError(true);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={handleBackdropClick}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 z-10 p-2 text-white rounded-full hover:bg-gray-800"
            onClick={onClose}
          >
            <FaTimes size={24} />
          </button>
          
          {/* Media container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[90vh]"
          >
            {imageError ? (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg">
                <FaExclamationTriangle size={48} className="text-yellow-400 mb-4" />
                <p className="text-white text-lg mb-2">Failed to load media</p>
                <p className="text-gray-300 text-sm mb-4">The image or GIF could not be loaded</p>
                <div className="text-sm text-gray-400 max-w-md overflow-hidden text-ellipsis">
                  {src}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={alt || 'Fullscreen media'}
                  className="object-contain"
                  style={{
                    maxHeight: '90vh',
                    width: 'auto',
                    margin: '0 auto'
                  }}
                  width={1200}
                  height={800}
                  unoptimized={true}
                  priority={true}
                  onError={handleImageError}
                />
              </div>
            )}
            
            {/* Caption if needed */}
            {alt && !imageError && (
              <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-white bg-black bg-opacity-50">
                {alt}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 