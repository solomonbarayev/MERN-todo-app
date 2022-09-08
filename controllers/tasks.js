const Task = require('../models/task');

const getTasks = (req, res) => {
  Task.find({ userId: req.user._id })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json(err));
};

const getTask = (req, res) => {
  const { id } = req.params;
  Task.findById(id)
    .orFail(() => {
      const error = new Error('Not Found');
      error.statusCode = 404;
      throw error;
    })
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).json({ message: 'Not Found' });
      } else if (err.name === 'CastError') {
        res.status(400).json({ message: 'Invalid ID' });
      } else {
        res.status(500).json(err);
      }
    });
};

const createTask = (req, res) => {
  Task.create({ text: req.body.text, userId: req.user._id })
    .then((task) => res.status(201).json(task))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json(err.message);
      } else {
        res.status(500).json(err);
      }
    });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { text, isComplete } = req.body;
  Task.findByIdAndUpdate(
    id,
    { text, isComplete },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('Not Found');
      error.statusCode = 404;
      throw error;
    })
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).json({ message: 'Not Found' });
      } else if (err.name === 'CastError') {
        res.status(400).json({ message: 'Invalid ID' });
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Invalid data' });
      } else {
        res.status(500).json(err);
      }
    });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  Task.findByIdAndRemove(id, { new: true })
    .orFail(() => {
      const error = new Error('Not Found');
      error.statusCode = 404;
      throw error;
    })
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).json({ message: 'Not Found' });
      } else if (err.name === 'CastError') {
        res.status(400).json({ message: 'Invalid ID' });
      } else {
        res.status(500).json(err);
      }
    });
};

const deleteAllTasks = (req, res) => {
  Task.deleteMany({})
    .then(() => res.status(200).json({ message: 'All tasks deleted' }))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
