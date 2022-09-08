const router = require('express').Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} = require('../controllers/tasks');
const requireAuth = require('../middleware/requireAuth');

// require auth for all workout routes
router.use(requireAuth);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.delete('/', deleteAllTasks);

module.exports = router;
