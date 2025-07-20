function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoContainer = document.getElementById('carrinhoLista');

    if (!carrinhoContainer) {
        console.error("Elemento 'carrinhoLista' não encontrado! Verifique o HTML.");
        return;
    }

    carrinhoContainer.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const iconRemove = item.quantidade > 1
            ? '../assets/icons/minus-icon.svg'
            : '../assets/icons/trash.icon.svg';

        const template = document.getElementById('templateItemCarrinho');
        const clone = template.content.cloneNode(true);

        clone.querySelector('.cart-item-nome').textContent = `${item.nome} - R$${item.preco.toFixed(2).replace('.',',')}`;
        clone.querySelector('.cart-value-amount').textContent = item.quantidade;

        clone.querySelector('.cart-item-img').src = item.imagem;
        clone.querySelector('.cart-item-img').alt = `Imagem de ${item.nome}`;

        clone.querySelector('.btn-remover-unit img').src = iconRemove;
        clone.querySelector('.btn-remover-unit').onclick = () => alterarQuantidade(item.id, -1);
        clone.querySelector('.btn-adicionar-unit').onclick = () => alterarQuantidade(item.id, 1);
        clone.querySelector('.btn-remover-total').onclick = () => removerDoCarrinho(item.id);

        carrinhoContainer.appendChild(clone);
    });

        document.getElementById('cartTotal').innerText = total.toFixed(2).replace('.', ',');
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
            <p>${item.nome} - R$${item.preco.toFixed(2).replace('.', ',')} x ${item.quantidade}</p>
            <button onclick="alterarQuantidade('${item.id}', -1)">➖</button>
            <button onclick="alterarQuantidade('${item.id}', 1)">➕</button>
            <button onclick="removerDoCarrinho('${item.id}')">❌ Remover</button>
        `;
        carrinhoContainer.appendChild(div);
    });

    document.getElementById('cartTotal').innerText = total.toFixed(2).replace('.', ',');
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