const express = require('express');
const itemRoutes = require('./routes/items');

const app = express();

app.use(express.json());

app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

module.exports = app;
