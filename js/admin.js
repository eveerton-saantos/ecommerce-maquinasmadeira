let produtos = [];
let paginaAtual = 1;
const porPagina = 5;

async function carregarGradeProdutos() {
    const res = await fetch('http://localhost:5000/produtos');
    const data = await res.json();
    produtos = data;
    renderizarGrade();
}

function renderizarGrade() {
    const container = document.getElementById('gradeProdutos')
    container.innerHTML = "";

    const inicio = (paginaAtual - 1) * porPagina;
    const fim = inicio + porPagina;
    const pagina = produtos.slice(inicio, fim);

    pagina.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card-produto";

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
            <div class="acoes">
                <button onclick="alternarDestaque('${produto._id}')">Destaque</button>
                <button onclick="alternarExpress('${produto._id}')">Express</button>
                <button onclick="editarProduto('${produto._id}')">Editar</button>
                <button class="danger" onclick="deletarProduto('${produto._id}')">🗑️ Excluir</button>
            </div>
        `;

        container.appendChild(card);
    });

    atualizarPaginacao();
}

function atualizarPaginacao() {
    const paginacao = Math.ceil(produtos.length / porPagina);
    for (let i = 1; i < total; i++) {
        const botao = document.createElement("button");
        botao.innerText = i;
        botao.className = i === paginaAtual ? "btn-edit-product" : "btn-add";
        botao.onclick = () => {
            paginaAtual = i;
            renderizarGrade();
        }
        paginacao.appendChild(botao);
    }
}

document.addEventListener("DOMContentLoaded", carregarGradeProdutos);