async function carregarProdutos() {
    const response = await fetch('http://localhost:5000/produtos');
    const produtos = await response.json();
    
    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = '';

    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('produto');
        div.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p><strong>Preço:</strong> R$${produto.preco.toFixed(2)}</p>
            <button onclick="editarProduto('${produto._id}', '${produto.nome}', '${produto.descricao}', ${produto.preco}, ${produto.frete}, '${produto.imagem}')">✏ Editar</button>
            <button onclick="deletarProduto('${produto._id}')">🗑 Excluir</button>
        `;
        produtosContainer.appendChild(div);
    });
}

async function deletarProduto(id) {
    await fetch(`http://localhost:5000/produtos/${id}`, { method: 'DELETE' });
    carregarProdutos(); // Atualiza a lista após excluir
}

document.addEventListener('DOMContentLoaded', carregarProdutos);

document.getElementById('formProduto').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    const produto = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        preco: parseFloat(document.getElementById('preco').value),
        frete: parseFloat(document.getElementById('frete').value),
        imagem: document.getElementById('imagem').value
    };

    const response = await fetch('http://localhost:5000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    });

    const result = await response.json();
    alert(result.message); // Exibe a mensagem do backend
    carregarProdutos(); // Atualiza a lista de produtos
});

function editarProduto(id, nome, descricao, preco, frete, imagem) {
    document.getElementById('produtoId').value = id;
    document.getElementById('editNome').value = nome;
    document.getElementById('editDescricao').value = descricao;
    document.getElementById('editPreco').value = preco;
    document.getElementById('editFrete').value = frete;
    document.getElementById('editImagem').value = imagem;
    
    document.getElementById('formEdicao').style.display = 'block';
}

async function salvarEdicao(event) {
    event.preventDefault();

    const id = document.getElementById('produtoId').value;
    const produtoAtualizado = {
        nome: document.getElementById('editNome').value,
        descricao: document.getElementById('editDescricao').value,
        preco: parseFloat(document.getElementById('editPreco').value),
        frete: parseFloat(document.getElementById('editFrete').value),
        imagem: document.getElementById('editImagem').value
    };

    await fetch(`http://localhost:5000/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoAtualizado)
    });

    alert('Produto atualizado com sucesso!');
    document.getElementById('formEdicao').style.display = 'none';
    carregarProdutos();
}

function cancelarEdicao() {
    document.getElementById('formEdicao').style.display = 'none';
}

document.getElementById('formEdicao').addEventListener('submit', salvarEdicao);