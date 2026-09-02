// ==========================
// TEMA
// ==========================

const tema = document.getElementById("tema");

tema.addEventListener("change", function(){

    if(this.value === "claro"){

        document.body.classList.add("modo-claro");

    }else{

        document.body.classList.remove("modo-claro");

    }

});


// ==========================
// NOTIFICAÇÕES
// ==========================

const notificacoes = document.getElementById("notificacoes");

notificacoes.addEventListener("change", function(){

    if(this.checked){

        console.log("Recomendações ativadas.");

    }else{

        console.log("Recomendações desativadas.");

    }

});


// ==========================
// UNIDADE DE TEMPERATURA
// ==========================

const unidade = document.getElementById("unidade");

unidade.addEventListener("change", function(){

    console.log(
        "Unidade selecionada:",
        this.value
    );

});


// ==========================
// ATUALIZAÇÃO
// ==========================

const atualizacao = document.getElementById("atualizacao");

atualizacao.addEventListener("change", function(){

    console.log(
        "Intervalo selecionado:",
        this.value,
        "segundos"
    );

});


// ==========================
// RESTAURAR
// ==========================

const restaurar = document.getElementById("restaurar");

restaurar.addEventListener("click", function(){

    tema.value = "escuro";

    notificacoes.checked = true;

    unidade.value = "celsius";

    atualizacao.value = "5";

    document.body.classList.remove("modo-claro");

    alert("Configurações restauradas.");

});