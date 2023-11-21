FROM node:18.18.0

WORKDIR /attendance-bot

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY src/ ./src/

EXPOSE 4000

CMD ["npm", "start"]
