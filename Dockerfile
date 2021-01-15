FROM node:14.15.4-alpine3.12

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY ./src ./src

CMD [ "npm","start" ]