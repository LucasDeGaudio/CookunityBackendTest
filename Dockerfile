FROM node:16 as base
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN ls -a
RUN npm install
RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/server.js" ]