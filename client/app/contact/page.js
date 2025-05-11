'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa'
import axios from 'axios'

// API URL from environment variable
const API_URL = `${process.env.API_URL || 'http://localhost:3001'}/api/contact`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null) // Clear previous status
    
    try {
      console.log('Sending form data:', formData);
      
      // Send the form data to the server
      const response = await axios.post(API_URL, formData);
      console.log('Server response:', response.data);
      
      setSubmitStatus({
        success: true,
        message: response.data.message || 'Thanks for your message! I will get back to you soon.'
      })
      // Reset form
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Something went wrong. Please try again later.';
      
      // Check if we have a proper response error message
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-16">
      {/* Page Title */}
      <div className="container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-bold text-center text-gray-900 md:text-5xl dark:text-white">
            Get in Touch
          </h1>
          <p className="max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300">
            I'm currently available for freelance work and full-time opportunities.
            If you have a project that needs coding, maintance or need to strengthen your team, get in touch!
          </p>
        </motion.div>
      </div>

      <div className="container grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Contact Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 text-white bg-primary-600 rounded-full">
                <FaEnvelope className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                <a href="mailto:dor2495@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  dor2495@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 text-white bg-primary-600 rounded-full">
                <FaPhone className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                <a href="tel:+972526706305" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  +972 52 670 630 5
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 text-white bg-primary-600 rounded-full">
                <FaMapMarkerAlt className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Haifa, Israel
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="mt-8 mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Connect With Me
          </h3>
          
          <div className="flex space-x-4">
            <a
              href="https://github.com/Dor2495"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-primary-600 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary-600 dark:hover:text-white"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/dor-mizrachi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-primary-600 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary-600 dark:hover:text-white"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Send a Message
          </h2>
          
          {submitStatus && (
            <div className={`p-4 mb-6 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="John Doe"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="I'd like to discuss a project..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-white transition-colors bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 