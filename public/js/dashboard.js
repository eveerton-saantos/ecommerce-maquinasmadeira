const token = localStorage.getItem('token');

if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
} else {
    fetch('http://localhost:5000/api/auth/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            document.getElementById('welcomeMessage').textContent = data.message;
        } else {
            alert('Token inválido ou expirado.');
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    })
    .catch(err => {
        console.error('Erro ao acessar Dashboard:', err);
        alert('Erro ao conectar com o servidor.');
        window.location.href = 'login.html';
    });
}

function carregarProdutos() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    fetch('http://localhost:5000/api/pedidos/meus-pedidos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(pedidos => {
        const container = document.getElementById('lista-pedidos');
        container.innerHTML = '';

        if (pedidos.length === 0) {
            container.innerHTML = '<p>Você ainda não fez nenhum pedido.</p>';
            return;
        }

        pedidos.forEach(pedido => {
            const div = document.createElement('div');
            div.classList.add('pedido');

            div.innerHTML = `
                <p><strong>Data:</strong> ${new Date(pedido.dataPedido).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${pedido.status}</p>
                <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
                <ul>
                    ${pedido.produtos.map(p => `<li>${p.produtoId?.nome || 'Produto'} x${p.quantidade}</li>`).join('')}
                </ul>
                `;

                container.appendChild(div);
        });
    })
    .catch(err => {
        console.error('Erro ao carregar pedidos:', err);
    });
}

function carregarListaDesejos() {
    const token = localStorage.getItem('token');
    if (!token) {
    window.location.href = '/login.html';
    return;
    }

    fetch('http://localhost:5000/api/lista-desejos/lista-desejos', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(data => {
    const container = document.getElementById('desejos-container');
    container.innerHTML = ' ';

        if (!data || data.produtos.length === 0) {
        container.innerHTML = '<p>Você ainda não adicionou produtos à lista de desejos.</p>';
        return;
        }

        data.produtos.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('desejo');

        div.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="removerDesejo('${produto._id}')">Remover</button>
        `;

        container.appendChild(div);
        });
    })
    .catch(err => {
        console.error('Erro ao carregar lista de desejos:', err);
    });
}

function removerDesejo(produtoId) {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/api/lista-desejos/lista-desejos/${produtoId}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        carregarListaDesejos(); // Atualiza a lista
    })
    .catch(err => {
        console.error('Erro ao remover produto:', err);
    });
}

function carregarPerfil() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/auth/dashboard', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(user => {
        document.getElementById('nome').value = user.name;
        document.getElementById('email').value = user.email;
    })
    .catch(err => console.log('Erro ao carregar perfil: ', err));
}

function mostrarSecao (id) {
    document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';

    if (id === 'lista-desejos') carregarListaDesejos();
    if (id === 'meus-pedidos') carregarProdutos();
    if (id === 'perfil') carregarPerfil();
}

document.getElementById('form-perfil').addEventListener('submit', function (e) {
e.preventDefault();

const token = localStorage.getItem('token');
const name = document.getElementById('nome').value;
const email = document.getElementById('email').value;

fetch('http://localhost:5000/api/auth/dashboard', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, email })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => console.error('Erro ao atualizar perfil:', err));
});


document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Você deslogou!');
    window.location.href = 'login.html';
});