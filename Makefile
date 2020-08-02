ENV_LOCAL_FILE := .env.local
ENV_LOCAL = $(shell cat $(ENV_LOCAL_FILE))

.PHONY: run-db-local
run-db-local:
	$(ENV_LOCAL) docker-compose \
    -f docker/docker-compose.local.yml \
    -p local up -d

.PHONY: stop-db-local
stop-db-local:
	$(ENV_LOCAL) docker-compose \
    -f docker/docker-compose.local.yml \
    down
