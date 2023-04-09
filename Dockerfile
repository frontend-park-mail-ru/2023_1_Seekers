FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prod

EXPOSE 8002

CMD npm run start
