const taskModel = require('../models/taskModel');

module.exports = {
  getAllTasks: () => taskModel.getTasks(),
  createTask: (task) => taskModel.addTask(task),
  removeTask: (id) => taskModel.deleteTask(id),
};
