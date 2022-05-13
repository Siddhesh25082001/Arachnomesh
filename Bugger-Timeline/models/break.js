// This is 'break.js' - A File describing the Break Model and its attributes

module.exports = (sequelize, DataTypes) => {

    // Attendance Model 
    const Break = sequelize.define("Break", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        break_in_time: {
            type: DataTypes.TIME,
            allowNull: false
        },

        break_out_time: {
            type: DataTypes.TIME,
            allowNull: false
        },

    });

    // Break Associations
    Break.associate = (models) => {
        
        // Many to One Association between Breaks and Attendance (N Breaks -> 1 Attendance)
        Break.belongsTo(models.Attendance, {
            foreignKey: {
                allowNull: true    // foreignKey : AttendanceId
            }
        });

    };

    return Break;
}