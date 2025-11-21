let produtos = [];
let paginaAtual = 1;
const porPagina = 5;

async function carregarGradeProdutos() {
    const res = await fetch('http://localhost:5000/api/produtos');
    const data = await res.json();
    produtos = data;
    renderizarGrade();
}

function abrirModal(produto = null) {
    document.getElementById('modal-produto').style.display = 'block';
    document.getElementById('modal-titulo').textContent = produto ? 'Editar Produto' : 'Adicionar Produto';

    document.getElementById('produto-id').value = produto?._id || '';
    document.getElementById('produto-nome').value = produto?.nome || '';
    document.getElementById('produto-descricao').value = produto?.descricao || '';
    document.getElementById('produto-preco').value = produto?.preco || '';
}

function fecharModal() {
    document.getElementById('modal-produto').style.display ='block';
}

function cancelarEdicao() {
    document.getElementById('formEdicao').style.display = 'none';
}

function editarProduto(id) {
    const produtoSelecionado = produtos.find(p => p._id === id);
    if (produtoSelecionado) {
        abrirModal(produtoSelecionado);
    } 
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
    const totalPaginas = Math.ceil(produtos.length / porPagina);
    const paginacaoContainer = document.getElementById('paginacao');
    paginacaoContainer.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const botao = document.createElement('button');
        botao.innerText = i;
        botao.className = i === paginaAtual ? 'btn-edit-product' : 'btn-add';
        botao.onclick = () => {
            paginaAtual = i;
            renderizarGrade();
        };
        paginacaoContainer.appendChild(botao);
    }
}

document.getElementById('form-produto').addEventListener('submit', function (e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const id = document.getElementById('produto-id').value;
    const nome = document.getElementById('produto-nome').value;
    const descricao = document.getElementById('produto-descricao').value;
    const preco = parseFloat(document.getElementById('produto-preco').value);

    const metodo = id ? 'PUT' : 'POST';
    const url = id
    ? `http://localhost:5000/api/produtos/${id}`
    : `http://localhost:5000/api/produtos`;

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome, descricao, preco })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message || 'Produto salvo com sucesso!');
        fecharModal();
        carregarGradeProdutos();
    })
    .catch(err => console.error('Erro ao salvar produto:', err));
});

document.addEventListener("DOMContentLoaded", carregarGradeProdutos);