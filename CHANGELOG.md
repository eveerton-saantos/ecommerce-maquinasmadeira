# Changelog

Todas as mudanças importantes deste projeto serão documentadas neste arquivo.

O formato segue os princípios de versionamento semântico: MAJOR.MINOR.PATCH

---

## [1.1.2] - 2025-07-01
### adicionado
- Botão para marcar/desmarcar produtos como destaque no admin (toggle direto)
- Selo visual na página do produto quando for destaque
- Rota PATCH `/produtos/:id` para updates parciais no backend

---

## [1.1.0] - 2025-06-29

### Adicionado
- Novos arquivos CSS para componentes específicos: `cart.css`, `footer.css`, `product.css`, `style-system.css`
- Ícone da bandeira do Brasil para identificar idioma ou localização

### Alterado
- Refatoração do `script.js` com uso de `data-*` attributes e nova função `editarViaDataset()`, resolvendo bug na edição do primeiro produto
- Lógica de truncamento de descrição adicionada via JavaScript (`limitarDescricaoProdutos`)
- Organização dos estilos separando `header.css`, `footer.css` e removendo `styles.css` antigo
- Melhoria na exibição visual dos produtos no painel (cards responsivos com descrições compactadas)

### Corrigido
- Bug que impedia a edição do primeiro produto no dashboard por quebra de string no `onclick`

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

---

Esse changelog segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) 📄  
Versionamento semântico conforme [SemVer.org](https://semver.org/lang/pt-BR/) 🔖