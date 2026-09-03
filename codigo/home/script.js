// ======================================================
// 🌱 BIOLOGIC - DASHBOARD
// Comunicação Arduino ↔ Dashboard via USB/Serial
// ======================================================


// ======================================================
// 📊 DADOS DOS SENSORES
// ======================================================

let sensores = {
    temperatura: 0,
    umidadeAr: 0,
    umidadeSolo: 0,
    luminosidade: "Desconhecida",
    qualidadeAgua: "Desconhecida",
    nivelAgua: "Desconhecido",
    composteira: "Em decomposição"
};


// ======================================================
// 🔌 COMUNICAÇÃO SERIAL
// ======================================================

let portaSerial = null;
let leitorSerial = null;
let textoRecebido = "";


// ======================================================
// 🚀 INICIALIZAÇÃO
// ======================================================

function atualizarDashboard() {
    atualizarCards();
    atualizarRecomendacao();
}


// ======================================================
// 📱 ATUALIZAÇÃO DOS CARDS
// ======================================================

function atualizarCards() {

    document.getElementById("temperatura").innerHTML =
        sensores.temperatura + "°C";

    document.getElementById("umidadeAr").innerHTML =
        sensores.umidadeAr + "%";

    document.getElementById("umidadeSolo").innerHTML =
        sensores.umidadeSolo + "%";

    document.getElementById("luminosidade").innerHTML =
        sensores.luminosidade;

    document.getElementById("qualidadeAgua").innerHTML =
        sensores.qualidadeAgua;

    document.getElementById("nivelAgua").innerHTML =
        sensores.nivelAgua;

    document.getElementById("composteira").innerHTML =
        sensores.composteira;
}


// ======================================================
// 📢 SISTEMA DE RECOMENDAÇÕES
// ======================================================

let acaoAtual = null;


function atualizarRecomendacao() {

    let mensagem = document.getElementById("mensagem");

    acaoAtual = null;


    // 🌱 SOLO SECO
    if (sensores.umidadeSolo < 35) {

        mensagem.innerHTML =
            "🌱 Solo seco. Deseja irrigar agora?";

        acaoAtual = "PUMP_ON";
    }


    // 🌡️ TEMPERATURA ALTA
    else if (sensores.temperatura > 32) {

        mensagem.innerHTML =
            "🌡️ Temperatura elevada. Deseja ligar a ventoinha?";

        acaoAtual = "COOLER_ON";
    }


    // ☀️ POUCA LUMINOSIDADE
    else if (sensores.luminosidade === "Baixa") {

        mensagem.innerHTML =
            "☀️ Pouca luz. Deseja ligar o LED?";

        acaoAtual = "LED_ON";
    }


    // 🚰 ÁGUA RUIM
    else if (sensores.qualidadeAgua === "Ruim") {

        mensagem.innerHTML =
            "🚰 Qualidade da água inadequada. Verifique o reservatório.";
    }


    // 💧 NÍVEL BAIXO
    else if (sensores.nivelAgua === "Baixo") {

        mensagem.innerHTML =
            "💧 Nível da água baixo. Reabasteça o reservatório.";
    }


    // ♻️ COMPOSTEIRA
    else if (sensores.composteira === "Pronta") {

        mensagem.innerHTML =
            "♻️ O adubo está pronto. Deseja ver como aplicá-lo?";
    }


    // ✅ TUDO NORMAL
    else {

        mensagem.innerHTML =
            "🌱 Nenhuma recomendação no momento.";
    }
}


// ======================================================
// 🔌 CONEXÃO COM O ARDUINO
// ======================================================

async function conectarArduino() {

    if (!("serial" in navigator)) {

        alert(
            "Seu navegador não suporta comunicação Serial.\n" +
            "Use uma versão atualizada do Google Chrome ou Microsoft Edge."
        );

        return;
    }


    try {

        // Solicita ao usuário a porta do Arduino
        portaSerial = await navigator.serial.requestPort();

        // Abre a comunicação
        await portaSerial.open({
            baudRate: 9600
        });

        console.log("✅ Arduino conectado!");

        lerSerial();

    } catch (erro) {

        console.error("Erro ao conectar ao Arduino:", erro);

    }
}


// ======================================================
// 📥 RECEBER DADOS DO ARDUINO
// ======================================================

async function lerSerial() {

    const decoder = new TextDecoderStream();

    const entrada = portaSerial.readable.pipeTo(
        decoder.writable
    );

    leitorSerial = decoder.readable.getReader();


    try {

        while (true) {

            const { value, done } =
                await leitorSerial.read();

            if (done) {
                break;
            }

            if (value) {

                textoRecebido += value;

                let linhas =
                    textoRecebido.split("\n");

                textoRecebido =
                    linhas.pop();


                for (let linha of linhas) {

                    linha = linha.trim();

                    if (linha.length > 0) {

                        processarDadosArduino(linha);
                    }
                }
            }
        }

    } catch (erro) {

        console.error(
            "Erro na leitura serial:",
            erro
        );
    }
}


// ======================================================
// 🧠 PROCESSAR JSON RECEBIDO
// ======================================================

function processarDadosArduino(linha) {

    try {

        let dados = JSON.parse(linha);

        console.log(
            "📡 Dados recebidos:",
            dados
        );


        // Atualiza somente os dados enviados
        Object.assign(
            sensores,
            dados
        );


        atualizarDashboard();


    } catch (erro) {

        console.warn(
            "Linha recebida não é um JSON válido:",
            linha
        );
    }
}


// ======================================================
// 📤 ENVIAR COMANDO PARA O ARDUINO
// ======================================================

async function enviarComando(comando) {

    if (!portaSerial) {

        alert(
            "Arduino não conectado."
        );

        return;
    }


    try {

        const encoder =
            new TextEncoder();

        const escritor =
            portaSerial.writable.getWriter();


        await escritor.write(
            encoder.encode(comando + "\n")
        );


        escritor.releaseLock();


        console.log(
            "📤 Comando enviado:",
            comando
        );


    } catch (erro) {

        console.error(
            "Erro ao enviar comando:",
            erro
        );
    }
}


// ======================================================
// ▶️ BOTÃO "FAZER ISSO AGORA"
// ======================================================

document
    .querySelector(".btn-verde")
    .addEventListener("click", function () {

        if (acaoAtual) {

            enviarComando(
                acaoAtual
            );

            document.getElementById("mensagem").innerHTML =
                "✅ Comando enviado ao sistema.";
        }
    });


// ======================================================
// ⏳ BOTÃO "DEPOIS"
// ======================================================

document
    .querySelector(".btn-branco")
    .addEventListener("click", function () {

        document.getElementById("mensagem").innerHTML =
            "🌱 Ação adiada.";
    });


// ======================================================
// 🔄 ATUALIZAÇÃO INICIAL
// ======================================================

atualizarDashboard();