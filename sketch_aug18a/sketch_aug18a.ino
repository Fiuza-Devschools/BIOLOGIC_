#include <DHT.h>
#include <FastLED.h>

// =====================================================
// BIOLOGIC - CÓDIGO GERAL BASE
// =====================================================


// =====================================================
// PINOS
// =====================================================

// DHT11
#define DHTPIN 2
#define DHTTYPE DHT11

// LDR
#define LDR_PIN 3

// Fita LED
#define LED_PIN 6
#define NUM_LEDS 30

// Relés
#define RELE_BOMBA 8
#define RELE_COOLER 9

// Sensores analógicos
#define SENSOR_SOLO A0
#define SENSOR_PH A1
#define SENSOR_NIVEL A2


// =====================================================
// CONFIGURAÇÕES
// =====================================================

// Relé geralmente é acionado com LOW.
// Se o seu módulo funcionar ao contrário,
// alteraremos para false.
#define RELE_ATIVO_LOW true

// LED
#define LED_TYPE WS2812B
#define COLOR_ORDER GRB
#define BRIGHTNESS 64


// =====================================================
// OBJETOS
// =====================================================

DHT dht(DHTPIN, DHTTYPE);

CRGB leds[NUM_LEDS];


// =====================================================
// ESTADO DOS ATUADORES
// =====================================================

bool bombaLigada = false;
bool coolerLigado = false;


// =====================================================
// FUNÇÃO PARA CONTROLAR RELÉ
// =====================================================

void controlarRele(int pino, bool ligado) {

  if (RELE_ATIVO_LOW) {
    digitalWrite(pino, ligado ? LOW : HIGH);
  } 
  else {
    digitalWrite(pino, ligado ? HIGH : LOW);
  }
}


// =====================================================
// CONFIGURAÇÃO
// =====================================================

void setup() {

  Serial.begin(9600);

  // Sensores
  dht.begin();

  pinMode(LDR_PIN, INPUT);

  // Relés
  pinMode(RELE_BOMBA, OUTPUT);
  pinMode(RELE_COOLER, OUTPUT);

  // Garante que os relés iniciem desligados
  controlarRele(RELE_BOMBA, false);
  controlarRele(RELE_COOLER, false);

  // Fita LED
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(
    leds,
    NUM_LEDS
  ).setCorrection(TypicalLEDStrip);

  FastLED.setBrightness(BRIGHTNESS);

  FastLED.clear();
  FastLED.show();

  Serial.println("BIOLOGIC iniciado.");
}


// =====================================================
// LEITURA DO SENSOR DE SOLO
// =====================================================

int lerUmidadeSolo() {

  int valor = analogRead(SENSOR_SOLO);

  // Sensor resistivo:
  // valor alto = seco
  // valor baixo = úmido

  int porcentagem = map(
    valor,
    1023,
    0,
    0,
    100
  );

  porcentagem = constrain(
    porcentagem,
    0,
    100
  );

  return porcentagem;
}


// =====================================================
// LEITURA DO SENSOR DE NÍVEL
// =====================================================

String lerNivelAgua() {

  int valor = analogRead(SENSOR_NIVEL);

  if (valor < 100) {
    return "Baixo";
  }

  else if (valor <= 299) {
    return "Medio";
  }

  else {
    return "Normal";
  }
}


// =====================================================
// LEITURA DO LDR
// =====================================================

String lerLuminosidade() {

  int estado = digitalRead(LDR_PIN);

  if (estado == LOW) {
    return "Alta";
  }

  else {
    return "Baixa";
  }
}


// =====================================================
// LEITURA DO PH
// =====================================================

float lerPH() {

  int somaLeituras = 0;
  int totalAmostras = 20;

  for (int i = 0; i < totalAmostras; i++) {

    somaLeituras += analogRead(SENSOR_PH);

    delay(10);
  }

  float media =
    (float)somaLeituras / totalAmostras;

  float tensao =
    media * (5.0 / 1023.0);


  // Calibração atual provisória
  const float TENSAO_PH7 = 2.99;
  const float INCLINACAO = 3.50;


  float ph =
    7.0 +
    ((TENSAO_PH7 - tensao) * INCLINACAO);


  ph = constrain(
    ph,
    0.0,
    14.0
  );

  return ph;
}


// =====================================================
// CLASSIFICAÇÃO DA QUALIDADE DA ÁGUA
// =====================================================

String classificarAgua(float ph) {

  // Faixa provisória.
  // Depois podemos ajustar de acordo com
  // o objetivo do BIOLOGIC.

  if (ph >= 6.0 && ph <= 8.0) {
    return "Adequada";
  }

  else {
    return "Ruim";
  }
}


// =====================================================
// ENVIO DOS DADOS
// =====================================================

void enviarDados() {

  float temperatura =
    dht.readTemperature();

  float umidadeAr =
    dht.readHumidity();

  int umidadeSolo =
    lerUmidadeSolo();

  String luminosidade =
    lerLuminosidade();

  String nivelAgua =
    lerNivelAgua();

  float ph =
    lerPH();

  String qualidadeAgua =
    classificarAgua(ph);


  // Verificação do DHT
  if (isnan(temperatura) || isnan(umidadeAr)) {

    temperatura = -1;
    umidadeAr = -1;
  }


  // JSON
  Serial.print("{");

  Serial.print("\"temperatura\":");
  Serial.print(temperatura);

  Serial.print(",\"umidadeAr\":");
  Serial.print(umidadeAr);

  Serial.print(",\"umidadeSolo\":");
  Serial.print(umidadeSolo);

  Serial.print(",\"luminosidade\":\"");
  Serial.print(luminosidade);
  Serial.print("\"");

  Serial.print(",\"qualidadeAgua\":\"");
  Serial.print(qualidadeAgua);
  Serial.print("\"");

  Serial.print(",\"nivelAgua\":\"");
  Serial.print(nivelAgua);
  Serial.print("\"");

  Serial.print(",\"ph\":");
  Serial.print(ph, 2);

  Serial.print(",\"bomba\":");
  Serial.print(bombaLigada ? "true" : "false");

  Serial.print(",\"cooler\":");
  Serial.print(coolerLigado ? "true" : "false");

  Serial.println("}");
}


// =====================================================
// RECEBIMENTO DE COMANDOS
// =====================================================

void receberComando() {

  if (Serial.available()) {

    String comando =
      Serial.readStringUntil('\n');

    comando.trim();


    // -----------------------------
    // BOMBA
    // -----------------------------

    if (comando == "BOMBA_ON") {

      bombaLigada = true;

      controlarRele(
        RELE_BOMBA,
        true
      );
    }


    else if (comando == "BOMBA_OFF") {

      bombaLigada = false;

      controlarRele(
        RELE_BOMBA,
        false
      );
    }


    // -----------------------------
    // COOLER
    // -----------------------------

    else if (comando == "COOLER_ON") {

      coolerLigado = true;

      controlarRele(
        RELE_COOLER,
        true
      );
    }


    else if (comando == "COOLER_OFF") {

      coolerLigado = false;

      controlarRele(
        RELE_COOLER,
        false
      );
    }
  }
}


// =====================================================
// LOOP PRINCIPAL
// =====================================================

unsigned long ultimaLeitura = 0;

const unsigned long intervaloLeitura = 2000;


void loop() {

  // Verifica comandos do dashboard
  receberComando();


  // Envia sensores a cada 2 segundos
  if (
    millis() - ultimaLeitura >=
    intervaloLeitura
  ) {

    ultimaLeitura = millis();

    enviarDados();
  }
}