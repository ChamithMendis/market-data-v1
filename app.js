const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const marketRoutes = require('./routes/marketRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);
app.use('/market', marketRoutes);

module.exports = app;
