const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

// Subscribe to all drone messages
client.subscribe('drone/+/+/+');

// Subscribe to the Speeds of Short distance drones
client.subscribe('drone/short_distance/+/speed');

// Subscribe to the battery levels of all drones
client.subscribe('drone/+/battery');
// Subscribe to the latitude and longitude values of all long distance drones
client.subscribe('drone/long_distance/+/location');

client.on('message', (topic, message) => {
    console.log(`Received message on topic: ${topic}`);
    console.log(`Message: ${message.toString()}`);

    // Determine the drone type and data type
    const topicParts = topic.split('/');
    const droneCategory = topicParts[1];
    const droneId = topicParts[2];
    const dataType = topicParts[3];
    if (dataType === 'battery') {
        console.log(`Received Battery Level for ${droneCategory} Drone ${droneId}: ${message.toString()}`);
        // Process battery-level information
    } else if (dataType === 'location') {
        console.log(`Received Location for ${droneCategory} Drone ${droneId}: ${message.toString()}`);
        // Process location information
    } else if (dataType === 'altitude') {
        console.log(`Received Altitude for ${droneCategory} Drone ${droneId}: ${message.toString()}`);
        // Process altitude information
    } else if (dataType === 'speed') {
        console.log(`Received Speed for ${droneCategory} Drone ${droneId}: ${message.toString()}`);
        // Process speed information
    }
});