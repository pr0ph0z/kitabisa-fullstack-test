# Kitabisa Fullstack Engineer Test

## Introduction

This repository contains for the technical test assignment for Kitabisa as a Fullstack Engineer.

## Tech Stack

- Laravel
- PostgreSQL
- React.js
- Vite

## How to run

There's a `docker-compose.yml` available so you can spin up the service in a single `docker compose up -d` command. After the services are up, execute Laravel migration command with `docker exec backend php artisan migrate --seed`. The services will run on the local machines with:

- Port `8000` for the backend
- Port `8081` for the frontend

## Caveats

There are several points that I envisioned. However I did not succeed to achieve those points that could be used as an improvements:

1. A nice and proper UI
2. Unit tests
3. Well structured code and design pattern
4. Currency rate-locking mechanisms
