/**
 * Static Project Data
 * 
 * This file contains all project data statically defined as JavaScript objects.
 * No database connection is used - all data is stored directly in this file.
 * To add or modify projects, simply edit the array below.
 */

// Static projects array - this replaces any database connection
const projects = [
  {
    id: 1,
    title: 'Pizzeria App',
    description: 'A Swift iOS application for a pizza restaurant with a custom server backend. The app allows users to browse menu items, customize pizzas, place orders, and track delivery status.',
    extendedDescription: 'The Pizzeria App is a comprehensive mobile solution that connects customers with a pizza restaurant through an intuitive interface. Users can browse the complete menu, view detailed ingredient lists, customize their pizzas with various toppings and crust options, place orders for delivery or pickup, track delivery status in real-time, and make secure payments.\n\nOn the technical side, the app is built with Swift and UIKit/SwiftUI for the frontend, providing a responsive and native iOS experience. The backend is powered by Node.js and Express, handling order processing, user authentication, and delivering real-time updates through websockets. The app demonstrates my ability to build full-stack solutions that connect mobile clients with custom server implementations.\n\n**Technical Implementation:**\n- Architecture: MVVM pattern for iOS app with clean separation of UI and business logic\n- Data Flow: Unidirectional data flow with reactive programming using Combine framework\n- API Design: RESTful API endpoints with proper authentication middleware and request validation\n- Real-time Updates: Socket.io implementation for live order status tracking\n- State Management: Redux-inspired state management on the iOS app\n- Code Organization: Protocol-oriented programming with dependency injection for testability\n- UI Implementation: Programmatic UI with compositional layout for collection views',
    category: 'iOS App, Backend',
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
    extendedDescription: 'GasWise is a specialized expense tracking application focused exclusively on vehicle fuel costs. The app provides drivers with tools to log each fill-up, including the amount spent, volume of fuel, price per gallon/liter, odometer reading, and location. Over time, the app builds a complete history of your vehicle\'s fuel consumption.\n\nThe statistics module generates detailed reports showing average fuel economy, costs per mile/km, monthly spending trends, and projections for future expenses. GasWise also allows users to set budgets and receive notifications when spending exceeds typical patterns.\n\nBuilt using Swift and Core Data for persistent local storage, the app demonstrates effective data modeling, complex calculations, and meaningful data visualization with Charts. The clean interface makes frequent data entry simple while providing powerful insights from the collected data.\n\n**Technical Implementation:**\n- Data Persistence: Core Data with optimized model relationships and efficient fetch requests\n- Computer Vision: Vision framework for receipt scanning and automatic data extraction\n- Data Visualization: Custom chart rendering with interactive elements using Charts framework\n- Location Services: Integration with MapKit for recording fill-up locations\n- Database Architecture: Multi-context Core Data stack for background processing\n- User Notifications: Local notifications for budget alerts with actionable buttons\n- State Restoration: Seamless app state preservation and restoration',
    category: 'iOS App',
    technologies: ['Swift', 'Core Data', 'Charts', 'Vision', 'UIKit'],
    imageUrl: '/images/projects/gaswise.jpg',
    gifUrl: '/gifs/gaswisegif.gif',
    githubUrl: 'https://github.com/Dor2495/GasWise',
    featured: true
  },
  {
    id: 3,
    title: 'CountDown Game Timer',
    description: 'A specialized countdown timer designed for gaming scenarios with customizable alerts, themes, and sound effects. Perfect for tracking turn-based games or timed challenges.',
    extendedDescription: 'CountDown Game Timer was created specifically for board game enthusiasts and competitive gamers who need to track time limits during play. Unlike generic timer apps, this application offers multiple specialized modes for different gaming scenarios.\n\nFeatures include customizable time presets for popular games, visual and audio alerts at specific intervals, the ability to pause and resume timers, and theme customization to match the game being played. The timer supports turn-based tracking for up to 8 players, each with their own time bank.\n\nThe app is built with Swift and UIKit, with special attention paid to timer accuracy and background operation. Custom animations provide visual feedback as time runs low, and the audio alert system works even when the device is in silent mode (optional setting). This project demonstrates my ability to create specialized tools that serve a specific user need with attention to detail and user experience.\n\n**Technical Implementation:**\n- Timer Precision: Custom timer implementation with high-resolution timing for accuracy\n- Animation Engine: Core Animation with keyframe animations for fluid visual feedback\n- Audio Management: AVFoundation integration with custom sound profiles and background mode support\n- State Pattern: Implementation of state design pattern for managing different timer states\n- Theming System: Dynamic UI theming with runtime appearance changes\n- Background Execution: Extended background execution with proper state restoration\n- Accessibility: VoiceOver support and dynamic type adaptation for accessibility compliance',
    category: 'iOS App',
    technologies: ['Swift', 'Timer API', 'UIKit', 'Animation'],
    imageUrl: '/images/projects/countdown-timer.jpg',
    gifUrl: '/gifs/countdown-timer.gif',
    githubUrl: 'https://github.com/Dor2495/CountDownGameTimer',
    featured: true
  }
  /* Temporarily hidden projects
  {
    id: 4,
    title: 'Task Server',
    description: 'A JavaScript server implementation that works with a Swift client application for task management and organization.',
    extendedDescription: 'Task Server is a backend API service built to power a task management iOS application. It provides a RESTful API for creating, updating, organizing, and synchronizing tasks across multiple devices. The server handles user authentication, data persistence, and real-time updates.\n\nKey features include user account management with secure authentication, task creation and editing, list organization, priority levels, due dates with reminders, recurring tasks, and team sharing capabilities. The server maintains task history and provides synchronization to ensure a consistent experience across devices.\n\nBuilt with Node.js and Express, the application demonstrates proper API design, middleware usage, error handling, and security practices. MongoDB is used for data storage with proper indexing and query optimization. This project showcases my backend development skills and ability to create services that complement mobile applications.\n\n**Technical Implementation:**\n- API Architecture: RESTful API design with proper resource modeling and versioning\n- Authentication: JWT-based authentication with refresh token rotation\n- Database Design: MongoDB schema design with proper indexing and data validation\n- Error Handling: Comprehensive error handling with custom error classes\n- Middleware Stack: Modular middleware for logging, authentication, and validation\n- Rate Limiting: API rate limiting to prevent abuse\n- Data Synchronization: Efficient conflict resolution for multi-device synchronization',
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
    extendedDescription: 'Cilin Time App is a productivity tool focused on helping users understand how they spend their time throughout the day. The app combines time tracking with task management to provide insights into productivity patterns and help users optimize their schedules.\n\nUsers can track time spent on different activities, categorize tasks, set goals for time allocation, and receive reports on how their actual time usage compares to their intentions. The app also offers pomodoro-style focus sessions, break reminders, and daily planning tools.\n\nBuilt with Swift and Core Data, the application features a clean, intuitive interface that makes time tracking feel effortless rather than burdensome. Charts and visualizations help users quickly understand their time allocation patterns. This project demonstrates my focus on creating tools that provide practical value while maintaining excellent usability.\n\n**Technical Implementation:**\n- Data Model: Core Data with complex relationships for activity categories and time entries\n- UI Architecture: MVVM pattern with coordinator pattern for navigation flow\n- Background Processing: Background task scheduling for reminders and statistics calculation\n- Widget Extension: Home screen widget for quick time tracking and visualization\n- Persistent Storage: Efficient Core Data stack with proper migration paths\n- Analytics: Custom analytics for understanding user behavior patterns\n- Drag and Drop: Support for drag and drop reorganization of tasks and schedules',
    category: 'iOS App',
    technologies: ['Swift', 'UIKit', 'Core Data'],
    imageUrl: '/images/projects/cilin-time.jpg',
    gifUrl: '/gifs/cilin-time.gif',
    githubUrl: 'https://github.com/Dor2495/CilinTimeApp',
    featured: false
  }
  */
];

/**
 * Get all projects
 * Returns the static projects array - no database query
 */
exports.getAllProjects = (req, res) => {
  // Since this is static data, we directly return the array
  res.json(projects);
};

/**
 * Get a project by ID
 * Filters the static projects array - no database query
 */
exports.getProjectById = (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  res.json(project);
};

/**
 * Get a project by ID (Synchronous version)
 * Used internally by other server functions
 * @param {number} id - The project ID to find
 * @returns {object|null} The project object or null if not found
 */
exports.getProjectByIdSync = (id) => {
  return projects.find(p => p.id === id) || null;
}; 