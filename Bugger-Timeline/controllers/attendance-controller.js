// This is 'attendance-controller.js' - A File containing all the controllers for Attendance entity

// Importing Requirements
const Relations = require('../models');
const { Sequelize } = require('sequelize')

// Accessing Relations
const Attendance = Relations.Attendance;
const Employee = Relations.Employee;

// 1. Add a new attendance
const addNewAttendance = async (req, res) => {
    
    let newAttendanceDetails = {
        attendance_date: req.body.attendance_date,
        attendance_mark_in_time: req.body.attendance_mark_in_time,
        attendance_mark_out_time: req.body.attendance_mark_out_time,
        attendance_type: req.body.attendance_type,
        attendance_break_time: req.body.attendance_break_time,
        EmployeeId: req.body.EmployeeId
    };

    try{
        const newAttendance = await Attendance.create(newAttendanceDetails);
        res.status(200).send(newAttendance);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Get all attendance
const getAllAttendance = async (req, res) => {

    let results = {};

    try{
        let allAttendance = await Attendance.findAll({
            attributes: ['attendance_date'],
            include: {
                model: Employee,
                attributes: ['employee_name']
            }
            // attributes: [
            //     [Sequelize.fn('DISTINCT', Sequelize.col('attendance_date')) , 'attenance_date']
            // ]   
        });

        for(let i=0; i<allAttendance.length; i++){
            let key = allAttendance[i]["attendance_date"];
            let value = allAttendance[i]["Employee"]["employee_name"];
            console.log(key, value)

            // Key exists
            if(allAttendance[i]["attendance_date"] in results){
                
            }
            else{
                
            }
        }

        res.status(200).send(allAttendance);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 3. Get one attendance
const getOneAttendance = async (req, res) => {

    const date = req.params.date;
    let results = {
        "attendance_date": date,
        "Employees": [],
    };

    try{
        let oneAttendance = await Attendance.findAll({
            where: {
                attendance_date: date,
            },
            include: {
                model: Employee,
                attributes: ['id', 'employee_name']
            }
        });
        
        for(let i=0; i<oneAttendance.length; i++){
            console.log(oneAttendance[i]);
            results["Employees"].push(oneAttendance[i]["Employee"]);
        }
        
        res.status(200).send(results);
        console.log(results)
    }
    catch(err){
        res.status(404).send(`Error: ${err}`)
    }

};

// 4. Update one single employee
const updateOneAttendance = async (req, res) => {

    const id = req.params.id;

    let updatedDetails = {
        attendance_date: req.body.attendance_date,
        attendance_mark_in_time: req.body.attendance_mark_in_time,
        attendance_mark_out_time: req.body.attendance_mark_out_time,
        attendance_type: req.body.attendance_type,
        attendance_break_time: req.body.attendance_break_time,
        EmployeeId: req.body.EmployeeId
    };

    try{
        let updateStatus = await Attendance.update(updatedDetails, {
            where: {
                id: id,
            },
            include: [Employee]
        });

        if(updateStatus){
            try{
                let oneAttendance = await Attendance.findOne({
                    where: {
                        id: id
                    },
                    include: [Employee]
                });
                res.status(200).send(oneAttendance);
            }
            catch(err){
                res.status(404).send(`Error: ${err}`);
            }
        }
        else{
            res.status(404).send(`Error in Updation`);
        }
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    };

};

// 5. Delete one employee
const deleteOneAttendance = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await Attendance.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Attendance Deleted')
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
    addNewAttendance,
    getAllAttendance,
    getOneAttendance,
    updateOneAttendance,
    deleteOneAttendance
}

/*
[
    "attendance_date": 2022-05-13,
    "Employees": [
        {

        }
        {

        }
        {
            
        }
    ]
]

*/