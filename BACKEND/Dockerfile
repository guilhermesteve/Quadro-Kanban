
FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 5001

CMD [ "npm","run", "dev" ]