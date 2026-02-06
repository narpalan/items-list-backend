# 📦 Backend - Sistema de Gerenciamento de Itens

## 📝 Descrição

Uma API RESTful desenvolvida para gerenciamento completo de itens através de operações CRUD, incluindo:

- **Arquitetura em camadas**: Separação clara entre controllers, repositories e database para manutenibilidade.
- **Validação robusta**: Validação de dados de entrada com mensagens de erro claras.
- **Persistência local**: Banco de dados SQLite com timestamps automáticos.
- **Tipagem completa**: 100% TypeScript com interfaces bem definidas.
- **Tratamento de erros**: Middleware de erro padronizado com respostas HTTP apropriadas.
- **Hot-reload**: Desenvolvimento ágil com tsx watch.


## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org) (v. 18+) com ES Modules
- [Express.js](https://expressjs.com) (v. 5) para roteamento e middleware.
- [Better-SQLite3](https://github.com/WiseLibs/better-sqlite3) para banco de dados síncrono e performático.
- [TypeScript](https://www.typescriptlang.org) para tipagem estática.
- [tsx](https://github.com/privatenumber/tsx) para execução e hot-reload em desenvolvimento.
- [CORS](https://github.com/expressjs/cors) para permitir requisições cross-origin.


## 🚀 Como Usar

Siga os passos abaixo para instalar e rodar o projeto localmente:

0. Caso não tenha, instale o [Node.js](https://nodejs.org) em uma versão >=18.x

1. Clone ou navegue até a pasta do backend:
   cd backend

2. Instale as dependências:
   npm install

3. Execute o projeto:
   npm run dev

4. Acesse a API no navegador ou via cliente HTTP:
   http://localhost:5000

   Endpoint de health check:
   http://localhost:5000/health


> Certifique-se de que a porta 5000 esteja disponível.

## 📚 Endpoints da API

### Health Check
- GET /health - Verifica status da API

### Itens
| Metodo | Endpoint   | Descricao              |
|--------|------------|------------------------|
| GET    | /itens     | Lista todos os itens   |
| GET    | /itens/:id | Busca item por ID      |
| POST   | /itens     | Cria novo item         |
| PUT    | /itens/:id | Atualiza item existente|
| DELETE | /itens/:id | Remove item            |

### Exemplos de Requisicao

Criar item:
curl -X POST http://localhost:5000/itens \
  -H "Content-Type: application/json" \
  -d '{"name": "Notebook", "quantity": 5}'

Atualizar item:
curl -X PUT http://localhost:5000/itens/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 10}'


## 🗄️ Modelo de Dados

interface Item {
  id: number;          // Auto-incremento
  name: string;        // Nome do item (obrigatorio)
  quantity: number;    // Quantidade >= 0
  created_at: Date;    // Timestamp automatico
  updated_at: Date;    // Atualizado via trigger
}


## 🎯 Motivacao

O projeto foi criado como base para aplicacoes fullstack que necessitem de uma API simples mas robusta para gerenciamento de dados. A escolha do SQLite permite portabilidade total sem necessidade de configuracao de servidores de banco de dados externos, ideal para prototipagem e aplicacoes de pequeno a medio porte.

## 📈 Futuras Funcionalidades

- **Paginacao** para listagem de grandes volumes de dados.
- **Filtros e busca** por nome ou faixa de quantidade.
- **Autenticacao JWT** para protecao de endpoints.
- **Testes unitarios** com Jest ou Vitest.
- **Dockerizacao** para deploy simplificado.
- **Sistema de migrations**: Implementar migrations de banco de dados versionadas para permitir evolucao controlada do schema, facilitando alteracoes em tabelas existentes em ambientes de producao sem perda de dados.
- **Zod para validacao de schemas**: Substituir a validacao manual por schemas declarativos com Zod, permitindo validacao automatica de tipos, transformacao de dados e mensagens de erro padronizadas diretamente nas requisicoes HTTP.

## 📜 Licenca

Licenca a definir.