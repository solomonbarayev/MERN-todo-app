const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const tasksRouter = require('./routes/tasks');
const userRouter = require('./routes/user');

const app = express();

// Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri).then(() => {
      console.log('Connected to tasksdb');
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

app.use('/tasks', tasksRouter);
app.use('/user', userRouter);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`App listening on port ${port}...`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
