FROM node:slim

ENV NODE_ENV development

WORKDIR /express-docker

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "node", "app.js" ]
