FROM node:14.11.0-alpine3.11

WORKDIR /app

COPY package.json ./
RUN yarn install
COPY . ./

CMD ["yarn", "start"] 
