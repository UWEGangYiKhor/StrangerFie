FROM node:20 AS base

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED 1
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
ADD . ./
ADD next.config_docker.mjs ./next.config.mjs
RUN npm install
RUN npm install --os=linux --libc=gnu --cpu=x64 sharp
RUN npm install @next/swc-linux-x64-gnu
RUN npm run build
RUN npm prune --omit=dev

FROM base AS production
RUN mkdir -p /app
WORKDIR /app
RUN mkdir .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD HOSTNAME="0.0.0.0" node server.js