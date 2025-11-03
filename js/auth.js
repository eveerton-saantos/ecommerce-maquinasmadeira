// === REGISTRO ===
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Conta criada com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Erro ao registrar');
        }
        } catch (err) {
        console.error('Erro no registro:', err);
        alert('Erro ao conectar com o servidor');
        }
    });
}

// === LOGIN ===
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        try {
            const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            alert('Login realizado com sucesso!');
            // Redirecionar para página protegida
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Email ou senha inválidos');
        }

    } catch (err) {
        console.error('Erro no Login', err);
        alert('Erro ao conectar com o servidor');
    }
    });
}