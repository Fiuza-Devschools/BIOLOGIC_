// ==========================================
// BIOLOGIC - DASHBOARD
// Integração com Arduino via Web Serial
// ==========================================


// ==========================================
// DADOS DOS SENSORES
// ==========================================

let sensores = {
    temperatura: 0,
    umidadeAr: 0,
    umidadeSolo: 0,
    luminosidade: "Desconhecida",
    ph: 0,
    qualidadeAgua: "Desconhecida",
    nivelAgua: "Desconhecido",
    bomba: false,
    cooler: false,
    led: false
};


// ==========================================
// SERIAL
// ==========================================

let portaSerial = null;
let leitorSerial = null;
let escritorSerial = null;
let textoRecebido = "";


// ==========================================
// ATUALIZAÇÃO DO DASHBOARD
// ==========================================

function atualizarDashboard() {

    atualizarCards();

    atualizarRecomendacao();

}


// ==========================================
// ATUALIZAR CARDS
// ==========================================

function atualizarCards() {

    document.getElementById("temperatura").innerText =
        sensores.temperatura + "°C";

    document.getElementById("umidadeAr").innerText =
        sensores.umidadeAr + "%";

    document.getElementById("umidadeSolo").innerText =
        sensores.umidadeSolo + "%";

    document.getElementById("luminosidade").innerText =
        sensores.luminosidade;

    document.getElementById("qualidadeAgua").innerText =
        sensores.qualidadeAgua;

    document.getElementById("nivelAgua").innerText =
        sensores.nivelAgua;

    document.getElementById("composteira").innerText =
        "Adubo Pronto";

}


// ==========================================
// RECOMENDAÇÕES
// ==========================================

function atualizarRecomendacao() {

    const mensagem = document.getElementById("mensagem");
    const botao = document.querySelector(".alerta .btn-verde");

    // -----------------------------
    // SOLO SECO
    // -----------------------------

    if (sensores.umidadeSolo < 35) {

        mensagem.innerText =
            "🌱 O solo está seco e pode precisar de irrigação.";

        botao.style.display = "inline-block";

        botao.innerText = "Fazer isso agora";

        botao.onclick = function () {
            abrirPopup("solo");
        };

    }

    // -----------------------------
    // TEMPERATURA ALTA
    // -----------------------------

    else if (sensores.temperatura > 32) {

        mensagem.innerText =
            "🌡️ A temperatura do ambiente está elevada.";

        botao.style.display = "inline-block";

        botao.innerText = "Fazer isso agora";

        botao.onclick = function () {
            abrirPopup("temperatura");
        };

    }

    // -----------------------------
    // POUCA LUZ
    // -----------------------------

    else if (sensores.luminosidade === "Baixa") {

        mensagem.innerText =
            "☀️ A luminosidade está baixa.";

        botao.style.display = "inline-block";

        botao.innerText = "Fazer isso agora";

        botao.onclick = function () {
            abrirPopup("luz");
        };

    }

    // -----------------------------
    // ÁGUA INADEQUADA
    // -----------------------------

    else if (sensores.qualidadeAgua === "Ruim") {

        mensagem.innerText =
            "🚰 A qualidade da água precisa ser verificada.";

        botao.style.display = "inline-block";

        botao.innerText = "Fazer isso agora";

        botao.onclick = function () {
            abrirPopup("agua");
        };

    }

    // -----------------------------
    // NÍVEL DA ÁGUA BAIXO
    // -----------------------------

    else if (sensores.nivelAgua === "Baixo") {

        mensagem.innerText =
            "💧 O nível do reservatório está baixo.";

        botao.style.display = "inline-block";

        botao.innerText = "Fazer isso agora";

        botao.onclick = function () {
            abrirPopup("nivel");
        };

    }

    // -----------------------------
    // COMPOSTEIRA
    // -----------------------------

    else if (sensores.composteira === "Pronta") {

        mensagem.innerText =
            "♻️ O adubo está pronto para utilização.";

        botao.style.display = "inline-block";

        botao.innerText = "Fazer isso agora";

        botao.onclick = function () {
            abrirPopup("composteira");
        };

    }

    // -----------------------------
    // TUDO NORMAL
    // -----------------------------

    else {

        mensagem.innerText =
            "🌱 Tudo está funcionando normalmente.";

        botao.style.display = "none";

    }

}


// ==========================================
// ABRIR POP-UP
// ==========================================

