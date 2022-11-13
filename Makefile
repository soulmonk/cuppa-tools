include Makefile.common.mk

## Old cuppa build system:

build-and-push: ## Build app, build and push docker image to private registry, update deployment
	@-$(MAKE) build-node-prod build-and-push-node-docker-remote update-deployment

build-and-push-node-docker-remote: ## Build and push docker image to private registry
	@echo Start building $(name):v$(version)
	docker build -t cuppa/${name}:v${version} --platform linux/arm64 -f ./tools/deployment/$(name)/Dockerfile .
	docker tag cuppa/${name}:v${version} rpisoulv1.kube:31320/cuppa/${name}:v${version}
	docker push rpisoulv1.kube:31320/cuppa/${name}:v${version}
	@echo "docker pushed"

update-deployment: ## Update deployment
	@echo "updating deployment"
	yq e -i '(select(documentIndex == 0) | .spec.template.spec.containers.0.image) = "cuppa/${name}:v${version}"' tools/kubernetes/${name}/deployment.yaml
	@-$(MAKE) apply-kube

apply-kube: ## Apply kubernetes deployment
	kubectl --kubeconfig  ~/.kube/config.cuppa-cluster-1 apply -f tools/kubernetes/${name}/deployment.yaml

build-node-local: ## Build app and docker to run application locally
	@-$(MAKE) build-app build-docker-local

build-node-prod: ## Build node js app production npx
	@echo Build sourcecode
	npx nx run ${name}:build --configuration=production

build-npm-app: ## Build node js app via npm
	npm run build ${name}

## Docker:

build-docker-local: ## Build docker image to run application locally
	docker build -t cuppa-${name} -f ./tools/deployment/$(name)/Dockerfile .

run-docker-local: ## Run docker image locally
	docker run -d --name cuppa-${name} -p ${port}:${port} -e PORT=${port} cuppa-${name}
