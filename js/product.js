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
            console.log(`Adicionando ao carrinho: ID=${produtoAtual._id}, Nome=${produtoAtual.nome}, Preço=${produtoAtual.preco}`);
            adicionarAoCarrinho(produtoAtual._id, produtoAtual.nome, produtoAtual.preco);
        });

        console.log("Produto carregado com sucesso:", produtoAtual);
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        alert("Erro ao carregar produto. Tente novamente!");
    }
}

function adicionarAoCarrinho(id, nome, preco) {
    console.log(`Adicionando ao carrinho: ID=${id}, Nome=${nome}, Preço=${preco}`); //Debug para verificar se os dados estão corretos

    if (!id || !nome || !preco) {
        alert("Erro ao adicionar produto ao carrinho!");
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    console.log("Novo estado do carrinho:", carrinho);
    alert(`${nome} foi adicionado ao carrinho!`);
}

document.addEventListener("DOMContentLoaded", carregarProduto);