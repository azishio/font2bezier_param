FROM node:lts-buster-slim

WORKDIR /app

COPY ./package*.json ./
COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm i