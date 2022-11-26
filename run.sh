#!/usr/bin/env bash

docker compose up --wait
docker exec -it tournament_tracker /bin/bash
