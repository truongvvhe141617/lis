ENV_MAKEFILE=.env.makefile
ifneq (,$(wildcard ./$(ENV_MAKEFILE)))
    include $(ENV_MAKEFILE)
    export
endif

BUILD_TIME=$(shell date +"%Y%m%d_%H%M%S")
BUILDFILES_FOLDER=buildfiles
BUILDFILES_PATH=${BUILDFILES_FOLDER}/${PROJECT_NAME}_${ENV_TARGET}_$(IMAGE_TAG_VERSION)_webapp_$(BUILD_TIME)

BUILD_IMAGE_REGISTRY_PATH=$(REGISTRY_NAME)/${PRODUCT_NAME}-${PROJECT_NAME}/${ENV_TARGET}
BUILD_IMAGE_TAG=${BUILD_IMAGE_REGISTRY_PATH}:${IMAGE_TAG_VERSION}-webapp
BUILD_IMAGE_TAG_RELEASE=${BUILD_IMAGE_REGISTRY_PATH}:release-webapp
BUILD_IMAGE_TAG_LATEST=${BUILD_IMAGE_REGISTRY_PATH}:latest-webapp

DOCKER_COMPOSE_CICD_FILE=docker-compose.cicd.webapp.yml
DOCKER_COMPOSE_ARGS=-f ${DOCKER_COMPOSE_CICD_FILE}

.PHONY: all checkout build build.base push deploy check_vars release clean create_env_file export_buildfiles build_and_push tag_latest

all: build

check_vars:
	@if [ -z "$(REGISTRY_NAME)" ]; then echo "ERROR: REGISTRY_NAME is not set"; exit 1; fi
	@if [ -z "$(PRODUCT_NAME)" ]; then echo "ERROR: PRODUCT_NAME is not set"; exit 1; fi
	@if [ -z "$(PROJECT_NAME)" ]; then echo "ERROR: PROJECT_NAME is not set"; exit 1; fi
	@if [ -z "$(ENV_TARGET)" ]; then echo "ERROR: ENV_TARGET is not set"; exit 1; fi
	@if [ -z "$(IMAGE_TAG_VERSION)" ]; then echo "ERROR: IMAGE_TAG_VERSION is not set"; exit 1; fi
	@if [ -z "$(REGISTRY_PASSWORD)" ]; then echo "ERROR: REGISTRY_PASSWORD is not set"; exit 1; fi
	@if [ -z "$(REGISTRY_USERNAME)" ]; then echo "ERROR: REGISTRY_USERNAME is not set"; exit 1; fi

checkout: check_vars
	@echo ">> Pulling [${GIT_BRANCH_NAME}] from SCM"
	git checkout ${GIT_BRANCH_NAME}
	# git pull

create_env_file: check_vars
	@echo ">> Create [.env] file"
	cp webapp.env.${ENV_TARGET} .env
	echo "" >> .env
	echo DOCKER_REGISTRY=${BUILD_IMAGE_REGISTRY_PATH} >> .env
	echo TAG=${IMAGE_TAG_VERSION} >> .env

build: checkout create_env_file
	@echo ">> Building [${GIT_BRANCH_NAME}] for env [${ENV_TARGET}]"
	docker build --pull . --tag $(BUILD_IMAGE_TAG)

export_buildfiles: check_vars create_env_file
	@echo "---- Export conf files ----"
	mkdir -p $(BUILDFILES_PATH)
	cp .env $(BUILDFILES_PATH)/.env

build.base:
	@echo ">> Building base image for building webapp"
	docker build -f Dockerfile.base --pull -t iolis/iolis:base-core .

push: check_vars
	@echo ">> Connecting to registry [$(REGISTRY_NAME)] with user [$(REGISTRY_USERNAME)] ..."
	@echo ${REGISTRY_PASSWORD} | docker login $(REGISTRY_NAME) --username "${REGISTRY_USERNAME}" --password-stdin
	@echo ">> Pushing build image(s) to registry [$(BUILD_IMAGE_REGISTRY_PATH)]"
	docker push $(BUILD_IMAGE_TAG)

release: check_vars
	@echo ">> Tagging release + latest for env [$(ENV_TARGET)]"
	docker tag $(BUILD_IMAGE_TAG) $(BUILD_IMAGE_TAG_RELEASE)
	docker tag $(BUILD_IMAGE_TAG) $(BUILD_IMAGE_TAG_LATEST)
	@echo ">>> Pushing release tag: $(BUILD_IMAGE_TAG_RELEASE)"
	docker push $(BUILD_IMAGE_TAG_RELEASE)
	@echo ">>> Pushing latest tag: $(BUILD_IMAGE_TAG_LATEST)"
	docker push $(BUILD_IMAGE_TAG_LATEST)

tag_latest: check_vars
	@echo ">> Tagging existing build as latest"
	docker tag $(BUILD_IMAGE_TAG) $(BUILD_IMAGE_TAG_LATEST)
	docker push $(BUILD_IMAGE_TAG_LATEST)

build_and_push: build push

deploy: check_vars
	@echo ">> Deploying WebApp [$(ENV_TARGET)] ..."
	docker compose $(DOCKER_COMPOSE_ARGS) pull
	docker compose $(DOCKER_COMPOSE_ARGS) down --remove-orphans
	docker compose $(DOCKER_COMPOSE_ARGS) up -d --remove-orphans

clean:
	@echo ">> Cleaning up build files"
	rm -rf $(BUILDFILES_FOLDER)
	@echo ">> Removing unused Docker images"
	docker image prune -f
	@echo ">> Removing unused Docker volumes"
	docker volume prune -f
	@echo ">> Removing unused Docker networks"
	docker network prune -f
