PACKAGE = audible-exporter

rootdir      := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
rootdir      := $(rootdir:/=)

builddir      = ${rootdir}/build
srcdir        = ${rootdir}/src

notifier_deps = dev util element status-notifier
deps          = list page book-page library-page library-fetcher order-page orders-fetcher exporter runner

clean:
	@rm -f $(builddir)/*

rebuild: clean build

build: builddir | $(builddir)/audible-exporter.js

$(builddir)/audible-exporter.js: $(builddir)/status-notifier.js $(deps:%=src/%.js)
	cat $^ > build/audible-exporter.js
 
$(builddir)/status-notifier.js: builddir
	cat $(notifier_deps:%=src/%.js) | sed  -e '/CSS_MARKER/r src/notifier.css' -e 'x;$$G' -e '/CSS_MARKER/d' > build/status-notifier.js

builddir:
	mkdir -p ${builddir}

.PHONY: build clean rebuild
.DEFAULT_GOAL := rebuild
