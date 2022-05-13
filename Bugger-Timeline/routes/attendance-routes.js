// This is 'attendance-route.js' - A File containing all routes for the attendance entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Attendance Controller
const attendanceController = require('../controllers/attendance-controller')

// Employee Routes
router.post('/addAttendance', attendanceController.addNewAttendance);
router.get('/allAttendance', attendanceController.getAllAttendance);
router.get('/allAttendance/:date', attendanceController.getOneAttendance);
router.put('/allAttendance/:id', attendanceController.updateOneAttendance);
router.delete('/allAttendance/:id', attendanceController.deleteOneAttendance)

module.exports = router;