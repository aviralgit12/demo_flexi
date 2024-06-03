require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const db = require('models/db');
const app = express();
const port = 3000;
const ordersRoute = require('./routes/ordersRoute');

const sequelize = require('./configuration/database');
const Customer = require('./models/Customer'); 
const Order = require('./models/Order'); 
const Product = require('./models/Product'); 

// Ensure the tables are created (if they do not exist already)
sequelize.sync({ force: false }) // Use `force: true` to drop and re-create tables on every run, remove for production
    .then(() => {
        console.log('Database & tables created!');
    });
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/orders', ordersRoute);

// Connect to the database
// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database.');
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
