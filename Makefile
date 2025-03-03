PACKAGE = audible-exporter

rootdir   := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
rootdir   := $(rootdir:/=)

builddir   = ${rootdir}/build
tmpdir     = ${rootdir}/build/tmp
srcdir     = ${rootdir}/src

# dl_deps    = book-page library-book-row library-page library-fetcher purchase order-row order-page year-fetcher orders-fetcher details-fetcher dom file tsv-file result
#
dom_deps   = dev util element dom

notifiers    = order library details

base_srcs    = util element list parser page
order_srcs   = purchase order-row order-page year-fetcher orders-fetcher
lib_srcs     = library-book-row library-page library-fetcher
det_srcs     = book-page details-fetcher
dl_srcs      = file tsv-file result
dom_srcs     = dom

srcs         = $(base_srcs) $(order_srcs) $(lib_srcs) $(det_srcs) $(dl_srcs) $(dom_srcs)

tmp_targets  = status-notifier modal
targets      = audible-exporter modal status-notifier $(notifiers:%=%-notifier)


clean:
	@rm -rf $(builddir)/*

rebuild: clean build

build: builddir | $(targets:%=$(builddir)/%.js)

$(builddir)/audible-exporter.js: $(srcs:%=$(srcdir)/%.js) $(tmp_targets:%=$(tmpdir)/%.js)  $(notifiers:%=$(srcdir)/%-notifier.js) $(srcdir)/exporter.js $(srcdir)/runner.js
	@cat $^ > ${builddir}/audible-exporter.js

# standalone status-notifier.js
$(builddir)/status-notifier.js: builddir | $(tmpdir)/status-notifier.js
	@cat $(dom_deps:%=src/%.js) ${tmpdir}/status-notifier.js > ${builddir}/status-notifier.js

# all standalone notifiers
$(notifiers:%=$(builddir)/%-notifier.js): builddir | $(builddir)/status-notifier.js
	@cat ${builddir}/status-notifier.js $(@:$(builddir)/%=$(srcdir)/%) > $@

# standalone modal.js
$(builddir)/modal.js: builddir | $(tmpdir)/modal.js
	@cat $(dom_deps:%=src/%.js) ${tmpdir}/modal.js > ${builddir}/modal.js

# inject CSS into status-notifier.js
$(tmpdir)/status-notifier.js: builddir
	@sed  -e '/CSS_MARKER/r ${srcdir}/notifier.css' -e 'x;$$G' -e '/CSS_MARKER/d' ${srcdir}/status-notifier.js  > ${tmpdir}/status-notifier.js

# inject CSS into modal.js
$(tmpdir)/modal.js: builddir
	@sed  -e '/CSS_MARKER/r src/modal.css' -e 'x;$$G' -e '/CSS_MARKER/d' ${srcdir}/modal.js > ${tmpdir}/modal.js

builddir:
	@mkdir -p ${tmpdir}

.PHONY: build clean rebuild
.DEFAULT_GOAL := rebuild
