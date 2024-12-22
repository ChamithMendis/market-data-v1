const taskService = require('../services/taskService');

module.exports = {
  getTasks: (req, res) => {
    res.json(taskService.getAllTasks());
  },
  createTask: (req, res) => {
    const task = req.body;
    taskService.createTask(task);
    res.status(201).json({ message: 'Task created', task });
  },
  deleteTask: (req, res) => {
    const { id } = req.params;
    taskService.removeTask(id);
    res.json({ message: 'Task deleted' });
  },
};
