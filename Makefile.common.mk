PROJECT_NAME := $(shell basename "$(PWD)")

PROJ_BASE := $(shell pwd -LP)

GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
CYAN   := $(shell tput -Txterm setaf 6)
RESET  := $(shell tput -Txterm sgr0)

.DEFAULT_GOAL := help
.PHONY: help
all: help
## Help:
help: ## Show this help.
	@echo 'Current project: "$(PROJECT_NAME)"'
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-24s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		else if (/^[a-zA-Z_-]+:$$/) {printf "  ${YELLOW}%s${WHITE} no docs${RESET} \n", $$1} \
		}' $(MAKEFILE_LIST)
