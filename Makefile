include .env

# package
PKG := $(shell basename $(CURDIR))

# runtime
NODE := $(which node)

##
# define
##
define _NODE_MAJOR_VERSION
$(shell node -p "process.version.substr(1,2)")
endef

# call value by key from package.json
define _PACKAGE_KEY
$(shell node -p "require('./package.json')['$(1)']")
endef

# pipe stdout and stderr to folder from .gitignore
define _DEBUG
$(shell $(1) > stdout/stdout.txt 2>stdout/stderr.txt)
endef

# run command
define _RUN
@if [ ${call _NODE_MAJOR_VERSION} -gt 16 ]; then\
	echo "$(eval _OPTS=NODE_OPTIONS=--openssl-legacy-provider)";\
fi
${_OPTS} && $(1)
endef

# test
define _TEST
$(call _RUN, yarn jest --config jest.config.js --verbose --testPathPattern=$(1))
endef

##
# tests
##
test:
	$(call _TEST,src)
	
##
# hooks
##
prepare:
	$(call _RUN, yarn husky install)
