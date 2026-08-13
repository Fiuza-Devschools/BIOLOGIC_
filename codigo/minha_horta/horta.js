const plantas = {

    alface: {
        nome: "🥬 Alface",
        cientifico: "Lactuca sativa",
        data: "05/08/2026",
        descricao: ` <p>A alface é uma hortaliça de folhas verdes, macias e agrupadas em formato de roseta ou cabeça.</p> <p><strong>🌿 Cultura:</strong></p> <ul> <li>É uma das hortaliças mais consumidas no Brasil.</li> <li>É muito utilizada em saladas.</li> </ul> <p><strong>☀️ Cuidados no cultivo:</strong></p> <ul> <li>Prefere temperaturas amenas.</li> <li>Precisa de solo fértil e bem drenado.</li> <li>Necessita de regas frequentes.</li> <li>Evite deixar o solo encharcado.</li> </ul> `,
        imagem: "../../imagens/alface.png"
    },

    couve: {
        nome: "🥬 Couve",
        cientifico: "Brassica oleracea var. acephala",
        data: "05/08/2026",
        descricao: `
    <p>A couve é uma hortaliça de folhas grandes, verdes e resistentes, que crescem ao redor de um caule central.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É muito utilizada na culinária brasileira.</li>
        <li>Pode ser consumida refogada, em sopas e outras preparações.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Precisa de boa iluminação.</li>
        <li>Prefere solo fértil e bem drenado.</li>
        <li>Necessita de regas regulares.</li>
        <li>É importante observar a presença de lagartas e pulgões.</li>
    </ul>
`,
        imagem: "../../imagens/couve.jpg"
    },

    rucula: {
        nome: "🥬 Rúcula",
        cientifico: "Eruca sativa",
        data: "06/08/2026",
        descricao: `
    <p>A rúcula é uma hortaliça de folhas verdes, alongadas e geralmente recortadas. Possui sabor caracteristicamente picante.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É muito utilizada em saladas.</li>
        <li>É originária da região do Mediterrâneo.</li>
        <li>Tornou-se bastante popular no Brasil.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Prefere temperaturas mais amenas.</li>
        <li>Precisa de boa luminosidade.</li>
        <li>Prefere solo fértil e bem drenado.</li>
        <li>Necessita de irrigação regular.</li>
        <li>Evite o excesso de água.</li>
    </ul>
`,
        imagem: "../../imagens/rucula.jpg"
    },

    tomate: {
        nome: "🍅 Tomate",
        cientifico: "Solanum lycopersicum",
        data: "05/08/2026",
        descricao: `
    <p>O tomate é uma planta de caule ramificado, com folhas verdes e frutos geralmente vermelhos quando maduros.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É muito utilizado em saladas, molhos e diversos pratos.</li>
        <li>É uma das hortaliças mais utilizadas na alimentação.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Precisa de bastante luz solar.</li>
        <li>Prefere solo fértil e bem drenado.</li>
        <li>Algumas variedades precisam de suporte para os ramos.</li>
        <li>Evite excesso de umidade, que pode favorecer doenças.</li>
    </ul>
`,
        imagem: "../../imagens/tomate.avif"
    },

    cenoura: {
        nome: "🥕 Cenoura",
        cientifico: "Daucus carota",
        data: "06/08/2026",
        descricao: `
    <p>A cenoura possui folhas verdes finas acima do solo e uma raiz geralmente alaranjada que se desenvolve abaixo da terra.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É uma hortaliça de raiz muito utilizada na alimentação.</li>
        <li>Pode ser consumida crua ou cozida.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Precisa de solo profundo e solto.</li>
        <li>O solo deve estar livre de pedras e obstáculos.</li>
        <li>Necessita de umidade regular.</li>
        <li>Evite o encharcamento do solo.</li>
    </ul>
`,
        imagem: "../../imagens/cenoura.webp"
    },

    manjericao: {
        nome: "🌿 Manjericão",
        cientifico: "Ocimum basilicum",
        data: "07/08/2026",
        descricao: `
    <p>O manjericão é uma planta aromática com folhas verdes, geralmente ovais, caule ramificado e aroma marcante.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É muito utilizado como tempero.</li>
        <li>É bastante presente na culinária italiana.</li>
        <li>Combina especialmente bem com preparações à base de tomate.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Gosta de bastante luz solar.</li>
        <li>Prefere solo fértil e bem drenado.</li>
        <li>Necessita de regas regulares.</li>
        <li>A retirada de folhas e ramos velhos pode estimular novos brotos.</li>
    </ul>
`,
        imagem: "../../imagens/manjericao.jpg"
    },

    cebolinha: {
        nome: "🌿 Cebolinha",
        cientifico: "Allium fistulosum",
        data: "07/08/2026",
        descricao: `
    <p>A cebolinha possui folhas verdes, longas e ocas, que crescem formando uma touceira.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É utilizada principalmente como tempero.</li>
        <li>Faz parte de diversas receitas da culinária brasileira.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Desenvolve-se bem com boa luminosidade.</li>
        <li>Prefere solo fértil e bem drenado.</li>
        <li>Necessita de umidade regular.</li>
        <li>Pode ser colhida aos poucos, cortando as folhas sem retirar toda a planta.</li>
    </ul>
`,
        imagem: "../../imagens/cebolinha.jpg"
    },

    salsinha: {
        nome: "🌿 Salsinha",
        cientifico: "Petroselinum crispum",
        data: "07/08/2026",
        descricao: `
    <p>A salsinha possui folhas verdes, pequenas e recortadas, formando uma planta baixa e ramificada.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É muito utilizada como tempero.</li>
        <li>Também pode ser utilizada para decorar pratos.</li>
        <li>Pode ser cultivada em vasos ou canteiros.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Prefere solo fértil e bem drenado.</li>
        <li>Necessita de umidade regular.</li>
        <li>Precisa de boa luminosidade.</li>
    </ul>
`,
        imagem: "../../imagens/salsinha.jpg"
    },

    alecrim: {
        nome: "🌿 Alecrim",
        cientifico: "Salvia rosmarinus",
        data: "08/08/2026",
        descricao: `
    <p>O alecrim é uma planta aromática com folhas finas, alongadas e verde-escuras, presas a ramos firmes.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É muito utilizado como tempero.</li>
        <li>Possui aroma característico.</li>
        <li>É uma planta bastante utilizada em hortas.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Prefere bastante luz solar.</li>
        <li>Gosta de solo bem drenado.</li>
        <li>Não necessita de regas excessivas.</li>
        <li>O excesso de umidade pode prejudicar as raízes.</li>
    </ul>
`,
        imagem: "../../imagens/alecrim.jpg"
    },

    hortela: {
        nome: "🌿 Hortelã",
        cientifico: "Mentha spicata",
        data: "08/08/2026",
        descricao: `
    <p>A hortelã possui folhas verdes, geralmente arredondadas ou alongadas, com bordas serrilhadas e aroma refrescante.</p>

    <p><strong>🌿 Cultura:</strong></p>
    <ul>
        <li>É utilizada em bebidas, chás e sobremesas.</li>
        <li>Também pode ser utilizada como tempero.</li>
        <li>É conhecida pelo seu aroma e sabor refrescante.</li>
    </ul>

    <p><strong>☀️ Cuidados no cultivo:</strong></p>
    <ul>
        <li>Prefere solo úmido e fértil.</li>
        <li>Pode receber bastante luminosidade.</li>
        <li>Necessita de regas regulares.</li>
        <li>Deve ser controlada porque se espalha facilmente.</li>
    </ul>
`,
        imagem: "../../imagens/hortela.jpg"
    }

};


// Elementos da página
const seletor = document.getElementById("seletorPlanta");
const nomePlanta = document.getElementById("nomePlanta");
const nomeCientifico = document.getElementById("nomeCientifico");
const dataPlantio = document.getElementById("dataPlantio");
const descricaoPlanta = document.getElementById("descricaoPlanta");
const imagemPlanta = document.getElementById("imagemPlanta");


// Quando o usuário trocar a planta
seletor.addEventListener("change", function () {

    const plantaSelecionada = plantas[this.value];

    nomePlanta.textContent = plantaSelecionada.nome;
    nomeCientifico.textContent = plantaSelecionada.cientifico;
    dataPlantio.textContent = plantaSelecionada.data;
    descricaoPlanta.innerHTML = plantaSelecionada.descricao;
    imagemPlanta.src =
        plantaSelecionada.imagem;
});