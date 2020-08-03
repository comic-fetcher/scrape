ENV_LOCAL_FILE := .env.local
ENV_LOCAL = $(shell cat $(ENV_LOCAL_FILE))

ENV_TEST_FILE := .env.test
ENV_TEST = $(shell cat $(ENV_TEST_FILE))

.PHONY: up-local-db
up-local-db:
	$(ENV_LOCAL) docker-compose \
    -f docker/docker-compose.deps.base.yml \
    -f docker/docker-compose.deps.local.yml \
    -p local up -d

.PHONY: down-local-db
down-local-db:
	$(ENV_LOCAL) docker-compose \
    -f docker/docker-compose.deps.base.yml \
    -f docker/docker-compose.deps.local.yml \
    -p local down

.PHONY: up-test-db
up-test-db:
	$(ENV_TEST) docker-compose \
    -f docker/docker-compose.deps.base.yml \
    -f docker/docker-compose.deps.test.yml \
    -p test up -d

.PHONY: down-test-db
down-test-db:
	$(ENV_TEST) docker-compose \
    -f docker/docker-compose.deps.base.yml \
    -f docker/docker-compose.deps.test.yml \
    -p test down
