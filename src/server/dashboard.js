// SonicSense Teacher Dashboard
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mqtt = require('mqtt');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Create a static folder to serve the dashboard HTML/CSS/JS
app.use(express.static(path.join(__dirname, '../../public')));

// Connect to the MQTT broker
const mqttClient = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'teacher-dashboard'
});

// Store student sound levels
const students = {};

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('classroom/sound/#');
});

mqttClient.on('message', (topic, message) => {
  const studentId = topic.split('/')[2];
  const soundLevel = parseFloat(message.toString());
  
  students[studentId] = {
    soundLevel,
    timestamp: Date.now()
  };
  
  // Broadcast the updated data to all connected dashboard clients
  io.emit('soundUpdate', { students });
});

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
  console.log('Dashboard client connected');
  
  // Send current data to the new client
  socket.emit('soundUpdate', { students });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✨ SonicSense teacher dashboard running on http://localhost:${PORT} 📊`);
  console.log('Now you can monitor those chatty students! 🤫');
}); 