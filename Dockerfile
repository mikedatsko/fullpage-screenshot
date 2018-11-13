FROM m1sh2/nodejs-ubuntu

RUN rm -rf /app && mkdir /app

COPY package.json /app
COPY app.js /app

WORKDIR /app

RUN npm install