function abrirPopup(tipo) {

    const popup = document.getElementById("popupRecomendacao");
    const titulo = document.getElementById("popupTitulo");
    const conteudo = document.getElementById("popupConteudo");
    const botao = document.getElementById("popupAcao");


    // ======================================
    // SOLO
    // ======================================

    if (tipo === "solo") {

        titulo.innerText =
            "💧 Deseja irrigar?";

        conteudo.innerHTML = `
            <p>
                A umidade do solo está abaixo do nível recomendado.
            </p>

            <h3>🔎 Antes de irrigar:</h3>

            <ol>
                <li>Verifique se há água suficiente no reservatório.</li>
                <li>Confira se a mangueira está posicionada corretamente.</li>
                <li>Se estiver tudo certo, confirme a irrigação.</li>
            </ol>
        `;

        botao.innerText = "💧 Irrigar agora";

        botao.onclick = function () {
            enviarComando("BOMBA_ON");
            fecharPopup();
        };

    }


    // ======================================
    // TEMPERATURA
    // ======================================

    else if (tipo === "temperatura") {

        titulo.innerText =
            "🌬️ Como reduzir a temperatura?";

        conteudo.innerHTML = `
            <p>
                A temperatura do ambiente está elevada.
            </p>

            <h3>🔎 O que fazer?</h3>

            <ol>
                <li>Verifique se a ventilação da estrutura está livre.</li>
                <li>Ative o cooler para auxiliar na circulação do ar.</li>
                <li>Acompanhe novamente a temperatura pelo dashboard.</li>
            </ol>
        `;

        botao.innerText = "🌬️ Ligar cooler";

        botao.onclick = function () {
            enviarComando("COOLER_ON");
            fecharPopup();
        };

    }


    // ======================================
    // LUZ
    // ======================================

    else if (tipo === "luz") {

        titulo.innerText =
            "💡 Como melhorar a iluminação?";

        conteudo.innerHTML = `
            <p>
                A luminosidade detectada está baixa.
            </p>

            <h3>🔎 O que verificar?</h3>

            <ol>
                <li>Verifique se a estrutura está recebendo luz suficiente.</li>
                <li>Confira se não há algo bloqueando a entrada de luz.</li>
                <li>Se necessário, utilize a iluminação auxiliar.</li>
            </ol>
        `;

        botao.innerText = "💡 Ligar iluminação";

        botao.onclick = function () {
            enviarComando("LED_ON");
            fecharPopup();
        };

    }


    // ======================================
    // QUALIDADE DA ÁGUA
    // ======================================

    else if (tipo === "agua") {

        titulo.innerText =
            "🔎 O que verificar?";

        conteudo.innerHTML = `
            <p>
                🚰 A qualidade da água precisa ser verificada.
            </p>

            <h3>1. Observe a água</h3>

            <p>
                Verifique se há sujeira ou resíduos.
            </p>

            <h3>2. Verifique o reservatório</h3>

            <p>
                Confira se o recipiente está limpo e em boas condições.
            </p>

            <h3>3. Se necessário</h3>

            <p>
                Retire a água, limpe o reservatório e reponha água limpa.
            </p>

            <h3>4. Verifique novamente</h3>

            <p>
                Confira a leitura do sistema após a troca.
            </p>
        `;

        botao.innerText = "✓ Entendi";

        botao.onclick = function () {
            fecharPopup();
        };

    }


    // ======================================
    // NÍVEL DA ÁGUA
    // ======================================

    else if (tipo === "nivel") {

        titulo.innerText =
            "💧 O que fazer?";

        conteudo.innerHTML = `
            <p>
                O nível do reservatório está baixo.
            </p>

            <h3>🔎 Verifique:</h3>

            <ol>
                <li>Confira o nível do reservatório.</li>
                <li>Reabasteça com água adequada.</li>
                <li>Confira se a bomba e a mangueira estão posicionadas corretamente.</li>
                <li>Verifique novamente a leitura do sistema.</li>
            </ol>
        `;

        botao.innerText = "✓ Entendi";

        botao.onclick = function () {
            fecharPopup();
        };

    }


    // ======================================
    // COMPOSTEIRA
    // ======================================

    else if (tipo === "composteira") {

        titulo.innerText =
            "🌱 Como utilizar o adubo?";

        conteudo.innerHTML = `
            <p>
                ♻️ O adubo está pronto para utilização.
            </p>

            <h3>🔎 Recomendações:</h3>

            <ol>
                <li>Retire uma pequena quantidade.</li>
                <li>Misture ao substrato conforme a necessidade da planta.</li>
                <li>Evite colocar excesso diretamente sobre a planta.</li>
                <li>Mantenha o restante armazenado adequadamente.</li>
            </ol>
        `;

        botao.innerText = "✓ Entendi";

        botao.onclick = function () {
            fecharPopup();
        };

    }


    // Mostrar pop-up

    popup.classList.add("ativo");

}


// ==========================================
// FECHAR POP-UP
// ==========================================

function fecharPopup() {

    document
        .getElementById("popupRecomendacao")
        .classList.remove("ativo");

}


// ==========================================
// CONECTAR ARDUINO
// ==========================================

async function conectarArduino() {

    try {

        portaSerial = await navigator.serial.requestPort();

        await portaSerial.open({
            baudRate: 9600
        });

        console.log("Arduino conectado!");

        lerSerial();

    }

    catch (erro) {

        console.error(
            "Erro ao conectar ao Arduino:",
            erro
        );

    }

}


// ==========================================
// LER SERIAL
// ==========================================

async function lerSerial() {

    const decoder = new TextDecoderStream();

    portaSerial.readable.pipeTo(
        decoder.writable
    );

    leitorSerial =
        decoder.readable.getReader();


    while (true) {

        const { value, done } =
            await leitorSerial.read();

        if (done) {
            break;
        }

        textoRecebido += value;

        const linhas =
            textoRecebido.split("\n");

        textoRecebido =
            linhas.pop();


        for (let linha of linhas) {

            linha = linha.trim();

            if (linha === "") {
                continue;
            }


            console.log(
                "Recebido do Arduino:",
                linha
            );


            try {

                const dados =
                    JSON.parse(linha);

                Object.assign(
                    sensores,
                    dados
                );

                atualizarDashboard();

            }

            catch (erro) {

                console.error(
                    "Erro ao interpretar JSON:",
                    erro
                );

            }

        }

    }

}


// ==========================================
// ENVIAR COMANDO PARA ARDUINO
// ==========================================

async function enviarComando(comando) {

    if (!portaSerial) {

        console.error(
            "Arduino não conectado."
        );

        return;
    }


    try {

        const encoder =
            new TextEncoder();

        escritorSerial =
            portaSerial.writable.getWriter();


        await escritorSerial.write(
            encoder.encode(comando + "\n")
        );


        escritorSerial.releaseLock();


        console.log(
            "Comando enviado:",
            comando
        );

    }

    catch (erro) {

        console.error(
            "Erro ao enviar comando:",
            erro
        );

    }

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarDashboard();