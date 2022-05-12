// This is 'role-route.js' - A File containing all routes for the roles entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Role Controller
const roleControllers = require('../controllers/role-controllers')

// Role Routes
router.post('/addRole', roleControllers.addNewRole);
router.get('/allRoles', roleControllers.getAllRoles);
router.get('/allRoles/:id', roleControllers.getOneRole);
router.put('/allRoles/:id', roleControllers.updateOneRole);
router.delete('/allRoles/:id', roleControllers.deleteOneRole)

module.exports = router;