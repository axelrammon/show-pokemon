require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

const authRoute = require('./routes');

// Conectar BD
mongoose.connect(
  'mongodb+srv://testework:testework@cluster0-4lquk.mongodb.net/test?retryWrites=true&w=majority', 
  { useNewUrlParser: true },
  () => {
    console.log("Conectado ao BD");
  }
);

app.use(express.json());

app.use('/api/user', authRoute);

app.listen(4000, () => {
  console.log("Server running");
});