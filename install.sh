#!/bin/bash

./fixtures.js

echo Installing dependencies...

cd api_gateway && yarn install &
cd book_microservice && yarn install &
cd user_microservice && yarn install &
cd entrypoint && yarn install &
wait
