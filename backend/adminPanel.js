// ================== UTILITARIOS ==========================
function limiteDescriptionProducts(limite = 50) {
    const descriptions = document.querySelectorAll('.description');
    descriptions.forEach(el => {
    const completText = el.textContent;
    if (completText.length > limite) {
        el.textContent = completText.substring(0, limite) + '...';
    }
    });
}

function exibirAlerta(mensagem) {
    alert(mensagem);
}

// ============================= FETCH API ==================

function mostrarLoader() {
    const container = document.getElementById('produtos');
    container.innerHTML = '<p>Carregando produtos...</p>';
}

async function fetchProdutos() {
    mostrarLoader();
    const res = await fetch('http://localhost:5000/api/produtos');
    const data = await res.json();

    if(!Array.isArray(data)) {
        console.error('Resposta inesperada da API:', data);
        return [];
    }
    return data;
}

async function atualizarProduto(id, dados) {
    await fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    carregarProdutos();
}

async function deletarProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    await fetch(`http://localhost:5000/api/produtos/${id}`, { method: 'DELETE' });
    carregarProdutos();
}

async function criarProduto(product) {
    const res = await fetch('http://localhost:5000/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return await res.json();
}

async function salvarEdicaoProduto(id, dados) {
    await fetch(`http://localhost:5000/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

// ================= RENDERIZAÇÃO ===========================

async function carregarProdutos() {
    const produtos = await fetchProdutos();
    const container = document.getElementById('produtos');
    if(!container) {
        return console.warn("Elemento 'produto' não encontrado.");
    }
    container.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto';
        card.dataset.id = produto._id;
        card.dataset.nome = produto.nome;
        card.dataset.descricao = encodeURIComponent(produto.descricao);
        card.dataset.preco = produto.preco;
        card.dataset.frete = produto.frete;
        card.dataset.imagem = produto.imagem;

        card.innerHTML = `
            <div class="badge-container">
                ${produto.highlight ? '<span class="product-highlight-badge">*Destaque</span>' : ''}
                ${produto.express ? '<span class="product-express-badge">Entrega Expressa</span>' : ''}
            </div>
            <h3 class="product-title-system">${produto.nome}</h3>
            <p class="product-text-system description">${produto.descricao}</p>
            <p class="product-price-system"><strong>Preço:</strong> R$${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button class="product-btn-system" onclick="editarViaDataset(this.parentElement)">Editar</button>
            <button class="product-btn-system" onclick="deletarProduto('${produto._id}')">Excluir</button>
            <button class="product-btn-system" onclick="atualizarProduto('${produto._id}', { highlight: ${!produto.highlight} })">
                ${produto.highlight ? 'Remover destaque' : 'Destacar produto'}
            </button>
            <button class="product-btn-express" onclick="atualizarProduto('${produto._id}', { express: ${!produto.express} })">
                ${produto.express ? 'Remover Express' : 'Produto Express'}
            </button>
        `;
        container.appendChild(card);
    });

    limiteDescriptionProducts();
}

// ============= FORMULÁRIOS ===========================

document.getElementById('formProduto')?.addEventListener('submit', async e => {
    e.preventDefault();
    const produto = {
    nome: document.getElementById('nome').value,
    descricao: document.getElementById('descricao').value,
    preco: parseFloat(document.getElementById('preco').value),
    frete: parseFloat(document.getElementById('frete').value),
    imagem: document.getElementById('imagem').value,
    highlight: document.getElementById('highlight').checked,
    express: document.getElementById('express').checked,
    codigo: document.getElementById('codigo').value,
    estoque: parseInt(document.getElementById('estoque').value),
    voltagem: document.getElementById('voltagem').value
    };

    const resultado = await criarProduto(produto);
    exibirAlerta(resultado.message);
    carregarProdutos();
});

document.getElementById('formEdicao')?.addEventListener('submit', async e => {
    e.preventDefault();

    const id = document.getElementById('produtoId').value;
    const produtoAtualizado = {
        nome: document.getElementById('editNome').value,
        descricao: document.getElementById('editDescricao').value,
        preco: parseFloat(document.getElementById('editPreco').value),
        frete: parseFloat(document.getElementById('editFrete').value),
        imagem: document.getElementById('editImagem').value
    };

    await salvarEdicaoProduto(id, produtoAtualizado);
    exibirAlerta('Produto atualizado com sucesso!');
    document.getElementById('formEdicao').style.display = 'none';
    carregarProdutos();
});

// ======================= EDIÇÃO =========================

function editarViaDataset(div) {
    document.getElementById('produtoId').value = div.dataset.id;
    document.getElementById('editNome').value = div.dataset.nome;
    document.getElementById('editDescricao').value = decodeURIComponent(div.dataset.descricao);
    document.getElementById('editPreco').value = div.dataset.preco;
    document.getElementById('editFrete').value = div.dataset.frete;
    document.getElementById('editImagem').value = div.dataset.imagem;

    document.getElementById('formEdicao').style.display = 'block';
}

// ==================== INICIALIZAÇÃO ==========================

window.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    limiteDescriptionProducts();
});