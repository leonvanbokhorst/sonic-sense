// SonicSense Student Client
const mqtt = require('mqtt');
const readline = require('readline');

// Normally we'd use a proper microphone library like node-microphone
// But since that requires system-specific setup, we'll simulate sound levels for demo purposes
// In a real implementation, replace this with actual microphone input

// Create a unique ID for this student
const studentId = `student-${Math.floor(Math.random() * 10000)}`;

// Connect to the MQTT broker
// In a real deployment, replace localhost with the teacher's IP address
const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: studentId
});

// Topic for publishing sound levels
const topic = `classroom/sound/${studentId}`;

// Simulated sound level monitoring
let isTalking = false;
let baseNoiseLevel = Math.random() * 20 + 30; // Base ambient noise (30-50)

client.on('connect', () => {
  console.log(`✨ SonicSense client connected as ${studentId}`);
  console.log('Now your chatty moments will be tracked! 🎤');
  
  // Start measuring and sending sound levels
  startSoundMonitoring();
  
  // Allow the student to simulate talking by pressing Enter
  setupUserInput();
});

function startSoundMonitoring() {
  // Send sound level every second
  setInterval(() => {
    // Generate a simulated sound level
    let soundLevel = baseNoiseLevel;
    
    // Add extra noise if "talking"
    if (isTalking) {
      soundLevel += Math.random() * 40 + 20; // Add 20-60 units when talking
    } else {
      // Add small random fluctuations to the base level
      soundLevel += Math.random() * 5 - 2.5;
    }
    
    // Ensure sound level is positive
    soundLevel = Math.max(0, soundLevel);
    
    // Round to one decimal place for cleaner display
    soundLevel = Math.round(soundLevel * 10) / 10;
    
    // Publish the sound level
    client.publish(topic, soundLevel.toString());
    
    // Show local feedback
    const status = isTalking ? '🗣️ TALKING' : '🤫 Quiet';
    console.log(`Current sound level: ${soundLevel} dB (${status})`);
  }, 1000);
}

function setupUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('\n📣 Press Enter to toggle between talking and quiet states');
  
  rl.on('line', () => {
    isTalking = !isTalking;
    console.log(isTalking ? '🔊 Now TALKING!' : '🔇 Now quiet...');
  });
}

// Handle disconnection
client.on('close', () => {
  console.log('Disconnected from the MQTT broker');
  process.exit(0);
});

// Handle errors
client.on('error', (err) => {
  console.error('Connection error:', err);
  process.exit(1);
}); 