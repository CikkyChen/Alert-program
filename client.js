const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883'); // MQTT server address

// Data for simulated drones
const shortDistanceDroneData_1 = {
    id: 'drone_SIT314_short_number 1', // Unique identifier for short_distance drones
    battery: 8, // The amount of power left in the battery
    latitude: 50.3141,
    longitude: 191.6793,
    altitude: 10, 
    speed: 70,
    category: 'short_distance',
};
const longDistanceDroneData_1 = {
    id: 'drone_SIT314_long_number 2', // Unique identifier for long_distance drones
    battery: 6, // The amount of power left in the battery
    latitude: 51.2030, 
    longitude: 192.5678, 
    altitude: 150, 
    speed: 80,
    category: 'long_distance',
};
// Release drone data on a regular basis
setInterval(() => {
    // Publish data for short_drone
    client.publish(`drone/${shortDistanceDroneData_1.category}/${shortDistanceDroneData_1.id}/battery`, shortDistanceDroneData_1.battery.toString());
    client.publish(`drone/${shortDistanceDroneData_1.category}/${shortDistanceDroneData_1.id}/location`, `${shortDistanceDroneData_1.latitude},
    ${shortDistanceDroneData_1.longitude}`);
    client.publish(`drone/${shortDistanceDroneData_1.category}/${shortDistanceDroneData_1.id}/altitude`, shortDistanceDroneData_1.altitude.toString());
    client.publish(`drone/${shortDistanceDroneData_1.category}/${shortDistanceDroneData_1.id}/speed`, shortDistanceDroneData_1.speed.toString());
    
    // Publish data for long_drone
    client.publish(`drone/${longDistanceDroneData_1.category}/${longDistanceDroneData_1.id}/battery`, longDistanceDroneData_1.battery.toString());
    client.publish(`drone/${longDistanceDroneData_1.category}/${longDistanceDroneData_1.id}/location`, `${longDistanceDroneData_1.latitude},
    ${longDistanceDroneData_1.longitude}`);
    client.publish(`drone/${longDistanceDroneData_1.category}/${longDistanceDroneData_1.id}/altitude`, longDistanceDroneData_1.altitude.toString());
    client.publish(`drone/${longDistanceDroneData_1.category}/${longDistanceDroneData_1.id}/speed`, longDistanceDroneData_1.speed.toString());
    
}, 15000); // Data will be released every 15s
