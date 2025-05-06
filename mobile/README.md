
# 📱 Projeto Mobile

Este é o aplicativo mobile do sistema. Para executá-lo corretamente, siga os passos abaixo.

## 🚀 Passos para execução

1. **Acesse o diretório do projeto mobile:**

```bash
cd .mobile
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o endereço do servidor:**

Edite o arquivo `mobile/src/config/env.ts` e defina as variáveis `SERVER_IP` e `API_PORT` com os dados do seu servidor backend.

Exemplo:

```ts
export const SERVER_IP = "192.168.0.100";
export const API_PORT = 3000;
```

> ⚠️ Certifique-se de que o IP e a porta estejam acessíveis pelo emulador ou dispositivo físico.

4. **Execute o sistema:**

Você pode iniciar o sistema de duas formas:

### ✅ Opção 1 - Todos os serviços juntos (recomendado):

```bash
npm run dev
```

Este comando executa:

- `npm run start` – Inicia o Metro bundler (React Native)
- `npm run android` – Instala e abre o app no emulador Android
- `docker compose up` – Sobe os containers do backend, banco de dados, etc.

> ⚠️ Esse comando funciona melhor em sistemas Unix (Linux/Mac). No Windows, recomenda-se usar os comandos separadamente ou utilizar ferramentas como `concurrently`.

### ⚙️ Opção 2 - Comandos separados (use terminais diferentes):

1. Terminal 1:

```bash
npm run start
```

2. Terminal 2:

```bash
npm run android
```

3. Terminal 3:

```bash
docker compose up
```

---

## 📄 Observações

- Certifique-se de que o emulador Android esteja iniciado antes de rodar `npm run android`.
- Verifique se o backend está acessível no IP e porta definidos em `SERVER_IP` e `API_PORT`.

---