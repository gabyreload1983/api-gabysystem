FROM node:18.13.0

RUN ln -sf /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime
RUN npm install pm2 -g

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD [ "pm2-runtime","start", "src/app.js","-i","max" ]
