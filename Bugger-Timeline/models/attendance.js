// This is 'attendance.js' - A File describing the Attendance Model and its attributes

module.exports = (sequelize, DataTypes) => {

    // Attendance Model 
    const Attendance = sequelize.define("Attendance", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        attendance_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        attendance_mark_in_time: {
            type: DataTypes.TIME
        },

        attendance_mark_out_time: {
            type: DataTypes.TIME
        },

        attendance_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        attendance_break_time: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

    });

    // Attendance Associations
    Attendance.associate = (models) => {
        
        // Many to One Association between Attendance and Employee (N Attendances -> 1 Employee)
        Attendance.belongsTo(models.Employee, {
            foreignKey: {
                allowNull: true    // foreignKey : EmployeeId
            }
        });

        // One to Many Association between Attendance and Break (1 Attendance - N Breaks)
        Attendance.hasMany(models.Break, {
            onDelete: "cascade",
            onUpdate: "cascade",
        });

    };

    return Attendance;
}