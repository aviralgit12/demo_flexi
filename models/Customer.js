// models/Customer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/database'); // adjust the path as needed

const Customer = sequelize.define('customer', {
    CustomerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CustomerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ContactName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 }, {
        // Additional model options
        timestamps: false, // if you don't want createdAt and updatedAt fields
      
});

module.exports = Customer;
