let produtos = [];
let paginaAtual = 1;
const porPagina = 5;

async function carregarGradeProdutos() {
    const res = await fetch('http://localhost:5000/api/produtos');
    const data = await res.json();
    produtos = data;
    renderizarGrade();
}

function abrirModal(produto) {
    document.getElementById('produtoId').value = produto._id;
    document.getElementById('editNome').value = produto.nome || '';
    document.getElementById('editDescricao').value = produto.descricao || '';
    document.getElementById('editPreco').value = produto.preco || '';
    document.getElementById('editImagem').value = produto.imagem || '';
    document.getElementById('editFrete').value = produto.frete || '';
    document.getElementById('editEstoque').value = produto.estoque || '';
    document.getElementById('editVoltagem').value = produto.voltagem || '';

    document.getElementById('highlightEdit').checked = produto.highlight || false;
    document.getElementById('expressEdit').checked = produto.express || false;

    document.getElementById('modal-produto').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-produto').style.display ='none';
}

function cancelarEdicao() {
    document.getElementById('modal-produto').style.display = 'none';
}

function editarProduto(id) {
    const produtoSelecionado = produtos.find(p => p._id === id);
    if (produtoSelecionado) {
        abrirModal(produtoSelecionado);
    } 
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000)
}

function renderizarGrade() {
    const container = document.getElementById('gradeProdutos')
    container.innerHTML = "";

    const inicio = (paginaAtual - 1) * porPagina;
    const fim = inicio + porPagina;
    const pagina = produtos.slice(inicio, fim);

    const template = document.getElementById('template-linha-produto');

    pagina.forEach((produto, index) => {
        const clone = template.content.cloneNode(true);

        const destaqueBadge = clone.querySelector('.badge.destaque');
        if(produto.highlight && destaqueBadge) {
            destaqueBadge.style.display = 'inline-block';
        }

        const expressBadge = clone.querySelector('.badge.express');
        if (produto.express && expressBadge)  {
            expressBadge.style.display = 'inline-block';
        }

        clone.querySelector('img').src = produto.imagem;
        clone.querySelector('img').alt = produto.nome;
        clone.querySelector('.produto-indice').textContent = (inicio + index + 1).toString();
        clone.querySelector('.produto-nome').textContent = produto.nome;
        clone.querySelector('.produto-preco').textContent = `R$ ${produto.preco.toFixed(2).replace(".", ",")}`;
        clone.querySelector('.produto-destaque').textContent = produto.highlight ? "Sim" : "Não";
        clone.querySelector('.produto-express').textContent = produto.express ? "Sim" : "Não";

        clone.querySelector('.btn-destaque').textContent = produto.highlight ? 'Remover destaque' : 'Destacar produto';
        clone.querySelector('.btn-destaque').onclick = () => alternarDestaque(produto._id);

        clone.querySelector('.btn-express').textContent = produto.express ? 'Remover Express' : 'Produto Express';
        clone.querySelector('.btn-express').onclick = () => alternarExpress(produto._id);

        clone.querySelector('.btn-editar').onclick = () => editarProduto(produto._id);
        clone.querySelector('.btn-excluir').onclick = () => deletarProduto(produto._id);

        container.appendChild(clone);
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

function alternarDestaque(id, valor = null) {
    const token = localStorage.getItem('token');

    if (valor === null) {
        const p = produtos.find(x => x._id === id);
        if (!p) return console.warn('Produto não encontrado para alternar destaque:', id);
        valor = !p.highlight;
    }

    fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ highlight: valor })
    })
    .then(res => res.json())
    .then(data => {
        const msg = valor ? "Produto em Destaque" : "Destaque removido";
        showToast(msg);
        carregarGradeProdutos();
    })
    .catch(err => console.error('Erro ao alterar destaque:', err));
}

function alternarExpress(id, valor = null) {
    const token = localStorage.getItem('token');

    if (valor === null) {
        const p = produtos.find(x => x._id === id);
        if (!p) return console.warn('Produto não encontrado para alternar express:', id);
        valor = !p.express;
    }

    fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ express: valor })
    })
    .then(res => res.json())
    .then(data => {
        const msg = valor ? "Produto com entrega Express" : "Entrega Express removida";
        showToast(msg);
        carregarGradeProdutos();
    })
    .catch(err => console.error('Erro ao alterar Express:', err));
}

document.getElementById('formProduto').addEventListener('submit', function (e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const nome = document.getElementById('produtoNome').value;
    const descricao = document.getElementById('produtoDescricao').value;
    const imagem = document.getElementById('produtoImagem').value;
    const codigo = document.getElementById('produtoCodigo').value;
    const preco = parseFloat(document.getElementById('produtoPreco').value);
    const frete = parseFloat(document.getElementById('produtoFrete').value);
    const estoque = parseInt(document.getElementById('produtoEstoque').value);
    const voltagem = document.getElementById('produtoVoltagem').value;
    const highlight = document.getElementById('highlightAdd').checked;
    const express = document.getElementById('expressAdd').checked;

    fetch('http://localhost:5000/api/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome, descricao, imagem, codigo, preco, frete, estoque, voltagem, highlight, express })
    })
    .then(res => res.json())
    .then(data => {
        showToast(data.message || 'Produto salvo com sucesso!');
        carregarGradeProdutos();
    })
    .catch(err => console.error('Erro ao salvar produto:', err));
});

document.getElementById('formEdicao').addEventListener('submit', async e => {
    e.preventDefault();

    const id = document.getElementById('produtoId').value;

    const produtoAtualizado = {
        nome: document.getElementById('editNome').value,
        descricao: document.getElementById('editDescricao').value,
        preco: parseFloat(document.getElementById('editPreco').value),
        frete: parseFloat(document.getElementById('editFrete').value),
        imagem: document.getElementById('editImagem').value,
        estoque: parseInt(document.getElementById('editEstoque').value),
        voltagem: document.getElementById('editVoltagem').value,
        highlight: document.getElementById('highlightEdit').checked,
        express: document.getElementById('expressEdit').checked
    };

    const res = await fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoAtualizado)
    });
    const data = await res.json();

    showToast(data.message || 'Produto atualizado com sucesso!');
    fecharModal();
    carregarGradeProdutos();
});

document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

function limiteDescriptionProducts(limite = 50) {
    const descriptions = document.querySelectorAll('.description');
    descriptions.forEach(el => {
    const completText = el.textContent;
    if (completText.length > limite) {
        el.textContent = completText.substring(0, limite) + '...';
    }
    });
}

function mostrarLoader() {
    const container = document.getElementById('produtos');
    container.innerHTML = '<p>Carregando produtos...</p>';
}

async function deletarProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    await fetch(`http://localhost:5000/api/produtos/${id}`, { method: 'DELETE' });
    carregarGradeProdutos();
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
    await fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

function editarViaDataset(div) {
    document.getElementById('produtoId').value = div.dataset.id;
    document.getElementById('editNome').value = div.dataset.nome;
    document.getElementById('editDescricao').value = decodeURIComponent(div.dataset.descricao);
    document.getElementById('editPreco').value = div.dataset.preco;
    document.getElementById('editFrete').value = div.dataset.frete;
    document.getElementById('editImagem').value = div.dataset.imagem;

    document.getElementById('formEdicao').style.display = 'block';
}

window.addEventListener('DOMContentLoaded', () => {
    limiteDescriptionProducts();
    carregarGradeProdutos();
});