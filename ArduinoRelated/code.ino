 
#include <SPI.h>
#include <MFRC522.h>
 
#define SS_PIN 10
#define RST_PIN 9
const int buzzer = 6;
const int ledPin = 7;
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

 
void setup() 
{
  pinMode(ledPin,OUTPUT);
  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
//  Serial.println("Approximate your card to the reader...");
//  Serial.println();

}
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
  if(content == "23CC2099" || content == "53842794"){
    tone(buzzer, 1000); // Send 1KHz sound signal...
    digitalWrite(ledPin,HIGH);
    delay(500);        // ...for 1 sec
    noTone(buzzer);     // Stop sound...
    digitalWrite(ledPin,LOW);
    delay(500);        // ...for 1sec
    
    content = "";
  }
  else{
    tone(buzzer, 200); // Send 1KHz sound signal...
    delay(500);        // ...for 1 sec
    noTone(buzzer);     // Stop sound...
  }
  
  
  delay(800);
} 
