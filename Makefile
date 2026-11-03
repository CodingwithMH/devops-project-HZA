SRC_DIR := src
OUT_DIR := out
SOURCES := $(wildcard $(SRC_DIR)/*.md)
OUTPUTS := $(patsubst $(SRC_DIR)/%.md,$(OUT_DIR)/%.html,$(SOURCES))

.PHONY: all check deps build lint coverage test package clean ci show

all: test

$(OUT_DIR):
	mkdir -p $(OUT_DIR)

node_modules: package-lock.json
	npm ci
	@touch node_modules

deps: node_modules

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md package-lock.json | $(OUT_DIR) node_modules
	@echo "  BUILD $< -> $@"
	@npm run --silent build -- $< $@

check:
	@if [ ! -d "$(SRC_DIR)" ] || [ -z "$(SOURCES)" ]; then \
	  echo "ERROR: no .md files found in $(SRC_DIR)"; exit 1; \
	fi
	@echo "check: found $(words $(SOURCES)) source file(s) in $(SRC_DIR)"

lint: node_modules
	npm run --silent lint

build: $(OUTPUTS)

test: build
	@npm test --silent

coverage: build
	@mkdir -p coverage
	node --test --experimental-test-coverage \
		--test-reporter=spec --test-reporter-destination=stdout \
		--test-reporter=lcov --test-reporter-destination=coverage/lcov.info

package: test
	npm pack

clean:
	rm -rf $(OUT_DIR) coverage *.tgz

ci: clean deps check lint test package

show:
	@echo "SOURCES = $(SOURCES)"
	@echo "OUTPUTS = $(OUTPUTS)"
