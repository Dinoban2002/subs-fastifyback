const { Sequelize,DataTypes } = require('sequelize');
var sequelize = require("../connection")

const User = sequelize.define('user', {
    __kp__userid : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.TEXT
    }
},
{
    timestamps: false,
    freezeTableName: true
});
module.exports = User