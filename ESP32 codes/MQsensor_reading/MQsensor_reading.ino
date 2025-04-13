// Pin definitions for sensors
const int mq3Pin = 32;   // MQ-3 sensor
const int mq4Pin = 33;   // MQ-4 sensor
const int mq135Pin = 35; // MQ-135 sensor

void setup() {
  // Start serial communication for debugging
  Serial.begin(115200);
  
  Serial.println("MQ-3, MQ-4, MQ-135");
}

void loop() {
  // Read sensor values and scale to 10-bit range
  int mq3Value = analogRead(mq3Pin) / 4;
  int mq4Value = analogRead(mq4Pin) / 4;
  int mq135Value = analogRead(mq135Pin)/4;

  // Display sensor readings on Serial Monitor
  Serial.print(mq3Value);
  Serial.print(", ");
  Serial.print(mq4Value);
  Serial.print(", ");
  Serial.println(mq135Value);

  // Wait for a second before taking the next reading
  delay(1000);  // Adjust this delay as necessary for your needs
}
