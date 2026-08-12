let sensores = {
    temperatura:26,
    umidadeAr:68,
    umidadeSolo:40,
    luminosidade:"Alta",
    qualidadeAgua:"Adequada",
    nivelAgua:"Normal",
    composteira:"Em decomposição"
};

function atualizarDashboard(){
    atualizarCards();
    atualizarRecomendacao();
}  

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



function atualizarRecomendacao(){
let mensagem = document.getElementById("mensagem");

// Solo seco
    if(sensores.umidadeSolo < 35){
        mensagem.innerHTML =
        "🌱 Solo seco. Deseja irrigar agora?";
    }

    // Temperatura alta
    else if(sensores.temperatura > 32){
        mensagem.innerHTML =
        "🌡️ Temperatura elevada. Deseja ligar a ventoinha?";
    }

    // Pouca luminosidade
    else if(sensores.luminosidade == "Baixa"){
        mensagem.innerHTML =
        "☀️ Pouca luz. Deseja ligar o LED?";
    }

    // Qualidade da água
    else if(sensores.qualidadeAgua == "Ruim"){
        mensagem.innerHTML =
        "🚰 Qualidade da água inadequada. Verifique o reservatório.";
    }

    // Nível da água
    else if(sensores.nivelAgua == "Baixo"){
        mensagem.innerHTML =
        "💧 Nível da água baixo. Reabasteça o reservatório.";
    }

    // Composteira
    else if(sensores.composteira == "Pronta"){
        mensagem.innerHTML =
        "♻️ O adubo está pronto. Deseja ver como aplicá-lo?";
    }

    // Nenhum problema encontrado
    else{
        mensagem.innerHTML =
        "🌱 Nenhuma recomendação no momento.";
    }

}




atualizarDashboard ();
