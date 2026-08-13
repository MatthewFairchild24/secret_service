FROM node:18-alpine AS builder

WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM node:18-alpine AS production

WORKDIR /backend
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /backend/dist ./dist
EXPOSE 8000

CMD ["node","dist/main.js"]