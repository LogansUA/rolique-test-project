#!/bin/bash

docker-compose up -d entrypoint

sleep 1

docker-compose up -d api_gateway

sleep 1

docker-compose up -d db_mongo_books
docker-compose up -d db_mongo_users

sleep 1

docker-compose up
