const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://tahaobaid441:HTh2PMUmmSEjuue1@ac-iyyaxuq-shard-00-00.qifj0mq.mongodb.net:27017,ac-iyyaxuq-shard-00-01.qifj0mq.mongodb.net:27017,ac-iyyaxuq-shard-00-02.qifj0mq.mongodb.net:27017/?ssl=true&replicaSet=atlas-arqohg-shard-0&authSource=admin&retryWrites=true&w=majority');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Body parser middleware
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

// API routes
app.use('/api/exercises', require('./routes/exercises'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
