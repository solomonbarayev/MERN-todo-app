const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');
const userRouter = require('./routes/user');

const app = express();

// Middleware
app.use(compression());
app.use(helmet());
app.use(cors());
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

///server statis assests  if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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
