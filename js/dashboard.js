const token = localStorage.getItem('token');

if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
} else {
    fetch('http://localhost:5000/api/dashboard', {
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

    fetch('http://localhost:5000/api/meus-pedidos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(pedidos => {
        const container = document.getElementById('lista-pedidos');
        container.innerHTML = '';

        if (pedidos.lenght === 0) {
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

function mostrarSecao (id) {
    document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';

    if (id === 'meus-pedidos') {
        carregarProdutos();
    }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Você deslogou!');
    window.location.href = 'login.html';
});