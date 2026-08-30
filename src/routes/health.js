const express = require('express');
const router = express.Router();

// Health check route - used by Docker & CI/CD
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
  });
});

module.exports = router;
