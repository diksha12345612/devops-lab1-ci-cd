const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to DevOps Lab 1 - CI/CD Pipeline API 🚀',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// About route
router.get('/about', (req, res) => {
  res.json({
    success: true,
    project: 'DevOps Lab 1',
    description: 'Node.js + Express app with Docker & CI/CD pipeline',
    author: 'DevOps Lab',
    stack: ['Node.js', 'Express', 'Docker', 'GitHub Actions'],
  });
});

module.exports = router;
