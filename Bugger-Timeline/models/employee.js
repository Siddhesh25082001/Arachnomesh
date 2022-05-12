// This is 'employee.js' - A File describing the Employee Model and its attributes

module.exports = (sequelize, DataTypes) => {

    // Employee Model 
    const Employee = sequelize.define("Employee", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        employee_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employee_email_id: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employee_password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employee_user_id: {
            type: DataTypes.INTEGER
        },

        employee_profile_icon: {
            type: DataTypes.STRING
        },

        employee_contact_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        employee_date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        employee_joining_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        employee_status: {
            type: DataTypes.BOOLEAN,
        },

    });

    // One to Many Association between Employee and Role
    Employee.associate = (models) => {
        Employee.belongsTo(models.Role, {
            foreignKey: {
                allowNull: true    // foreignKey : RoleId
            }
        });
    };

    return Employee;
}