PACKAGE = audible-exporter

rootdir   := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
rootdir   := $(rootdir:/=)

builddir   = ${rootdir}/build
srcdir     = ${rootdir}/src

dom_deps   = dev util element dom
deps       = list page book-page library-page library-fetcher order-page orders-fetcher details-fetcher exporter runner

clean:
	@rm -f $(builddir)/*

rebuild: clean build

build: builddir | $(builddir)/audible-exporter.js

$(builddir)/audible-exporter.js: $(builddir)/modal.js $(builddir)/status-notifier.js $(deps:%=src/%.js)
	cat $^ > build/audible-exporter.js
 
$(builddir)/status-notifier.js: builddir
	cat $(dom_deps:%=src/%.js) src/status-notifier.js | sed  -e '/CSS_MARKER/r src/notifier.css' -e 'x;$$G' -e '/CSS_MARKER/d' > build/status-notifier.js
 
$(builddir)/modal.js: builddir
	cat $(dom_deps:%=src/%.js) src/modal.js | sed  -e '/CSS_MARKER/r src/modal.css' -e 'x;$$G' -e '/CSS_MARKER/d' > build/modal.js

builddir:
	mkdir -p ${builddir}

.PHONY: build clean rebuild
.DEFAULT_GOAL := rebuild
