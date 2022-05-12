// This is 'role-controller.js' - A File containing all the controllers for Role entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const Role = Relations.Role;
const Employee = Relations.Employee;

// 1. Add a new role
const addNewRole = async (req, res) => {
    
    let newRoleDetails = {
        employee_role_name: req.body.employee_role_name,
        employee_role_description: req.body.employee_role_description,
        employee_role_isAdmin: req.body.employee_role_isAdmin
    };

    try{
        const newRole = await Role.create(newRoleDetails);
        res.status(200).send(newRole);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Get all roles
const getAllRoles = async (req, res) => {

    try{
        let allRoles = await Role.findAll({
            include: [Employee]
        });
        res.status(200).send(allRoles)
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 3. Get one single role
const getOneRole = async (req, res) => {

    const id = req.params.id;

    try{
        let oneRole = await Role.findOne({
            where: {
                id: id
            },
            include: [Employee]
        });
        res.status(200).send(oneRole);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`)
    }

};

// 4. Update one single role
const updateOneRole = async (req, res) => {

    const id = req.params.id;
    let updatedDetails = {
        employee_role_name: req.body.employee_role_name,
        employee_role_description: req.body.employee_role_description,
        employee_role_isAdmin: req.body.employee_role_isAdmin
    };

    try{
        let updateStatus = await Role.update(updatedDetails, {
            where: {
                id: id,
            },
            include: [Employee]
        });

        if(updateStatus){
            try{
                let oneRole = await Role.findOne({
                    where: {
                        id: id
                    },
                    include: [Employee]
                });
                res.status(200).send(oneRole);
            }
            catch(err){
                res.status(404).send(`Error: ${err}`);
            }
        }
        else{
            res.status(404).send(`Error in Updating`);
        }
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    };

};

// 5. Delete one role
const deleteOneRole = async (req, res) => {

    const id = req.params.id;

    try{
        let updateStatus = await Employee.update(
            { RoleId: null },{
            where: {
                RoleId: id
            },
        });
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    };

    try{
        let deleteStatus = await Role.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Role Deleted')
        }
        else{
            res.status(404).send('Error in Deletion');
        }
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
}

module.exports = {
    addNewRole,
    getAllRoles,
    getOneRole,
    updateOneRole,
    deleteOneRole
}