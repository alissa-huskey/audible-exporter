PACKAGE = audible-exporter

rootdir := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
rootdir := $(rootdir:/=)

builddir = ${rootdir}/build
srcdir  = ${rootdir}/src

a = dev util element
b = $(a:%=src/%.js)

c = list page book-page library-page library order-page orders exporter runner
d = $(c:%=src/%.js)

$(builddir)/audible-exporter.js: $(builddir)/status-notifier.js $(d)
	cat $^ > build/audible-exporter.js
 
$(builddir)/notifier.js: builddir
	cat $(b) > build/status-notifier.js
	@sed  -e '/CSS_MARKER/r src/status-notifier.css' -e 'x;$$G' -e '/CSS_MARKER/d' src/status-notifier.js >> build/status-notifier.js

builddir:
	mkdir -p ${builddir}
