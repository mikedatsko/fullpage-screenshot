#!/usr/bin/env bash

docker-compose down
docker ps -aq --no-trunc -f status=exited | xargs docker rm
docker image prune -f
docker-compose build --no-cache

if [ "$1" == "local" ]; then
  docker-compose -f ./docker-compose.yml -f ./docker-compose-local.yml up
else
  docker-compose up -d
fi
