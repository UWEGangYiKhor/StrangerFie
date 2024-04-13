FROM node:20.3-alpine AS base
ARG RAPID_API_KEY
ARG DB_URL

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED 1
RUN mkdir -p /app
COPY package*.json /app/
ADD . /app/
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm prune --production

FROM base AS production
ENV NODE_ENV=production
ENV RAPID_API_KEY=$RAPID_API_KEY
ENV POSTGRES_PRISMA_URL=$DB_URL
RUN mkdir -p /app
WORKDIR /app
COPY --from=builder /app/public ./public
RUN mkdir .next
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD HOSTNAME="0.0.0.0" node server.js