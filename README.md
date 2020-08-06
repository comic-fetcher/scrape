# Comicfetcher.scrape

## Housekeeping

[![CircleCI](https://circleci.com/gh/comic-fetcher/scrape.svg?style=svg)](https://circleci.com/gh/comic-fetcher/scrape)
[![codecov](https://codecov.io/gh/comic-fetcher/scrape/branch/develop/graph/badge.svg)](https://codecov.io/gh/comic-fetcher/scrape)

## Setup

### Environment Variables

See `.env.example`

```dotenv
DB_HOST = "localhost"
DB_PORT = 3306
DB_DATABASE = "cf"
DB_USER = "test"
DB_PASSWORD = "test"
```

### Local DB

_Requirements_: make, [docker-compose](https://docs.docker.com/compose/install/)

#### for local development

MySQL 5.7 & phpmyadmin

```
make up-local-db

make down-local-db
```

#### for test

MySQL 5.7 only

```
make up-test-db

make down-test-db
```

### CircleCI local check

_Requirements_: [CircleCI Local CLI](https://circleci.com/docs/2.0/local-cli/#installation)

```
circleci local execute --job test

circleci local execute --job lint
```
