#include <IRremote.h>
#include "Adafruit_MCP23017.h"

Adafruit_MCP23017 mcp;
IRrecv irrecv(11);
IRsend irsend;
decode_results results;

void setup() {
  Serial.begin(115200);
  irrecv.enableIRIn();
  irrecv.blink13(true);
  //  #ifdef __AVR_ATmega328P__
  //  Serial.println("HALO");
  //  #endif
  mcp.begin(0);
  /*
     7   12 15
     4   11 14
     5   10 13
     6   8  3
     0 1 9  2
  */
  mcp.pinMode(0, OUTPUT);
  mcp.pinMode(1, OUTPUT);
  mcp.pinMode(2, OUTPUT);
  mcp.pinMode(3, OUTPUT);
  mcp.pinMode(4, OUTPUT);
  mcp.pinMode(5, OUTPUT);
  mcp.pinMode(6, OUTPUT);
  mcp.pinMode(7, OUTPUT);
  mcp.pinMode(8, OUTPUT);
  mcp.pinMode(9, OUTPUT);
  mcp.pinMode(10, OUTPUT);
  mcp.pinMode(11, OUTPUT);
  mcp.pinMode(12, OUTPUT);
  mcp.pinMode(13, OUTPUT);
  mcp.pinMode(14, OUTPUT);
  mcp.pinMode(15, OUTPUT);
  mcp.digitalWrite(0, LOW);
  mcp.digitalWrite(1, LOW);
  mcp.digitalWrite(2, LOW);
  mcp.digitalWrite(3, LOW);
  mcp.digitalWrite(4, LOW);
  mcp.digitalWrite(5, LOW);
  mcp.digitalWrite(6, LOW);
  mcp.digitalWrite(7, LOW);
  mcp.digitalWrite(8, LOW);
  mcp.digitalWrite(9, LOW);
  mcp.digitalWrite(10, LOW);
  mcp.digitalWrite(11, LOW);
  mcp.digitalWrite(12, LOW);
  mcp.digitalWrite(13, LOW);
  mcp.digitalWrite(14, LOW);
  mcp.digitalWrite(15, LOW);
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(12, INPUT);
  pinMode(9, OUTPUT);
  //Serial.write("serial test");
}

char rser[4] = {0, 0, 0, 0};
char sir;
bool isrepeat = false;
bool s = true;
bool s2 = true;
bool s3 = true;
int portno;
bool iswrite = false;

void loop() {
  rser[0] = Serial.read();
  if (rser[0] == 0x72) {
    rser[1] = Serial.read();
    rser[2] = Serial.read();
    portno = ((int)rser[1] - 48) * 10 + ((int)rser[2] - 48);
    stateRead(portno);
  } else if (rser[0] == 0x77) {
    rser[1] = Serial.read();
    rser[2] = Serial.read();
    rser[3] = Serial.read();
    for (int p = 0; p < 16; p++) {
      mcp.digitalWrite(p, LOW);
    }
    portno = ((int)rser[1] - 48) * 10 + ((int)rser[2] - 48);
    mcp.digitalWrite(portno, HIGH);
    sir = rser[3];
    iswrite = true;
    stateWrite(portno, sir);
  }
  if (digitalRead(2) == LOW) {
    delay(1);
    if (digitalRead(2) == LOW && s) {
      digitalWrite(4, HIGH);
      Serial.print('a');
      s = false;
    }
  } else {
    delay(1);
    if (digitalRead(2) == HIGH && (!s)) {
      digitalWrite(4, LOW);
      Serial.print('b');
      s = true;
    }
  }
  if (digitalRead(3) == LOW) {
    delay(1);
    if (digitalRead(3) == LOW && s2) {
      digitalWrite(5, HIGH);
      Serial.print('c');
      s2 = false;
    }
  } else {
    delay(1);
    if (digitalRead(3) == HIGH && (!s2)) {
      digitalWrite(5, LOW);
      Serial.print('d');
      s2 = true;
    }
  }
  if (digitalRead(12) == LOW) {
    delay(1);
    if (digitalRead(12) == LOW && s3) {
      digitalWrite(9, HIGH);
      Serial.print('e');
      s3 = false;
    }
  } else {
    delay(1);
    if (digitalRead(12) == HIGH && (!s3)) {
      digitalWrite(9, LOW);
      Serial.print('f');
      s3 = true;
    }
  }
}
bool timeout;
long nowtime;
long outtime = 0;
char stateRead (int puzzleport) {
  for (int p = 0; p < 16; p++) {
    mcp.digitalWrite(p, LOW);
  }
  mcp.digitalWrite(puzzleport + 8, HIGH);
  delay(40);
  irsend.sendSony('?', 12);
  irrecv.enableIRIn();
  irrecv.blink13(true);
  timeout = true;
  nowtime = millis();
  while ((!(irrecv.decode(&results)) || results.decode_type != SONY) && timeout) {
    if (Serial.available() > 0) {
      return;
    }
    if (millis() - nowtime > 200) {
      timeout = false;
      delay(10);
      stateRead(puzzleport);
      return;
    }
  }
  Serial.print((char)(results.value % 32 + 64));
  irrecv.resume();
}
void stateWrite (int puzzleport, char code) {
  for (int p = 0; p < 16; p++) {
    mcp.digitalWrite(p, LOW);
  }
  mcp.digitalWrite(puzzleport + 8, HIGH);
  delay(40);
  irsend.sendSony(code, 12);
  irrecv.enableIRIn();
  irrecv.blink13(true);
  timeout = true;
  nowtime = millis();
  while ((!(irrecv.decode(&results)) || results.decode_type != SONY) && timeout) {
    if (Serial.available() > 0) {
      Serial.print('1');
      return;
    }
    if (millis() - nowtime > 200) {
      timeout = false;
      delay(10);
      outtime++;
      if (outtime == 5) {
        Serial.print('2');
        return;
      }
      stateWrite(puzzleport, code);
      return;
    }
  }
  outtime = 0;
  if (results.value == code) {
    if (code != '=') {
      stateWrite(puzzleport, '=');
    } else {
      if (iswrite) {
        Serial.print('=');
        iswrite = false;
      }
    }
  } else {
    stateWrite(puzzleport, code);
  }
}
