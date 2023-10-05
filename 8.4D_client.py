import paho.mqtt.client as mqtt
import time

# MQTT broker address
broker_address = "broker.hivemq.com"

# Callback when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    # Subscribe to relevant topics
    client.subscribe("drone/+/+/+")

# Callback when a message is received from the broker
def on_message(client, userdata, msg):
    topic = msg.topic
    message = msg.payload.decode('utf-8')

    # Split the topic to extract drone information
    topic_parts = topic.split('/')
    drone_category = topic_parts[1]
    drone_id = topic_parts[2]
    data_type = topic_parts[3]

    if data_type == 'low_battery_alert':
        print(f"Alert: {drone_category} Drone {drone_id} - Low Battery: {message}")
        # Implement logic to handle low battery alerts here
        check_low_battery_alert(drone_id)
    elif data_type == 'battery':
        battery_level = float(message)
        if battery_level < 10:
            print(f"Alert: {drone_category} Drone {drone_id} - Low Battery: {message}")
            # Implement logic to handle low battery alerts here
            check_low_battery_alert(drone_id)
    elif data_type == 'location':
        # Parse location information
        location_values = message.split(',')
        if len(location_values) >= 3:
            latitude, longitude, altitude = map(float, location_values[:3])
            # Implement logic to check for stationary drones at altitude above 100 here
            check_stationary_drone(drone_id, altitude)
        else:
            print("Error: Insufficient location data received")


# Create a dictionary to track battery levels
battery_levels = {}

def check_low_battery_alert(drone_id):
    battery_levels[drone_id] = battery_levels.get(drone_id, 0) + 1
    if battery_levels[drone_id] >= 2:
        print(f"Alert: More than two drones have low battery!!!!!")
        # Implement logic to publish the low battery alert

# Create a dictionary to track drone locations and timestamps
drone_locations = {}

def check_stationary_drone(drone_id, altitude):
    if drone_id in drone_locations:
        prev_location = drone_locations[drone_id]
        prev_altitude, prev_timestamp = prev_location
        current_time = time.time()

        # Check if the drone is stationary at altitude above 100
        if altitude > 100 and current_time - prev_timestamp > 6:
            print(f"Alert: Drone {drone_id} has been stationary for more than 10 minute at altitude above 100")
            # Implement logic to publish the stationary drone alert

    # Update drone location in the dictionary
    drone_locations[drone_id] = (altitude, time.time())

# Create an MQTT client
client = mqtt.Client()

# Set up callback functions
client.on_connect = on_connect
client.on_message = on_message

# Connect to the MQTT broker
client.connect(broker_address, 1883, 60)

# Start the MQTT client loop
client.loop_start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Client stopped")

# Disconnect from the broker when done
client.disconnect()