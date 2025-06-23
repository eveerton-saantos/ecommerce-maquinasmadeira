# Changelog

Todas as mudanças importantes deste projeto serão documentadas neste arquivo.

O formato segue os princípios de versionamento semântico: MAJOR.MINOR.PATCH

---

## [1.0.0] - 2025-06-22

### Adicionado
- Estrutura inicial do frontend com as páginas:
  - `index.html`: página inicial
  - `product.html`: detalhes do produto
  - `cart.html`: carrinho de compras
  - `checkout.html`: página criada, ainda sem integração de pagamentos
- Estilos separados e organizados na pasta `/styles`
- Estruturação de recursos visuais em `/assets`

### Backend
- CRUD de produtos completo com Node.js e Express
- Conexão com banco de dados MongoDB para persistência das informações
- Organização modular com `/models`, `server.js`, e `script.js`

---

## [1.1.0] - Em desenvolvimento

### Adicionado
- Estrutura da página de checkout finalizada aguardando conexão com a API de pagamentos

### Planejado
- Integração com a API da Pagar.me para processamento de pagamentos
- Funcionalidades: aprovação, cancelamento e estorno

---

## [1.2.0] - Futuro

### Planejado
- Sistema de login e autenticação para administradores
- Implementação de testes automatizados
- Deploy em ambiente cloud com versionamento contínuo
