let produtoAtual = null; // Inicializa a variável corretamente

async function carregarProduto() {
    const params = new URLSearchParams(window.location.search);
    const idProduto = params.get("id");

    if (!idProduto) {
        alert("Produto não encontrado!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/produto/${idProduto}`);
        const data = await response.json();
    
        if (data.highlight) {
            const destaqueTag = document.createElement('div');
            destaqueTag.classList.add('destaque-badge');
            destaqueTag.innerHTML = '⭐ Destaque';
            document.querySelector('.info-product').prepend(destaqueTag);
        }

        console.log("API retornou:", data); // ✅ Debug para verificar o conteúdo

        if (!data || !data._id) {
            throw new Error("Erro ao carregar produto! Dados inválidos.");
        }

        produtoAtual = data; // ✅ Agora garantimos que `produtoAtual` foi preenchido corretamente

        document.getElementById("produtoNome").innerText = produtoAtual.nome;
        document.getElementById("produtoImagem").src = produtoAtual.imagem;
        document.getElementById("produtoDescricao").innerText = produtoAtual.descricao;
        document.getElementById("produtoPreco").innerText = produtoAtual.preco.toFixed(2);

        document.getElementById("btnAdicionar").addEventListener("click", () => {
            adicionarAoCarrinho(produtoAtual._id, produtoAtual.nome, produtoAtual.preco);
        });

    } catch (error) {
        alert("Erro ao carregar produto. Tente novamente!");
    }



}

function changeQuantity(value) {
    const input = document.getElementById('quantity');
    let quantity = parseInt(input.value) || 1;
    quantity += value;

    if (quantity < 1) quantity = 1;

    input.value = quantity;
}

function adicionarAoCarrinho(id, nome, preco) {
    console.log(`Adicionando ao carrinho: ID=${id}, Nome=${nome}, Preço=${preco}`); //Debug para verificar se os dados estão corretos

    const quantity = parseInt(document.getElementById('quantity').value) || 1;

    if (!id || !nome || !preco) {
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, quantidade: quantity });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    console.log("Novo estado do carrinho:", carrinho);
    alert(`${nome} foi adicionado ao carrinho!`);
}

document.addEventListener("DOMContentLoaded", carregarProduto);