FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run generate:importmap && npm run generate:types && npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npm run payload:migrate && npm run start"]
