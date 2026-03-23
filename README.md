# CRUD de Usuários

Aplicação fullstack de cadastro de usuários com operações completas de criação, leitura, atualização e remoção. O projeto nasceu com o objetivo de consolidar o fluxo completo de uma aplicação web moderna — desde a interface até o banco de dados — passando por autenticação de dados, comunicação HTTP e deploy em produção.

🔗 **[Acessar aplicação](https://crud-front-back-lnak.vercel.app)**

---

## O que a aplicação faz

- Cadastro de usuários com nome, idade e e-mail
- Validação de campos obrigatórios e formato de e-mail
- Listagem de todos os usuários cadastrados em tempo real
- Edição de dados diretamente pelo formulário
- Remoção de usuários com um clique
- Persistência de dados em banco MongoDB na nuvem

---

## Stack

**Frontend**
- React 19
- Vite 8
- Axios

**Backend**
- Node.js com ES Modules
- Express 5
- Prisma ORM 6.19
- MongoDB Atlas
- CORS
- dotenv

---

## Dependências

### Frontend

| Pacote | Versão | Tipo |
|--------|--------|------|
| react | ^19.2.4 | produção |
| react-dom | ^19.2.4 | produção |
| axios | ^1.13.6 | produção |
| vite | ^8.0.1 | desenvolvimento |
| @vitejs/plugin-react | ^6.0.1 | desenvolvimento |
| eslint | ^9.39.4 | desenvolvimento |
| eslint-plugin-react-hooks | ^7.0.1 | desenvolvimento |
| eslint-plugin-react-refresh | ^0.5.2 | desenvolvimento |
| @eslint/js | ^9.39.4 | desenvolvimento |
| @types/react | ^19.2.14 | desenvolvimento |
| @types/react-dom | ^19.2.3 | desenvolvimento |
| globals | ^17.4.0 | desenvolvimento |

### Backend

| Pacote | Versão | Tipo |
|--------|--------|------|
| express | ^5.2.1 | produção |
| @prisma/client | 6.19 | produção |
| prisma | 6.19 | produção |
| cors | ^2.8.6 | produção |
| @types/node | ^25.5.0 | desenvolvimento |
| tsx | ^4.21.0 | desenvolvimento |

---

## Estrutura do repositório

```
CRUD-_FRONT-BACK/
├── frontend/
│   ├── src/
│   │   ├── pages/home/App.jsx
│   │   ├── services/API.js
│   │   └── assets/
│   └── package.json
│
└── backend/
    ├── server.js
    ├── prisma/
    │   └── schema.prisma
    └── package.json
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no MongoDB Atlas com uma database criada
- Git

### Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` com sua string de conexão:

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDoBanco"
```

Gere o client do Prisma e inicie o servidor:

```bash
npx prisma generate
node server.js
```

A API ficará disponível em `http://localhost:2000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

> Por padrão o `API.js` aponta para a URL de produção. Para rodar localmente, troque a `baseURL` para `http://localhost:2000`.

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/users` | Lista todos os usuários |
| POST | `/users` | Cria um novo usuário |
| PUT | `/users/:id` | Atualiza um usuário pelo ID |
| DELETE | `/users/:id` | Remove um usuário pelo ID |

### Exemplo de body para POST e PUT

```json
{
  "name": "Guilherme",
  "age": "22",
  "email": "gui@gmail.com"
}
```

---

## Schema do banco

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name  String
  age   String
}
```

---

## Deploy

O pipeline de deploy é totalmente automatizado. Qualquer push na branch `main` dispara um novo build em ambos os serviços.

- **Frontend → Vercel**: root directory `frontend`, build com `vite build`
- **Backend → Railway**: root directory `backend`, build com `prisma generate`, start com `node server.js`

---

## Aprendizados

- Configuração de monorepo com frontend e backend no mesmo repositório
- Comunicação entre serviços em domínios diferentes com CORS
- ORM com Prisma e banco não-relacional MongoDB
- Gerenciamento de variáveis de ambiente em produção
- Deploy independente de frontend e backend com CI/CD

---

Feito por [Guilherme Davi](https://github.com/guilhermeDaviDev)
