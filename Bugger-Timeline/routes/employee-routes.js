// This is 'employee-route.js' - A File containing all routes for the employee entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Employee Controller
const employeeControllers = require('../controllers/employee-controllers')

// Employee Routes
router.post('/addEmployee', employeeControllers.addNewEmployee);
router.get('/allEmployees', employeeControllers.getAllEmployees);
router.get('/allEmployees/:id', employeeControllers.getOneEmployee);
router.put('/allEmployees/:id', employeeControllers.updateOneEmployee);
router.delete('/allEmployees/:id', employeeControllers.deleteOneEmployee)

module.exports = router;