#!/bin/bash

docker-compose up -d nginx_proxy

sleep 1

docker-compose up -d mongo

sleep 1

docker-compose up -d api_gateway

sleep 1

docker-compose up
