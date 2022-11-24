FROM node:18-alpine as base

FROM base as dev
RUN npm install -g npm@9.1.2 \
    && apk add bash git

WORKDIR /home/node/app
