# Stage 1: Build
FROM node:24.12.0-alpine3.22 AS builder
WORKDIR /app
RUN npm i -g pnpm
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: Runner
FROM node:24.12.0-alpine3.22 AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy file yang diperlukan dari stage builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]