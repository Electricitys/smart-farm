#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "coba-beacon";
const char* password = "ilomon0123";

String serverName = "http://plz-smart-farm.herokuapp.com/datalake";

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

  delay(1000);

  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Serial.print(WiFi.localIP());
}

void loop() {
  if(Serial.available()) {
    // Serial.print("Masuk");
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    String uart = Serial.readStringUntil('\n');

    WiFiClient client;
    HTTPClient http;

    http.begin(client, serverName.c_str());
    http.addHeader("Content-Type", "application/json");

    // http.POST("{\"kelengasan_1\": 29.2,\"kelengasan_2\": 32.2,\"kelengasan_3\": 20.2,\"suhu\": 20,\"kelembapan\": 23,\"cahaya\": 101100,\"air\": 20}");
    http.POST(uart);

    // Serial.print(httpResponseCode);

    http.end();
  }
}
