PACKAGE = audible-exporter

rootdir   := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
rootdir   := $(rootdir:/=)

builddir   = ${rootdir}/build
tmpdir     = ${rootdir}/build/tmp
srcdir     = ${rootdir}/src

dom_deps   = dev util element dom
deps       = util element list parser page book-page library-book-row library-page library-fetcher purchase order-row order-page year-fetcher orders-fetcher details-fetcher dom file tsv-file result

clean:
	@rm -rf $(builddir)/*

rebuild: clean build

build: builddir | $(builddir)/audible-exporter.js $(builddir)/modal.js $(builddir)/status-notifier.js
 
$(builddir)/status-notifier.js: builddir | $(tmpdir)/status-notifier.js
	cat $(dom_deps:%=src/%.js) ${tmpdir}/status-notifier.js > ${builddir}/status-notifier.js
 
$(builddir)/modal.js: builddir | $(tmpdir)/modal.js
	cat $(dom_deps:%=src/%.js) ${tmpdir}/modal.js > ${builddir}/modal.js

$(builddir)/audible-exporter.js: $(deps:%=src/%.js) $(tmpdir)/modal.js $(tmpdir)/status-notifier.js $(srcdir)/exporter.js $(srcdir)/runner.js
	cat $^ > build/audible-exporter.js
 
$(tmpdir)/status-notifier.js: builddir
	sed  -e '/CSS_MARKER/r ${srcdir}/notifier.css' -e 'x;$$G' -e '/CSS_MARKER/d' ${srcdir}/status-notifier.js  > ${tmpdir}/status-notifier.js
 
$(tmpdir)/modal.js: builddir
	sed  -e '/CSS_MARKER/r src/modal.css' -e 'x;$$G' -e '/CSS_MARKER/d' ${srcdir}/modal.js > ${tmpdir}/modal.js

builddir:
	mkdir -p ${tmpdir}

.PHONY: build clean rebuild
.DEFAULT_GOAL := rebuild
