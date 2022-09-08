const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Task text is required'],
    trim: true,
    minlength: [2, 'Task text must be at least 2 characters long'],
    maxlength: [100, 'Task text must be less than 100 characters long'],
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
