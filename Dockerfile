FROM node:16 as base
WORKDIR /app

CMD [ "npm", "run", "watch" ]

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci
COPY src ./src
RUN npm run build

CMD [ "node", "dist/server.js" ]
EXPOSE 8080
