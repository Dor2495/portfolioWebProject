/**
 * Project Routes
 * 
 * These routes provide access to static project data without database connections.
 * All data is stored in the controller file as JavaScript objects.
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Debug route - serves static information
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Projects route is working',
    dataSource: 'Static JavaScript arrays - no database connection',
    projectCount: 'Fixed set in controller file'
  });
});

// Get all projects - returns static array from controller
router.get('/', projectController.getAllProjects);

// Get a single project by ID - filters static array in controller
router.get('/:id', projectController.getProjectById);

module.exports = router; 