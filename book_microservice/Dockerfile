FROM node:8

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "run", "start" ]
