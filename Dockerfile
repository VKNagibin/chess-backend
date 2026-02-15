FROM node:18-slim

RUN apt-get update && \
    apt-get install -y stockfish && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN useradd -r developer && chown -R developer:developer /app
USER developer

EXPOSE 3000

CMD ["node", "src/index.js"]