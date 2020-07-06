const int interruptPin_Rain = 2;//Spannungsteiler 10K / 220nF Entprellkondensator an D2 (Interrupt-Pin 0)
const int deltaT = 100; // Beobachtungszeit in milis
int ir_Rain = 0; // Speichert, wie oft die Regenwippe kippt (innerhalb einer Beobachtungszeit deltaT)
volatile int newIr_Rain = 0;

void setup() {
  Serial.begin(9600);

  //Interrupts an digitalen Pins 2 und 3 aktivieren (nur an diesen Pins sind Interrupts möglich)
  pinMode(interruptPin_Rain, INPUT);
  digitalWrite(interruptPin_Rain, HIGH);
  

  attachInterrupt(0, count_rain_function, FALLING); // setzen des Interrupts 



  //reagiert auf: ansteigende Flanke: RISING/ abfallede Flanke: FALLING / beides: CHANGE

}  

void loop() {
  // Variable zum Speichern des Registers
  uint8_t oldSREG;

  // alle deltaT Sekunden werden die aktuellen Messungen ausgegeben:

//  Serial.println("-------------------------");
//  Serial.print("Regen ");

  //Sicheres Lesen des Registers für Regenmenge
  oldSREG = SREG;
  cli();
  ir_Rain = newIr_Rain;
  newIr_Rain = 0;
  SREG = oldSREG;

  if (ir_Rain > 0) {// es gab neue Regenmengen seit dem letzten Ausdruck

    //Serial.println(ir_Rain, DEC);

    ir_Rain = 0;
  }

   else {
    //Serial.println(0, DEC);
  }
  
//Interrupt-Funktion zum Zählen der Regenmenge


void setup(){
    attachInterrupt(0, count_rain_function, FALLING); // setzen des Interrupts 
}
//Incrementiert die Menge an Regen
void count_rain_function()
{
  newIr_Rain++;
  Serial.println(newIr_Rain);
}
  
