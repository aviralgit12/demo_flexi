// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/database'); // adjust the path as needed

const Product = sequelize.define('product', {
    ProductID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    // Additional model options
    timestamps: false, // if you don't want createdAt and updatedAt fields

});

module.exports = Product;
