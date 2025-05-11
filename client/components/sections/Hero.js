'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Image from 'next/image'

const githubLink = 'https://github.com/dor2495'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gray-50 dark:bg-gray-900 md:pt-40 md:pb-24">
      <div className="container relative z-10">
        <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              <span className="text-primary-600 dark:text-primary-400">Developer</span> with a
              passion for creating exceptional experiences
            </h1>
            
            <p className="mb-8 text-lg text-gray-600 md:text-xl dark:text-gray-300">
              I build iOS apps and backend systems that deliver outstanding user experiences and robust performance.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
            
            <div className="flex items-center mt-8 space-x-4">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                aria-label="GitHub Profile"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative order-first md:order-last"
          >
            <div className="relative overflow-hidden bg-white rounded-lg shadow-xl aspect-square dark:bg-gray-800">
              <Image 
                src="/images/your-image.jpg" 
                alt="Developer showcase" 
                fill
                className="object-fill p-0"
                priority
              />
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-500 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500 rounded-full opacity-30 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-500 rounded-full opacity-10 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
    </section>
  )
} 