function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    console.log("Carrinho carregado do Local Storage:", carrinho); // ✅ Debug para verificar os produtos armazenados

    const carrinhoContainer = document.getElementById('carrinhoLista');

    if (!carrinhoContainer) {
        console.error("Erro: Elemento 'carrinhoLista' não encontrado! Verifique o HTML.");
        return;
    }

    carrinhoContainer.innerHTML = '';

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const div = document.createElement('div');
        div.innerHTML = `
            <p>${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade}</p>
            <button onclick="alterarQuantidade('${item.id}', -1)">➖</button>
            <button onclick="alterarQuantidade('${item.id}', 1)">➕</button>
            <button onclick="removerDoCarrinho('${item.id}')">❌ Remover</button>
        `;
        carrinhoContainer.appendChild(div);
    });

    document.getElementById('cartTotal').innerText = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', carregarCarrinho);

function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinhoLista'); // ✅ Ajuste para o nome correto

    if (!carrinhoContainer) {
        console.error("Erro: Elemento 'carrinhoLista' não encontrado! Verifique o HTML.");
        return;
    }

    console.log("Carrinho atualizado:", carrinho);

    carrinhoContainer.innerHTML = '';

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const div = document.createElement('div');
        div.innerHTML = `
            <p>${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade}</p>
            <button onclick="alterarQuantidade('${item.id}', -1)">➖</button>
            <button onclick="alterarQuantidade('${item.id}', 1)">➕</button>
            <button onclick="removerDoCarrinho('${item.id}')">❌ Remover</button>
        `;
        carrinhoContainer.appendChild(div);
    });

    document.getElementById('cartTotal').innerText = total.toFixed(2);
}

function removerDoCarrinho(id) {
    console.log("Removendo produto do carrinho:", id);

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho = carrinho.filter(item => item.id !== id); // Filtra para remover o produto
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o Local Storage
    
    carregarCarrinho(); // Atualiza a interface
}

function alterarQuantidade(id, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade += quantidade;
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(produto => produto.id !== id); // Remove se a quantidade for 0
        }
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    carregarCarrinho();
}

function finalizarCompra() {
    alert("Compra finalizada!");
    limparCarrinho();
}

document.addEventListener('DOMContentLoaded', carregarCarrinho);