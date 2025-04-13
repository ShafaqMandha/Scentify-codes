import serial
import time
import csv

# Set the serial port and baud rate
port = 'COM14'  # Change this to your Arduino's port
baud_rate = 115200  # Match the ESP32 baud rate
# Open serial connection
ser = serial.Serial(port, baud_rate)
time.sleep(2)  # Wait for the serial connection to initialize
# Ask user for the perfume type (label)
perfume_type = input("Input perfume type: ")

# Create/open the CSV file for writing
with open('sensor_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    # Write the header of the CSV file with the new label column
    writer.writerow(["MQ-3", "MQ-4", "MQ-135", "Label"])
    try:
        while True:
            if ser.in_waiting > 0:
                # Read a line of data from the serial monitor
                line = ser.readline().decode('utf-8').strip()
                
                # Split the data based on commas
                data = line.split(', ')
                
                # Append the label to the data row
                data.append(perfume_type)
                
                # Write the data to the CSV file
                writer.writerow(data)
                print(data)  # Optionally print to the console
            
            time.sleep(1)  # Wait a second before reading again

    except KeyboardInterrupt:
        print("Data logging stopped.")

    finally:
        ser.close()  # Close the serial connection
