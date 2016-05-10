FROM node:4.2.2
RUN mkdir -p /usr/src/wechatoauth
WORKDIR /usr/src/wechatoauth
COPY package.json /usr/src/wechatoauth/
RUN npm install
COPY . /usr/src/wechatoauth
EXPOSE 80
ENTRYPOINT node index.js