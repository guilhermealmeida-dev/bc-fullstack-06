FROM node:24.18.0

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run generate
RUN npm run build

RUN rm -rf src

EXPOSE 3000

CMD [ "npm", "start" ]