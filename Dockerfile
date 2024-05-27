FROM node:20.10.0-bullseye

RUN ln -sf /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime
RUN npm install -g npm@latest
RUN npm install pm2 -g

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD [ "pm2-runtime","start", "src/app.js","-i","max" ]
