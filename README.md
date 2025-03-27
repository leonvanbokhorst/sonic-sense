# 🔊 SonicSense

SonicSense is a classroom sound monitoring system using MQTT for real-time tracking of student noise levels. Teachers can monitor which students are being too chatty! 🤫

## 📋 Features

- **MQTT-based Pub/Sub Architecture**: Reliable real-time communication
- **Student Sound Monitoring**: Each student's laptop monitors their individual sound level
- **Teacher Dashboard**: Beautiful real-time dashboard displaying all student sound levels
- **Historical Data**: Track average classroom sound over time

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/sonic-sense.git
   cd sonic-sense
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

#### 1. Start the MQTT Broker (Teacher's Computer)

```bash
npm run start-broker
```

The broker will start on port 1883 and is ready to receive sound level data from students.

#### 2. Start the Dashboard (Teacher's Computer)

```bash
npm run start-dashboard
```

Open your browser and navigate to http://localhost:3000 to see the teacher dashboard.

#### 3. Start the Student Client (Each Student's Computer)

First, modify the client.js file to connect to the teacher's IP address:

```javascript
// In src/client/client.js, change:
const client = mqtt.connect('mqtt://localhost:1883', {
  // to:
const client = mqtt.connect('mqtt://TEACHER_IP_ADDRESS:1883', {
```

Then run:

```bash
npm run start-client
```

The student client will connect to the broker and begin sending sound levels.

## 🎮 Using the Student Client

For demo purposes, students can press Enter to toggle between "talking" and "quiet" states.

## 🖥 Dashboard Features

- Real-time sound level meters for each student
- Color-coded status indicators (green = quiet, yellow = moderate, red = noisy)
- Class average sound level history chart
- Automatic updates when students connect/disconnect

## 📝 Note on Real Sound Monitoring

The current implementation simulates sound levels for demonstration purposes. For actual microphone input:

1. Uncomment and configure the node-microphone implementation in client.js
2. Test on each target platform to ensure microphone permissions are properly handled

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Node.js, Express, Socket.IO, MQTT, and Chart.js
- Created for educational purposes to improve classroom management
