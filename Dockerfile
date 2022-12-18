FROM node:16.16.0

RUN mkdir -p /api-teller-story
WORKDIR /api-teller-story

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "run", "dev"]