#include <Arduino.h>
#include <DHT.h>
#include <arduino-timer.h>
#include <Wire.h>
#include <Max44009.h>
// #include <SoftwareSerial.h>

Max44009 lux(0x4A);
Timer<5> timer;

// SoftwareSerial ESP(9, 10);

const int pinTemp = 4;
const int pinTanah[] = {A1, A2, A3};
const int pinWater[] = {3, 2}; // Trig, Echo
// const int pinWater[] = {9, 12}; // Trig, Echo
const int pinRelay[] = {7, 6, 5, 8}; // T1; T2; T3; P;

int temp, humi;
int tanahRaw[] = {0,0,0};
int tanah[] = {0,0,0};
long duration;
int level;
int levelInc;
int levelCrr;
int lumen = 0;

int thMax[] = {65, 65, 65};
int thMin[] = {45, 45, 45};
int thLvl[] = {35, 10}; // Max; Min;

DHT dht(pinTemp, DHT11);

void getLevel() {
  digitalWrite(pinWater[0], LOW);
  delayMicroseconds(2);
  digitalWrite(pinWater[0], HIGH);
  delayMicroseconds(10);
  digitalWrite(pinWater[0], LOW);
  duration = pulseIn(pinWater[1], HIGH);
  levelCrr = duration * 0.034 / 2;

  if(levelCrr > 55) {
    levelCrr = 55;
  }

  if(level < levelCrr) {
    level += 1;
  } else if(level > levelCrr) {
    level -= 1;
  }
}

bool sent(void *) {
  String  data = "{";
          data += "\"kelengasan_1\":";
          data += tanah[0];
          data += ",\"kelengasan_2\":";
          data += tanah[1];
          data += ",\"kelengasan_3\":";
          data += tanah[2];
          data += ",\"suhu\":";
          data += temp;
          data += ",\"kelembapan\":";
          data += humi;
          data += ",\"cahaya\":";
          data += lumen;
          data += ",\"air\":";
          data += level;
          data += "}";

  Serial.println(data.c_str());
  // ESP.println(data.c_str());

  // Serial.println("Sent");

  return true;
}

bool collecting(void *) {
  for(int i = 0;i< 3; i++) {
    tanahRaw[i] = analogRead(pinTanah[i]);
    tanah[i] = map(tanahRaw[i], 0, 1024, 0, 100);
  }
  // tanah[0] = 0;

  temp = dht.readTemperature();
  humi = dht.readHumidity();

  int lum = lux.getLux();
  int err = lux.getError();
  if(err == 0) {
    lumen = lum;
  }

  getLevel();

  return true;
}

bool mechanic(void *) {
  for(int i = 0;i < 3; i++){
    if(tanah[i] > thMax[i]) {
      digitalWrite(pinRelay[i], LOW);
    } else if(tanah[i] < thMin[i]) {
      digitalWrite(pinRelay[i], HIGH);
    }
  }

  if(level > thLvl[0]) {
    digitalWrite(pinRelay[3], LOW);
  } else if(level < thLvl[1]) {
    digitalWrite(pinRelay[3], HIGH);
  }

  return true;
}

bool debugMonit(void *) {
  Serial.print("T1: ");
  Serial.print(tanah[0]);
  Serial.print(" T2: ");
  Serial.print(tanah[1]);
  Serial.print(" T3: ");
  Serial.print(tanah[2]);
  Serial.println();

  Serial.print("Temp: ");
  Serial.print(temp);
  Serial.print(" Humi: ");
  Serial.print(humi);
  Serial.print(" Level: ");
  Serial.print(level);
  Serial.print(" Lux: ");
  Serial.print(lumen);
  Serial.println();

  return true;
}

void setup() {
  Serial.begin(9600);
  // ESP.begin(9600);
  dht.begin();

  Wire.begin();
  Wire.setClock(100000);

  delay(1000);
  Serial.println("Mulai");
  pinMode(pinWater[0], OUTPUT);
  pinMode(pinWater[1], INPUT);
  for(int i = 0; i < 3; i++)  {
    pinMode(pinTanah[i], INPUT);
    pinMode(pinRelay[i], OUTPUT);
  }
  pinMode(pinRelay[3], OUTPUT);

  timer.every(50, collecting);
  timer.every(100, mechanic);
  // timer.every(2000, debugMonit);
  timer.every(5000, sent);
}

void loop() {
  timer.tick();
}
