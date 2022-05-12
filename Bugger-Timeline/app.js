// This is 'app.js' - The Main File of Arachnomesh Bugger Timeline

// Importing Requirements
const express = require('express');
const app = express();
const db = require('./models');
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Routers

// 1. Employee Routes
const employeeRoleRoutes = require('./routes/role-routes')
app.use('/api/arachnomesh/employeeRoles', employeeRoleRoutes);

// 2. Role Routes
const employeeRoutes = require('./routes/employee-routes')
app.use('/api/arachnomesh/employees', employeeRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Hello');
});

// Syncing the Database and Running the Application
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App Listening at http://localhost:${port}`);
    });
});