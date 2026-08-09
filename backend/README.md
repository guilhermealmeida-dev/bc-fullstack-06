# Bootcamp API

## Sobre o Projeto

O Bootcamp API é uma plataforma que permite o cadastro de usuários, gerenciamento de atividades e acompanhamento de progresso dentro do sistema. Os usuários podem definir seus interesses, criar atividades, participar de eventos, realizar check-in, concluir atividades e receber XP e medalhas (achievements) conforme sua participação.

Além disso, a aplicação possui autenticação baseada em JWT e integração com o LocalStack para armazenamento de imagens utilizando uma implementação compatível com o Amazon S3.

---

## Principais Funcionalidades

### Usuários
- Cadastro de usuários.
- Login e autenticação com JWT.
- Atualização de dados cadastrais.
- Definição de preferências/interesses.
- Upload de avatar.
- Desativação de conta.

### Atividades
- Criação de atividades.
- Atualização e exclusão de atividades.
- Aprovação de atividades.
- Consulta de atividades disponíveis.
- Inscrição e cancelamento de inscrição.
- Check-in em atividades.
- Conclusão de atividades.
- Consulta de participantes.
- Consulta de atividades criadas pelo usuário.
- Consulta de atividades em que o usuário participa.

### Gamificação
- Sistema de XP.
- Conquista de medalhas (Achievements).
- Acompanhamento de progresso do usuário.

### Armazenamento de Imagens
- Upload de imagens utilizando LocalStack (S3).
- Gerenciamento de avatares dos usuários.

---

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs
- Multer
- AWS SDK
- LocalStack
- Docker
- Swagger/OpenAPI
- Jest

---

## Estrutura do Projeto

```text
src
├── controllers
├── services
├── repository
├── middlewares
├── validations
├── prisma
├── docs
├── types
├── utils
├── app.ts
└── server.ts
```

### Camadas

| Camada | Responsabilidade |
|----------|------------------|
| Controllers | Receber e responder requisições HTTP |
| Services | Regras de negócio |
| Repository | Acesso ao banco de dados |
| Middlewares | Validações, autenticação e tratamento de erros |
| Prisma | Migrations, schema e acesso ao banco |
| Docs | Documentação Swagger |
| Utils | Funções auxiliares |

---

# Configuração do Ambiente

## Instalação das Dependências

```bash
npm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

SERVER_URL=http://localhost

DATABASE_URL=postgresql://bootcamp:bootcamp@localhost:5432/bootcamp?schema=public
# DATABASE_URL=postgresql://bootcamp:bootcamp@postgresql-bootcamp-sysmap:5432/bootcamp?schema=public

JWT_SECRET=kjkldjidjuiuerrjriorujtnknfofuuiouijkldldjfuufjnfrriourjrnlairufg

BUCKET_NAME=bootcamp

S3_ENDPOINT=http://localhost:4566
# S3_ENDPOINT=http://localstack-bootcamp-sysmap:4566

AWS_REGION=us-east-1
AWS_ACCESS_KEY=test
AWS_SECRET_ACCESS_KEY=test
```

---

# Scripts Disponíveis

| Comando | Descrição |
|----------|-----------|
| `npm run dev` | Executa a aplicação em modo desenvolvimento |
| `npm run build` | Compila o projeto |
| `npm start` | Executa a versão compilada |
| `npm run generate` | Gera o cliente Prisma |
| `npm run migrate-dev` | Executa migrations em ambiente de desenvolvimento |
| `npm run migrate-deploy` | Executa migrations em produção |
| `npm run reset` | Reseta o banco de dados |
| `npm run seed` | Popula o banco com dados iniciais |
| `npm run generate-doc` | Gera a documentação Swagger |
| `npm test` | Executa os testes automatizados |

---

## Executando o Projeto

### 1. Gerar o Cliente Prisma

```bash
npm run generate
```

### 2. Executar as Migrations

```bash
npm run migrate-dev
```

### 3. Popular o Banco de Dados

```bash
npm run seed
```

### 4. Iniciar a Aplicação

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

---

## Documentação da API

A documentação da API é gerada utilizando Swagger/OpenAPI.

Após iniciar a aplicação, a documentação poderá ser acessada através do endereço configurado no projeto.

Principais grupos de endpoints:

### Auth
- Registro de usuário
- Login

### User
- Consulta de perfil
- Atualização de dados
- Definição de preferências
- Upload de avatar
- Desativação de conta

### Activities
- Criação de atividade
- Atualização de atividade
- Exclusão de atividade
- Aprovação
- Inscrição
- Cancelamento de inscrição
- Check-in
- Conclusão
- Consulta de participantes
- Consulta de atividades

---

## Banco de Dados

O projeto utiliza PostgreSQL juntamente com Prisma ORM.

As migrations podem ser encontradas em:

```text
src/prisma/migrations
```

O schema principal está localizado em:

```text
src/prisma/schema.prisma
```

---

## Upload de Arquivos

O upload de imagens é realizado através do Multer e armazenado em um bucket S3 utilizando o LocalStack.

Configurações principais:

```env
BUCKET_NAME=bootcamp
S3_ENDPOINT=http://localhost:4566
```

---

## Testes

Para executar os testes automatizados:

```bash
npm test
```

Os testes são desenvolvidos utilizando:

- Jest
- Supertest

---

## Arquitetura

A aplicação segue uma arquitetura em camadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database (Prisma/PostgreSQL)
```

Essa separação facilita a manutenção, reutilização de código e realização de testes.

---

## Autor

Projeto desenvolvido por Guilherme Almeida como parte do Bootcamp SysMap.