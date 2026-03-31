const express = require('express');
const router = express.Router();
const { adminLogin, getAllRegistrations, exportCSV } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');

router.post('/login', adminLogin);
router.get('/registrations', protect, getAllRegistrations);
router.get('/export', protect, exportCSV);

module.exports = router;