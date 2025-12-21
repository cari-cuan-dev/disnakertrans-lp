FROM node:24.12.0-alpine3.22

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm i -g npm pnpm
RUN pnpm i
RUN pnpm build

CMD pnpm start