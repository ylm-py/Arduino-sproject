 
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

 
#define SS_PIN 10
#define RST_PIN 9
const int buzzer = 5;
const int ledPinGreen = 7;
const int ledPinRed = 6;
int pos = 0;
Servo myservo;
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

 
void setup() 
{
  
  pinMode(ledPinRed,OUTPUT);
  pinMode(ledPinGreen,OUTPUT);
  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
//  Serial.println("Approximate your card to the reader...");
//  Serial.println();

}
//card 1 : E9163CE9
//card 2 : 23CC2099
//tag 1 : 8905DB3
void loop() 
{
  
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  //Show UID on serial monitor
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
//     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
//     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  content.toUpperCase();
//  Serial.print(content);
// A for loop could be a better approach and storing all allowed UIDs inside an array
  if(content == "23CC2099" || content == "53842794"){ //add allowed cards here
    tone(buzzer, 1000); // Send 1KHz sound signal...
    digitalWrite(ledPinGreen,HIGH);
    delay(500);        // ...for 1 sec
    noTone(buzzer);     // Stop sound...
    digitalWrite(ledPinGreen,LOW);
    delay(500);        // ...for 1sec
    
    
  }
  else{
    tone(buzzer, 200); // Send 1KHz sound signal...
    digitalWrite(ledPinRed,HIGH);
    delay(500);        // ...for 1 sec
    digitalWrite(ledPinRed,LOW);
    noTone(buzzer);     // Stop sound...
  }
  content = "";
  
  
  delay(800);
} 
