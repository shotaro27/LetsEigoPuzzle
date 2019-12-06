#include <IRremote.h>

IRrecv irrecv(11);
IRsend irsend;
decode_results results;

#define LCD_CS A3
#define LCD_CD A2
#define LCD_WR A1
#define LCD_RD A0

#define LCD_RESET A4

#define BLACK   0x0000
#define BLUE    0x001F
#define RED     0xF800
#define GREEN   0x07E0
#define CYAN    0x07FF
#define MAGENTA 0xF81F
#define YELLOW  0xFFE0
#define WHITE   0xFFFF
unsigned int COLORS[] = {RED, BLUE, GREEN, CYAN, MAGENTA, YELLOW, BLACK};

#define SCL_PIN  5
#define SCL_PORT PORTB
#define SDA_PIN  4
#define SDA_PORT PORTB
#include <SoftWire.h>
#define ADDRESS 0x50
SoftWire Wire = SoftWire();
int idx[] = {0, 849, 1638, 2387, 3264, 3793, 4322, 5239, 6206, 6735, 7398, 8373, 8902, 10731, 12006, 12935, 13620, 14659, 15538, 16261, 16790, 17783, 18712, 20427, 21308, 22067, 22596};

#include <MCUFRIEND_kbv.h>
MCUFRIEND_kbv tft;

void setup() {
  Serial.begin(115200);
  irrecv.enableIRIn();
#ifdef __AVR_ATmega328P__
  Serial.println("HALO");
#endif
  Wire.begin();
  Serial.println(F("TFT LCD test"));
  //ディスプレイ初期化
  tft.reset();

  uint16_t identifier = tft.readID();
  if (identifier == 0x9325) {
    Serial.println(F("Found ILI9325 LCD driver"));
  } else if (identifier == 0x9328) {
    Serial.println(F("Found ILI9328 LCD driver"));
  } else if (identifier == 0x4535) {
    Serial.println(F("Found LGDP4535 LCD driver"));
  } else if (identifier == 0x7575) {
    Serial.println(F("Found HX8347G LCD driver"));
  } else if (identifier == 0x9341) {
    Serial.println(F("Found ILI9341 LCD driver"));
  } else if (identifier == 0x7783) {
    Serial.println(F("Found ST7781 LCD driver"));
  } else if (identifier == 0x8230) {
    Serial.println(F("Found UC8230 LCD driver"));
  }
  else if (identifier == 0x8357) {
    Serial.println(F("Found HX8357D LCD driver"));
  } else if (identifier == 0x0101)
  {
    identifier = 0x9341;
    Serial.println(F("Found 0x9341 LCD driver"));
  } else if (identifier == 0x9481)
  {
    Serial.println(F("Found 0x9481 LCD driver"));
  }
  else if (identifier == 0x9486)
  {
    Serial.println(F("Found 0x9486 LCD driver"));
  }
  else {
    Serial.print(F("Unknown LCD driver chip: "));
    Serial.println(identifier, HEX);
    Serial.println(F("If using the Adafruit 2.8\" TFT Arduino shield, the line:"));
    Serial.println(F("  #define USE_ADAFRUIT_SHIELD_PINOUT"));
    Serial.println(F("should appear in the library header (Adafruit_TFT.h)."));
    Serial.println(F("If using the breakout board, it should NOT be #defined!"));
    Serial.println(F("Also if using the breakout, double-check that all wiring"));
    Serial.println(F("matches the tutorial."));
    identifier = 0x9486;

  }
  tft.begin(identifier);
  tft.fillScreen(BLUE);
  Serial.print("TFT size is "); Serial.print(tft.width()); Serial.print("x"); Serial.println(tft.height());
}

char code, sir;
bool isrepeat = false;
byte col;
void loop() {
  if (irrecv.decode(&results)) {
    if (results.decode_type == SONY) {
      code = results.value;
      if (code == '?') {
        delay(40);
        irsend.sendSony(sir, 12);
        irrecv.enableIRIn();
        irrecv.resume();
      } else if (code == '=') {
        for (int i = 0; i < 5; i++) {
          delay(40);
          irsend.sendSony('=', 12);
          irrecv.enableIRIn();
          irrecv.resume();
        }
        if (isrepeat) {
          isrepeat = false;
          displayed(sir, col);
        }
      } else if (code >= '!' && code <= ';') {
        Serial.print("Read: ");
        Serial.println(code);
        col = 0;
        sir = code;
        isrepeat = true;
        delay(40);
        irsend.sendSony(sir, 12);
        irrecv.enableIRIn();
        irrecv.resume();
      } else if (code >= 'A' && code <= '[') {
        Serial.print("Read: ");
        Serial.println(code);
        col = 1;
        sir = code;
        isrepeat = true;
        delay(40);
        irsend.sendSony(sir, 12);
        irrecv.enableIRIn();
        irrecv.resume();
      } else if (code >= 'a' && code <= '{') {
        Serial.print("Read: ");
        Serial.println(code);
        col = 2;
        sir = code;
        isrepeat = true;
        delay(40);
        irsend.sendSony(sir, 12);
        irrecv.enableIRIn();
        irrecv.resume();
      }
    }
    irrecv.resume();
  }
}

byte readbyte(unsigned long address)  {
  //  Serial.print("１");
  uint8_t   dddr = (uint8_t)ADDRESS | (uint8_t)(address >> 16);
  uint16_t  addr = address & 0xFFFF;
  byte data = 0xFF;
  Wire.beginTransmission(dddr);
  Wire.write((byte)(addr >> 8));
  Wire.write((byte)(addr & 0xFF));
  Wire.endTransmission();
  Wire.requestFrom(dddr, (uint8_t)1);
  data = Wire.read();
  return data;
}

word read2byte(unsigned long addr) {
  return readbyte(addr) + (readbyte(addr + 1) << 8);
}

word readData(byte index, int offset) {
  byte ad = index - 65;
  return read2byte((unsigned long)idx[ad] * 2 + offset * 2);
}

void displayed(byte data, byte color) {
  tft.fillScreen(COLORS[color]);
  int index = 0;
  unsigned int t = 0;
  bool c = false;
  unsigned int data2byte = readData(data + 32 - (color * 32), index);
  Serial.print(data2byte);
  for (int i = 0; i < 480; i++) {
    for (int j = 0; j < 320; j++) {
      //Serial.print(t);
      t++;
      if (c) {
        tft.drawFastHLine(320 - j - data2byte, i, data2byte, WHITE);
        j += data2byte - 1;
        t = data2byte;
      }
      if (t == data2byte) {
        index++;
        c = !c;
        t = 0;
        data2byte = readData(data + 32 - (color * 32), index);
      }
    }
  }
}
