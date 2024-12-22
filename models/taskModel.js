let tasks = [];

module.exports = {
  getTasks: () => tasks,
  addTask: (task) => tasks.push(task),
  deleteTask: (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) tasks.splice(index, 1);
  },
};