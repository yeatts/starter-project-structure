FROM node:20-alpine AS builder
WORKDIR /app
COPY client/package*.json ./client/
COPY server/src/router.ts ./server/src/router.ts
COPY server/src/modules ./server/src/modules
RUN cd client && npm ci
COPY client ./client
RUN cd client && npm run build

FROM nginx:alpine
COPY --from=builder /app/client/dist /usr/share/nginx/html
EXPOSE 80
