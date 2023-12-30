FROM node:lts
WORKDIR /usr/src/app

COPY ./package*.json .
RUN npm install

COPY . .

ENV PORT 80

# ENTRYPOINT [ "npm", "run", "dev" ]
ENTRYPOINT [ "npm", "start"]
