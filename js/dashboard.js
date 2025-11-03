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

// Borão de logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Você deslogou!');
    window.location.href = 'login.html';
});