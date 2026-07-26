let sensores = {
    temperatura:34,
    umidadeAr:68,
    umidadeSolo:35,
    luminosidade:"Baixa",
    qualidadeAgua:"Adequada",
    nivelAgua:"Normal",
    composteira:"Pronta"
};

function atualizarCards(){

    document.getElementById("temperatura").innerHTML =
    sensores.temperatura + "°C";

    document.getElementById("umidadeAr").innerHTML =
    sensores.umidadeAr + "°C";

    document.getElementById("umidadeSolo").innerHTML =
    sensores.umidadeSolo + "°C";

    document.getElementById("luminosidade").innerHTML =
    sensores.luminosidade + "°C";

    document.getElementById("qualidadeAgua").innerHTML =
    sensores.qualidadeAgua + "°C";

    document.getElementById("nivelAgua").innerHTML =
    sensores.nivelAgua + "°C";

    document.getElementById("composteira").innerHTML =
    sensores.composteira + "°C";
}
atualizarCards();


function atualizarRecomendacao(){
let mensagem = document.getElementById("mensagem");
mensagem.innerHTML =
"Teste do sistema.";
}

atualizarRecomendacao();