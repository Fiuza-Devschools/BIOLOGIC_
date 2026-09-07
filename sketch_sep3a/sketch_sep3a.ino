#include <DHT.h>
#include <FastLED.h>

// ======================================================
// BIOLOGIC - FIRMWARE V1.0
// Arduino UNO
// ======================================================


// ======================================================
// PINOS
// ======================================================

// -------- Sensores digitais --------

#define DHT_PIN 2
#define DHT_TYPE DHT11

#define LDR_PIN 3


// -------- Fita LED --------

#define LED_PIN 6
#define NUM_LEDS 30

#define LED_TYPE WS2812B
#define COLOR_ORDER GRB
#define BRIGHTNESS 64


// -------- Relés --------

#define RELE_BOMBA 8
#define RELE_COOLER 9


// -------- Sensores analógicos --------

#define SENSOR_SOLO A0
#define SENSOR_PH A1
#define SENSOR_NIVEL A2


// ======================================================
// CONFIGURAÇÕES
// ======================================================

// Muitos módulos de relé são acionados com LOW.
#define RELE_ATIVO_LOW true


// Intervalo entre leituras dos sensores
const unsigned long INTERVALO_LEITURA = 2000;


// Segurança da bomba:
// tempo máximo ligado continuamente
const unsigned long TEMPO_MAX_BOMBA = 10000;


// ======================================================
// OBJETOS
// ======================================================

DHT dht(DHT_PIN, DHT_TYPE);

CRGB leds[NUM_LEDS];


// ======================================================
// ESTADO DO SISTEMA
// ======================================================

bool bombaLigada = false;
bool coolerLigado = false;
bool ledLigado = false;

unsigned long inicioBomba = 0;
unsigned long ultimaLeitura = 0;


// ======================================================
// VARIÁVEIS DOS SENSORES
// ======================================================

float temperatura = 0;
float umidadeAr = 0;

int umidadeSolo = 0;

String luminosidade = "Indefinida";

int valorNivel = 0;
String nivelAgua = "Indefinido";

float valorPH = 0;
String qualidadeAgua = "Indefinida";


// ======================================================
// CONTROLE DOS RELÉS
// ======================================================

void controlarRele(int pino, bool ligado) {

  if (RELE_ATIVO_LOW) {

    digitalWrite(
      pino,
      ligado ? LOW : HIGH
    );

  } else {

    digitalWrite(
      pino,
      ligado ? HIGH : LOW
    );
  }
}


// ======================================================
// BOMBA
// ======================================================

void ligarBomba() {

  bombaLigada = true;

  inicioBomba = millis();

  controlarRele(
    RELE_BOMBA,
    true
  );
}


void desligarBomba() {

  bombaLigada = false;

  controlarRele(
    RELE_BOMBA,
    false
  );
}


// ======================================================
// COOLER
// ======================================================

void ligarCooler() {

  coolerLigado = true;

  controlarRele(
    RELE_COOLER,
    true
  );
}


void desligarCooler() {

  coolerLigado = false;

  controlarRele(
    RELE_COOLER,
    false
  );
}


// ======================================================
// LED
// ======================================================

void ligarLED() {

  ledLigado = true;

  fill_solid(
    leds,
    NUM_LEDS,
    CRGB::White
  );

  FastLED.show();
}


void desligarLED() {

  ledLigado = false;

  FastLED.clear();

  FastLED.show();
}


// ======================================================
// UMIDADE DO SOLO
// ======================================================

void lerUmidadeSolo() {

  int valor = analogRead(SENSOR_SOLO);

  /*
    Sensor resistivo:

    valor alto  = solo seco
    valor baixo = solo úmido

    Conversão provisória para porcentagem.
  */

  umidadeSolo = map(
    valor,
    1023,
    0,
    0,
    100
  );

  umidadeSolo = constrain(
    umidadeSolo,
    0,
    100
  );
}


// ======================================================
// LDR
// ======================================================

void lerLuminosidade() {

  int estado = digitalRead(LDR_PIN);

  if (estado == LOW) {

    luminosidade = "Alta";

  } else {

    luminosidade = "Baixa";
  }
}


// ======================================================
// NÍVEL DA ÁGUA
// ======================================================

void lerNivelAgua() {

  valorNivel = analogRead(SENSOR_NIVEL);


  if (valorNivel < 100) {

    nivelAgua = "Baixo";

  }

  else if (valorNivel <= 299) {

    nivelAgua = "Medio";

  }

  else {

    nivelAgua = "Normal";
  }
}


// ======================================================
// pH
// ======================================================

void lerPH() {

  int soma = 0;

  const int AMOSTRAS = 20;


  for (int i = 0; i < AMOSTRAS; i++) {

    soma += analogRead(SENSOR_PH);

    delay(10);
  }


  float media =
    (float)soma / AMOSTRAS;


  float tensao =
    media * (5.0 / 1023.0);


  /*
    CALIBRAÇÃO PROVISÓRIA

    Esses valores devem ser substituídos
    quando a calibração definitiva do módulo
    for concluída.
  */

  const float TENSAO_PH7 = 2.99;

  const float INCLINACAO = 3.50;


  valorPH =
    7.0 +
    ((TENSAO_PH7 - tensao) * INCLINACAO);


  valorPH = constrain(
    valorPH,
    0.0,
    14.0
  );


  // Classificação provisória

  if (valorPH >= 6.0 && valorPH <= 8.0) {

    qualidadeAgua = "Adequada";

  } else {

    qualidadeAgua = "Ruim";
  }
}


// ======================================================
// DHT11
// ======================================================

void lerDHT() {

  float novaTemperatura =
    dht.readTemperature();

  float novaUmidade =
    dht.readHumidity();


  if (!isnan(novaTemperatura)) {

    temperatura = novaTemperatura;
  }


  if (!isnan(novaUmidade)) {

    umidadeAr = novaUmidade;
  }
}


// ======================================================
// LEITURA GERAL DOS SENSORES
// ======================================================

void atualizarSensores() {

  lerDHT();

  lerUmidadeSolo();

  lerLuminosidade();

  lerNivelAgua();

  lerPH();
}


// ======================================================
// ENVIO DOS DADOS PARA O DASHBOARD
// ======================================================

void enviarDados() {

  Serial.print("{");


  Serial.print("\"temperatura\":");
  Serial.print(temperatura, 1);


  Serial.print(",\"umidadeAr\":");
  Serial.print(umidadeAr, 1);


  Serial.print(",\"umidadeSolo\":");
  Serial.print(umidadeSolo);


  Serial.print(",\"luminosidade\":\"");
  Serial.print(luminosidade);
  Serial.print("\"");


  Serial.print(",\"ph\":");
  Serial.print(valorPH, 2);


  Serial.print(",\"qualidadeAgua\":\"");
  Serial.print(qualidadeAgua);
  Serial.print("\"");


  Serial.print(",\"nivelAgua\":\"");
  Serial.print(nivelAgua);
  Serial.print("\"");


  Serial.print(",\"bomba\":");
  Serial.print(bombaLigada ? "true" : "false");


  Serial.print(",\"cooler\":");
  Serial.print(coolerLigado ? "true" : "false");


  Serial.print(",\"led\":");
  Serial.print(ledLigado ? "true" : "false");


  Serial.println("}");
}


// ======================================================
// RECEBIMENTO DE COMANDOS
// ======================================================

void receberComando() {

  if (!Serial.available()) {
    return;
  }


  String comando =
    Serial.readStringUntil('\n');


  comando.trim();


  // ------------------------------
  // BOMBA
  // ------------------------------

  if (comando == "BOMBA_ON") {

    ligarBomba();
  }


  else if (comando == "BOMBA_OFF") {

    desligarBomba();
  }


  // ------------------------------
  // COOLER
  // ------------------------------

  else if (comando == "COOLER_ON") {

    ligarCooler();
  }


  else if (comando == "COOLER_OFF") {

    desligarCooler();
  }


  // ------------------------------
  // LED
  // ------------------------------

  else if (comando == "LED_ON") {

    ligarLED();
  }


  else if (comando == "LED_OFF") {

    desligarLED();
  }
}


// ======================================================
// SEGURANÇA DA BOMBA
// ======================================================

void verificarSegurancaBomba() {

  if (bombaLigada) {

    if (
      millis() - inicioBomba >=
      TEMPO_MAX_BOMBA
    ) {

      desligarBomba();

      // Não enviamos texto extra para não
      // quebrar o formato JSON.
    }
  }
}


// ======================================================
// SETUP
// ======================================================

void setup() {

  Serial.begin(9600);


  // DHT
  dht.begin();


  // LDR
  pinMode(
    LDR_PIN,
    INPUT
  );


  // Relés
  pinMode(
    RELE_BOMBA,
    OUTPUT
  );

  pinMode(
    RELE_COOLER,
    OUTPUT
  );


  // Começar com tudo desligado

  desligarBomba();

  desligarCooler();


  // Fita LED

  FastLED.addLeds<
    LED_TYPE,
    LED_PIN,
    COLOR_ORDER
  >(
    leds,
    NUM_LEDS
  ).setCorrection(
    TypicalLEDStrip
  );


  FastLED.setBrightness(
    BRIGHTNESS
  );


  desligarLED();


  // Primeira leitura

  atualizarSensores();

  enviarDados();
}


// ======================================================
// LOOP
// ======================================================

void loop() {

  // Verifica comandos vindos do computador
  receberComando();


  // Segurança da bomba
  verificarSegurancaBomba();


  // Atualização dos sensores

  if (
    millis() - ultimaLeitura >=
    INTERVALO_LEITURA
  ) {

    ultimaLeitura = millis();

    atualizarSensores();

    enviarDados();
  }
}