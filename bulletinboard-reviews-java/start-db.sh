#!/bin/sh

docker volume create bb_reviews_local_java

docker run \
      --rm \
      -e POSTGRES_HOST_AUTH_METHOD=trust \
      -v bb_reviews_local_java:/var/lib/postgresql/data \
      --name postgres-bulletinboard-reviews \
      -p 6543:5432 \
      postgres:14-alpine
