const express = require('express');
const cors = require('cors');
var path = require('path');
const app = express();

const sensorTypeRouter = require('./sensorTypes/sensorType.routes');
const sensorReadingRouter = require('./sensorReadings/sensorReading.routes');

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

// Include route files
app.use('/sensorTypes', sensorTypeRouter);
app.use('/sensors', sensorReadingRouter);
  
// a 404 error for undefined routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(err.message);
});

module.exports = app;

// Specify the port to listen on
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'/')));

// Start the server
app.listen(port, () => {
    console.log(`Node.js is listening on port ${port}`);
});

