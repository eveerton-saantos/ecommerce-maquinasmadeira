const { json } = ("express");

const express = ('express');

let carrinho = [];

async function carregarProdutos() {
    const response = await fetch('http://localhost:5000/produtos');
    const produtos = await response.json();

    const produtosContainer = document.getElementById('listaProdutos');
    const template = document.getElementById('produtoTemplate');

    produtosContainer.innerHTML = ''; // Limpa a lista antes de adicionar os produtos

    produtos.forEach(produto => {
        const clone = template.content.cloneNode(true); // Clona o template

        clone.querySelector("a").href = `./product.html?id=${produto._id}`;
        clone.querySelector(".produto-imagem").src = produto.imagem;
        clone.querySelector(".produto-imagem").alt = produto.nome;
        clone.querySelector(".produto-nome").innerText = produto.nome;
        clone.querySelector(".produto-descricao").innerText = produto.descricao;
        clone.querySelector(".produto-preco").innerText = produto.preco.toFixed(2);

        clone.querySelector(".btn-add").addEventListener("click", () => {
            adicionarAoCarrinho(produto._id, produto.nome, produto.preco);
        });

        produtosContainer.appendChild(clone); // Adiciona o produto à lista
    });
}

document.addEventListener('DOMContentLoaded', carregarProdutos);

function exibirCheckout() {
    const checkoutContainer = document.getElementById('checkoutLista');
    checkoutContainer.innerHTML = '';

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const div = document.createElement('div');
        div.innerHTML = `
            <p>${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade}</p>
        `;
        checkoutContainer.appendChild(div);
    });

    document.getElementById('checkoutTotal').innerText = total.toFixed(2);
}

function finalizarCompra() {
    alert("Compra finalizada! Obrigado por comprar conosco!");
    carrinho = [];
    exibirCheckout();
}

function voltarParaLoja() {
    window.location.reload(); // Simplesmente recarrega a página
}

document.addEventListener('DOMContentLoaded', exibirCheckout);

function comprarProduto(id) {
    alert("Redirecionando para compra do produto ID: " + id);
    // Aqui você pode adicionar um redirecionamento real para uma página de checkout!
}

function removerDoCarrinho(id) {
    console.log("Removendo produto do Carrinho: ", id);

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho = carrinho.filter(item => item.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    atualizarCarrinho();
}

function finalizarCompra() {
    alert("Compra finalizada!");
    carrinho = []; // Limpa o carrinho após a compra
    atualizarCarrinho();
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

carregarProdutos();