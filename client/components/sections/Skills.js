'use client'

import { motion } from 'framer-motion'
import { FaApple, FaServer, FaCode, FaDatabase, FaMobileAlt, FaTools } from 'react-icons/fa'

export default function Skills() {
  const skills = [
    {
      icon: <FaApple className="w-6 h-6 text-primary-500" />,
      title: 'iOS Development',
      description: 'Building native iOS applications using Swift and SwiftUI',
      technologies: ['Swift', 'SwiftUI', 'UIKit', 'CoreData', 'CloudKit']
    },
    {
      icon: <FaServer className="w-6 h-6 text-primary-500" />,
      title: 'Backend Development',
      description: 'Creating robust and scalable server-side applications',
      technologies: ['Node.js', 'Express', 'REST APIs', 'MySQL']
    },
    {
      icon: <FaDatabase className="w-6 h-6 text-primary-500" />,
      title: 'Database Design',
      description: 'Designing and optimizing database structures',
      technologies: ['MongoDB', 'MySQL']
    },
    {
      icon: <FaCode className="w-6 h-6 text-primary-500" />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces',
      technologies: ['React', 'Next.js', 'JavaScript']
    },
    // {
    //   icon: <FaMobileAlt className="w-6 h-6 text-primary-500" />,
    //   title: 'Mobile Architecture',
    //   description: 'Designing scalable and maintainable mobile app architectures',
    //   technologies: ['MVVM', 'MVC', 'Clean Architecture', 'Redux']
    // },
    // {
    //   icon: <FaTools className="w-6 h-6 text-primary-500" />,
    //   title: 'DevOps',
    //   description: 'Implementing CI/CD pipelines and deployment strategies',
    //   technologies: ['Docker', 'GitHub Actions', 'AWS', 'Heroku', 'Vercel']
    // }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            My Skills & Expertise
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Here are the technologies and methodologies I specialize in
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-700"
            >
              <div className="mb-4">{skill.icon}</div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                {skill.title}
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded dark:bg-gray-600 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 