const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [2, 'Password must be at least 2 characters long'],
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw new Error('Please provide an email and password');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Please provide a valid email');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Please provide a stronger password');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

// instance login method
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw new Error('Please provide an email and password');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Please enter a valid email');
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
