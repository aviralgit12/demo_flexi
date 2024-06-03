// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/database'); // adjust the path as needed
const Customer = require('./Customer'); // adjust the path as needed
const Product = require('./Product');

const Order = sequelize.define('order', {
    OrderID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    OrderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    // Additional model options
    timestamps: false, // if you don't want createdAt and updatedAt fields

});

Order.belongsTo(Customer, { foreignKey: 'CustomerID' });
Customer.hasMany(Order, { foreignKey: 'CustomerID' });

Order.belongsTo(Product, { foreignKey: 'ProductID' });
Product.hasMany(Order, { foreignKey: 'ProductID' });
module.exports = Order;
