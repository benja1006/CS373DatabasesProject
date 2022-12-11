#!/usr/bin/env bash

docker compose up --wait
echo "Waiting for server to be ready..."
for i in 1 2 3 4 5 6 7 8 9
do
echo "$i"
sleep 1
done
open http://localhost:3000/
