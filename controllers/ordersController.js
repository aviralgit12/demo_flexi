const sequelize = require('../configuration/database');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
exports.addOrder = async (req, res) => {
    const orders = req.body.orders;
    const t = await sequelize.transaction();
    try {
          const ordersToCreate = await Promise.all(orders.map(async (order) => {
            const customer = await Customer.create({
                CustomerName: order.CustomerName,
                ContactName: order.ContactName,
                Country: order.Country,
            }, { transaction: t });

            const product = await Product.findByPk(order.ProductID, { transaction: t });
            if (!product) {
                throw new Error(`Product not found for ProductID: ${order.ProductID}`);
            }

            return {
                OrderDate: order.OrderDate,
                CustomerID: customer.CustomerID,
                ProductID: order.ProductID,
                Quantity: order.Quantity,
            };
        }));
        await Order.bulkCreate(ordersToCreate, { transaction: t });
        await t.commit();

        res.status(201).send('Customer and order added successfully');
    } catch (error) {
        await t.rollback();
        res.status(500).send(error);
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            attributes: [
                'OrderID',
                'OrderDate',
                [sequelize.col('customer.CustomerName'), 'CustomerName'],
                [sequelize.col('customer.ContactName'), 'ContactName'],
                [sequelize.col('customer.Country'), 'Country'],
                [sequelize.col('product.ProductName'), 'ProductName'],
                'Quantity',
                [sequelize.col('product.Price'), 'Price'],
                [sequelize.literal('Quantity * `product`.`Price`'), 'TotalPrice'],
            ],
            include: [
                {
                    model: Customer,
                    attributes: []
                },
                {
                    model: Product,
                    attributes: []
                }
            ],
            raw: true
        });

        res.json(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};