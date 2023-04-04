#DEV STAGE
FROM node:16 as base
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci
COPY src ./src

CMD [ "npm", "run", "watch" ]

#BUILD
FROM node:16 as builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .
RUN npm run build

#PROD STAGE
FROM node:16

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --only=production
COPY src ./src

COPY --from=builder /app/dist .

ENV NODE_ENV=production

CMD [ "node", "dist/server.js" ]

EXPOSE 8080
