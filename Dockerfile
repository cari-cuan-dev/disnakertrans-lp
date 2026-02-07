FROM node:24.12.0-alpine3.22

ENV NODE_ENV=production

WORKDIR /app

RUN npm i -g pnpm

COPY . .

RUN pnpm i --frozen-lockfile

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]