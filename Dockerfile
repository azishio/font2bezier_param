FROM node:lts-buster-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package.json ./
COPY pnpm-lock.yaml* ./

RUN npm install -g pnpm
RUN pnpm i --frozen-lockfile

CMD ["pnpm", "dev"]