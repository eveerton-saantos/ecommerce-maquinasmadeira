# E-commerce Máquinas Madeira

Este projeto é um e-commerce voltado para a comercialização de máquinas e equipamentos de marcenaria, desenvolvido com foco na experiência do usuário, performance e escalabilidade.

## Estrutura do Projeto

### Frontend _(desde a versão 1.0.0)_

- Páginas implementadas:
  - `index.html`: página inicial
  - `product.html`: página de detalhes do produto
  - `cart.html`: carrinho de compras
  - `checkout.html`: em desenvolvimento _(versão planejada 1.1.0)_
- Estilos organizados em `/styles` (`header.css`, `footer.css`, `style.css`, etc.)
- Recursos visuais armazenados em `/assets`

### Backend _(desde a versão 1.0.0)_

- Funcionalidades:
  - Adicionar, editar e remover produtos
  - API desenvolvida em Node.js com Express
  - Banco de dados MongoDB para armazenamento das informações dos produtos
- Organização modular do código:
  - Modelos em `/models`
  - Lógica principal no `server.js` e `script.js`

### Integração de Pagamentos _(previsto para a versão 1.1.0)_

- Página de checkout já construída, aguardando conexão com a API da Pagar.me
- Futuras funcionalidades com a API:
  - Processamento de pagamento
  - Cancelamento e estorno
  - Atualização de status (aprovado, recusado, pendente)

## Funcionalidades Atuais _(versão 1.0.0)_

- Navegação responsiva e fluida
- Sistema **CRUD** de produtos totalmente funcional
- Separação clara entre frontend e backend
- Adição de produtos ao carrinho com controle de quantidade
- Armazenamento do carrinho via `localStorage`

## Interface Overview

![Homepage](./assets/screenshots/backend/dashboard-adm.png)
*Página Dashboard destacando os produtos já adicionados ao site*
![Homepage](./assets/screenshots/backend/dashboard-adm-edit.png)
*Seção de editação dos produtos no Dashboard*

![Homepage](./assets/screenshots/frontend/home.png)
*Página inicial com destaque para produtos e menu fixo.*
![Homepage](./assets/screenshots/frontend/product.png)
*Detalhes do produto com controle de quantidade e botão*
![Homepage](./assets/screenshots/frontend/cart.png)
*Carrinho com visual limpo*

## Próximas Etapas _(planejadas para versões 1.1.x e 1.2.0)_

- Concluir integração com a Pagar.me
- Adicionar sistema de autenticação de administradores
- Implementar testes automatizados
- Realizar o deploy do sistema em ambiente escalável
- Criar sistema de login para usuários finais
- Permitir avaliação de produtos por usuários autenticados
- Adicionar painel de destaque no dashboard para selecionar produtos em promoção
- Implementar lógica de preço promocional:
  - Exibir valor original com traço
  - Mostrar valor com desconto
  - Calcular e exibir porcentagem de economia

