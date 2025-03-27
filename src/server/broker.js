// MQTT Broker for SonicSense classroom sound monitoring
const aedes = require('aedes')();
const { createServer } = require('net');
const http = require('http');
const ws = require('websocket-stream');

// Regular MQTT port for Node.js clients
const mqttPort = 1883;
const mqttServer = createServer(aedes.handle);

// WebSocket port for browser clients
const wsPort = 9001;
const httpServer = http.createServer();
ws.createServer({ server: httpServer }, aedes.handle);

// Start both servers
mqttServer.listen(mqttPort, function () {
  console.log('SonicSense MQTT broker started and listening on port', mqttPort);
});

httpServer.listen(wsPort, function () {
  console.log('SonicSense WebSocket MQTT broker started and listening on port', wsPort);
});

// When a client connects
aedes.on('client', function (client) {
  console.log('Client connected:', client.id);
});

// When a client disconnects
aedes.on('clientDisconnect', function (client) {
  console.log('Client disconnected:', client.id);
});

// When a client publishes a message
aedes.on('publish', function (packet, client) {
  if (client && packet.topic.startsWith('classroom/sound/')) {
    const studentId = packet.topic.split('/')[2];
    console.log(`Student ${studentId} sound level:`, packet.payload.toString());
  }
});

console.log('✨ SonicSense teacher broker running! Students can connect to monitor sound levels 🔊'); 