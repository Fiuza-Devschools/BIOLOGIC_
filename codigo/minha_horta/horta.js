const plantas = {

    alface: {
        nome: "🥬 Alface",
        cientifico: "Lactuca sativa",
        data: "05/08/2026",
        descricao: "A alface é uma hortaliça cultivada principalmente por suas folhas e bastante utilizada na alimentação."
    },

    couve: {
        nome: "🥬 Couve",
        cientifico: "Brassica oleracea var. acephala",
        data: "05/08/2026",
        descricao: "A couve é uma hortaliça de folhas verdes, rica em nutrientes e bastante utilizada em saladas e preparações culinárias."
    },

    rucula: {
        nome: "🥬 Rúcula",
        cientifico: "Eruca sativa",
        data: "06/08/2026",
        descricao: "A rúcula é uma hortaliça de folhas verdes e sabor marcante, muito utilizada em saladas."
    },

    tomate: {
        nome: "🍅 Tomate",
        cientifico: "Solanum lycopersicum",
        data: "05/08/2026",
        descricao: "O tomate é um fruto amplamente utilizado na alimentação e necessita de boa luminosidade para seu desenvolvimento."
    },

    cenoura: {
        nome: "🥕 Cenoura",
        cientifico: "Daucus carota",
        data: "06/08/2026",
        descricao: "A cenoura é uma raiz comestível que se desenvolve abaixo do solo e necessita de um solo adequado para seu crescimento."
    },

    manjericao: {
        nome: "🌿 Manjericão",
        cientifico: "Ocimum basilicum",
        data: "07/08/2026",
        descricao: "O manjericão é uma erva aromática muito utilizada como tempero e pode ser cultivado em hortas domésticas."
    },

    cebolinha: {
        nome: "🌿 Cebolinha",
        cientifico: "Allium fistulosum",
        data: "07/08/2026",
        descricao: "A cebolinha é uma planta aromática bastante utilizada como tempero e pode ser cultivada facilmente em pequenas hortas."
    },

    salsinha: {
        nome: "🌿 Salsinha",
        cientifico: "Petroselinum crispum",
        data: "07/08/2026",
        descricao: "A salsinha é uma erva aromática utilizada principalmente como tempero em diversos pratos."
    },

    alecrim: {
        nome: "🌿 Alecrim",
        cientifico: "Salvia rosmarinus",
        data: "08/08/2026",
        descricao: "O alecrim é uma erva aromática resistente, muito utilizada como tempero e apreciada por seu aroma característico."
    },

    hortela: {
        nome: "🌿 Hortelã",
        cientifico: "Mentha spicata",
        data: "08/08/2026",
        descricao: "A hortelã é uma erva aromática conhecida por seu aroma refrescante e utilizada em bebidas e preparações culinárias."
    }

};


// Elementos da página
const seletor = document.getElementById("seletorPlanta");
const nomePlanta = document.getElementById("nomePlanta");
const nomeCientifico = document.getElementById("nomeCientifico");
const dataPlantio = document.getElementById("dataPlantio");
const descricaoPlanta = document.getElementById("descricaoPlanta");


// Quando o usuário trocar a planta
seletor.addEventListener("change", function () {

    const plantaSelecionada = plantas[this.value];

    nomePlanta.textContent = plantaSelecionada.nome;
    nomeCientifico.textContent = plantaSelecionada.cientifico;
    dataPlantio.textContent = plantaSelecionada.data;
    descricaoPlanta.textContent = plantaSelecionada.descricao;

});