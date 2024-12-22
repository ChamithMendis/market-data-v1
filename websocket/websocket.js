module.exports = (server) => {
    const { Server } = require('ws');
    const taskService = require('../services/taskService');
  
    const wss = new Server({ server });
  
    wss.on('connection', (ws) => {
      console.log('WebSocket connection established.');
  
      ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'GET_TASKS') {
          ws.send(JSON.stringify({ type: 'TASKS', payload: taskService.getAllTasks() }));
        }
        if (data.type === 'ADD_TASK') {
          taskService.createTask(data.payload);
          ws.send(JSON.stringify({ type: 'TASKS', payload: taskService.getAllTasks() }));
        }
      });
  
      ws.on('close', () => {
        console.log('WebSocket connection closed.');
      });
    });
  
    return wss;
  };
  