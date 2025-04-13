#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// Wi-Fi credentials
#define WIFI_SSID "WIFI"
#define WIFI_PASSWORD "Password"

// Firebase project API Key
#define API_KEY "AIzaSyDs4_FcOYZOtHcssfRpLur5j6R9EQJttTw"

// RTDB URL
#define DATABASE_URL "https://scentify-54c2e-default-rtdb.europe-west1.firebasedatabase.app/"

// Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

// Sensor pin definitions
const int mq3Pin = 32;   // MQ-3 sensor (instead of 13)
const int mq4Pin = 33;   // MQ-4 sensor (instead of 14)
const int mq135Pin = 35; // MQ-135 sensor (instead of 12)


void setup() {
  Serial.begin(115200);
  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("\nConnected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Configure Firebase
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  // Sign up to Firebase
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase authentication successful.");
    signupOK = true;
  } else {
    Serial.printf("Firebase authentication failed: %s\n", config.signer.signupError.message.c_str());
  }
  // Assign the callback function for token status updates
  config.token_status_callback = tokenStatusCallback;
  // Initialize Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
    if (Firebase.ready() && signupOK) {
        // Read sensor values
        int mq3Value = analogRead(mq3Pin)/4;
        int mq4Value = analogRead(mq4Pin)/4;
        int mq135Value = analogRead(mq135Pin)/4;

        Serial.print("MQ-3: "); Serial.print(mq3Value);
        Serial.print(", MQ-4: "); Serial.print(mq4Value);
        Serial.print(", MQ-135: "); Serial.println(mq135Value);

        // Write to a fixed location (overwrites old data)
        String path = "/latestSensorData";  

        if (!Firebase.RTDB.setInt(&fbdo, path + "/MQ3", mq3Value))
            Serial.println("MQ-3 update failed: " + fbdo.errorReason());
        if (!Firebase.RTDB.setInt(&fbdo, path + "/MQ4", mq4Value))
            Serial.println("MQ-4 update failed: " + fbdo.errorReason());
        if (!Firebase.RTDB.setInt(&fbdo, path + "/MQ135", mq135Value))
            Serial.println("MQ-135 update failed: " + fbdo.errorReason());

        delay(2000);  // Adjust as needed
    }
}
