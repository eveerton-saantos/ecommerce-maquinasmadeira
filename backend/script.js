const highlight = document.getElementById('highlight').checked;

function limiteDescriptionProducts(limite = 50) {
    const descriptions = document.querySelectorAll('.description');

    descriptions.forEach(el => {
    const completText = el.textContent;
    if (completText.length > limite) {
        el.textContent = completText.substring(0, limite) + '...';
    }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    limiteDescriptionProducts();
});

async function toggleDestaque(id, novoValor) {
    await fetch(`http://localhost:5000/produtos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ highlight: novoValor })
    });

  carregarProdutos(); // Recarrega a lista pra refletir a mudança
}



async function carregarProdutos() {
    const response = await fetch('http://localhost:5000/produtos');
    const produtos = await response.json();

    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = '';

    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('produto');
        div.setAttribute('data-id', produto._id);
        div.setAttribute('data-nome', produto.nome);
        div.setAttribute('data-descricao', encodeURIComponent(produto.descricao));
        div.setAttribute('data-preco', produto.preco);
        div.setAttribute('data-frete', produto.frete);
        div.setAttribute('data-imagem', produto.imagem);

        div.innerHTML = `
            <h3 class="product-title-system">${produto.nome}</h3>
            <p class="product-text-system description">${produto.descricao}</p>
            <p class="product-price-system"><strong>Preço:</strong> R$${produto.preco.toFixed(2)}</p>
            <button class="product-btn-system" onclick="editarViaDataset(this.parentElement)">Editar</button>
            <button class="product-btn-system" onclick="deletarProduto('${produto._id}')">Excluir</button>
        `;
        
        if(produto.highlight) {
            const highlightTag = document.createElement('span');
            highlightTag.textContent = "*Destaque";
            highlightTag.classList.add('product-highlight-badge');
            div.prepend(highlightTag);
        }

        const toggleButton = document.createElement('button');
        toggleButton.textContent = produto.highlight ? "Remover destaque" : "Destacar produto";
        toggleButton.classList.add('product-btn-system');
        toggleButton.onclick = () => toggleDestaque(produto._id, !produto.highlight);
        div.appendChild(toggleButton);

        produtosContainer.appendChild(div);
    });

    limiteDescriptionProducts();
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
        imagem: document.getElementById('imagem').value,
        highlight: document.getElementById('highlight').checked
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