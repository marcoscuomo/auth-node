FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . . 

expose 3333

CMD ["npm", "run", "dev"]