#!/bin/bash

# Load environment variables from .env file
export $(dotenv -f .env.local list | xargs)

# Run Docker command using environment variables
docker run --name pg_container \
  -e POSTGRES_PASSWORD=$DATABASE_PASSWORD \
  -e POSTGRES_DB=$DATABASE_NAME \
  -e POSTGRES_USER=$DATABASE_USER \
  -d -p $DATABASE_PORT:5432 \
  docker.io/postgres