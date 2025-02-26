Exporter = function() {

  var classes = {
    ul_card: "bc-list bc-list-nostyle",
    title: "bc-size-headline3",
    narrator: "narratorLabel",
    author: "authorLabel",
    series: "seriesLabel",
    categories: "bc-breadcrumb",
    runtime: "runtimeLabel",
    release_date: "releaseDateLabel",
    publisher: "publisherLabel",
    summary: "productPublisherSummary",
    language: "languageLabel",
  };

  return {
    notifier: new StatusNotifier(),
    download_bar_width: document.body.getBoundingClientRect().width * 0.8,

    /* misc functions
     * --------------------------------------------------------------------------------
     */

    unq: (arr) => arr.filter((e, p, a) => a.indexOf(e) == p),
    unqHsh: (a, o) => (a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true))),

    unqKey: function(array, key) {
      var q = [];
      var map = new Map();
      for (const item of array) {
        if (!map.has(item[key])) {
          map.set(item[key], true);
          q.push(item);
        }
      }
      return q;
    },

    filterByInnerHTML: function(collection, pattern) {
      results = Array.from(collection).filter((i) => pattern.test(i.innerHTML));
      return results;
    },

    /* formatting functions
     * --------------------------------------------------------------------------------
     */

    convert2TsvAndDownload: function(records, named_file) {
      const fileArray = records;
      var firstLevel = fileArray.map((el) => Object.entries(el));
      var header = this.unqHsh(
        firstLevel.map((el) => el.map((itm) => itm[0])).flat(),
        {}
      );
      var table = [header];
      for (var i = 0; i < firstLevel.length; i++) {
        var arr = [];
        var row = [];
        var record = firstLevel[i];
        for (var s = 0; s < record.length; s++) {
          var record_kv = record[s];
          var col_key = record_kv[0];
          var place = header.indexOf(col_key);
          arr[place] = record_kv[1];
        }
        for (var a = 0; a < arr.length; a++) {
          if (arr[a]) {
            row.push(arr[a]);
          } else {
            row.push("");
          }
        }
        table.push(row);
      }
      var output_ = table.map((el) => el.map((itm) => str(itm)));
      this.downloadr(output_, named_file);
    },

    /* DOM functions
     * --------------------------------------------------------------------------------
     */

    cn: (o, s) => (o ? o.getElementsByClassName(s) : ""),
    tn: (o, s) => (o ? o.getElementsByTagName(s) : ""),
    gi: (o, s) => document.getElementById(s),

    ele: (t) => document.createElement(t),
    attr: (o, k, v) => o.setAttribute(k, v),
    a: function(o, attrs) { attrs.forEach(attr => this.attr(o, attr[0], attr[1])) },

    createDownloadHTML: function() {
      this.notifier.create();
      this.notifier.text = "initiating download...";
    },

    /* parsing functions
     * --------------------------------------------------------------------------------
     */

    parseLibraryPage: function(doc) {
      let page = new LibraryPage(doc);
      return page.books;
    },

    parseBookDetails: function(doc) {
      page = new Element(doc);
      
      if (page.gt("adbl-product-metadata").length > 0) {
        parser = new ADBLBookPage(doc, digitalData);
      } else {
        parser = new NormalBookPage(doc, digitalData);
      }

      return parser.data()
    },

    parseURIasJSON: function(url, obj) {
      if (url.match(/(?<=\?|\&)\S+?(?=\&|$)/g))
        url
          .match(/(?<=\?|\&)\S+?(?=\&|$)/g)
          .map((r) => (r ? r.split(/\=/) : [[]]))
          .forEach((r) => (obj[r[0]] = r[1]));
      return obj;
    },

    lengthOfBookInMinutes: function(s) {
      var mins = reg(/\d+(?=\smin)/.exec(s), 0)
        ? parseInt(reg(/\d+(?=\smin)/.exec(s), 0))
        : 0;
      var hours = reg(/\d+(?=\shrs)/.exec(s), 0)
        ? parseInt(reg(/\d+(?=\shrs)/.exec(s), 0)) * 60
        : 0;
      return hours + mins;
    },


    /* interaction functions
     * --------------------------------------------------------------------------------
     */

    delay: (ms) => new Promise((res) => setTimeout(res, ms)),

    downloadr: function(arr2D, filename) {
      var data = /\.json$|.js$/.test(filename)
        ? JSON.stringify(arr2D)
        : arr2D
            .map((el) => el.reduce((a, b) => a + "\t" + b))
            .reduce((a, b) => a + "\r" + b);
      var type = /\.json$|.js$/.test(filename)
        ? "data:application/json;charset=utf-8,"
        : "data:text/plain;charset=utf-8,";
      var file = new Blob([data], {
        type: type,
      });
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
      } else {
        var a = document.createElement("a"),
          url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 10);
      }
    },

    /* request functions
     * --------------------------------------------------------------------------------
     */

    fetchDoc: async function (url) {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const text = await res.text();
      return new DOMParser().parseFromString(text, "text/html");
    },

    loopThroughtAudibleLibrary: async function() {
      this.notifier.text = "Retrieving titles...";
      let library = new Library();
      await library.populate((i, percent) => {
        this.notifier.updateProgress(percent, i);
        this.notifier.text = "Retrieving titles...";
      });
      return library.books;
    },

    enrichLibraryInformation: async function(order_information) {
      var library = await this.loopThroughtAudibleLibrary();
      var contain_arr = [];

      this.notifier.text = "Retrieving addtional information on titles...";
      const total_results = library.length;
      for (let i = 0; i < total_results; i++) {
        let details = await this.getBookDetails(library[i].url);
        let merge = cleanObject({ ...library[i], ...details });
        contain_arr.push(merge);
        await this.delay(rando(1111) + 1111);
        this.notifier.updateProgress(i/total_results, i);
        this.notifier.text = `${
            merge.author
          } - ${Math.ceil(
            (i / total_results) * 100
          )}% complete -- approx ${Math.round(
            ((((total_results - i) / 100) * 1.9) / 60) * 100
          )} minutes remaining
        `;
      }
      this.notifier.percent = 1;
      this.notifier.test = "Finished."
      let merged_with_orders = contain_arr.map((r) => {
        let order = order_information.filter((i) => i.url == r.url);
        return {
          ...r,
          ...(order?.[0] ? order?.[0] : {}),
        };
      });

      this.convert2TsvAndDownload(
        merged_with_orders,
        "audible_export_" + new Date().getTime() + ".tsv"
      );
      this.notifier.wrapper.outerHTML = "";
    },

    getAudibleLibraryPage: async function(page) {
      const doc = await this.fetchDoc(
        `https://www.audible.com/library/titles?ref=a_library_t_c6_pageNum_${page}&pageSize=50&page=${
          page + 1
        }`
      );
      return this.parseLibraryPage(doc);
    },

    getBookDetails: async function(url) {
      if (url) {
        try {
          const doc = await this.fetchDoc(url);
          return this.parseBookDetails(doc);
        } catch (err) {
          console.error("failed", err);
          return {};
        }
      } else {
        return {};
      }
    },

    getAllOrders: async function() {
      this.notifier.text = "Retrieving purchases...";

      orders = new Orders();
      await orders.init()
      await orders.populate((year, page, page_count, percent) => {
        this.notifier.updateProgress(percent, page);
        this.notifier.text = `Retrieving ${year} purchases: page ${page} of ${page_count}`;
      });
      return orders.items;
    },

    getOrderPageByDate: async function (year, num) {
      info("getOrderPageByDate()", year, num);
      page = new OrderPage(year, num);
      await page.get();
      return page;

      // page = {
      //   titles: titles,
      //   order_date_sel: order_date_sel,
      //   pages: pages?.length ? this.unqHsh(pages, {}) : [],
      // };
    },

    run: async function() {
      try {
        this.createDownloadHTML();
        var order_information = await this.getAllOrders();
        this.enrichLibraryInformation(order_information);
      } catch (err) {
        console.error("Fatal error:", err, err.name, err.message);
      }
    }
  };
}
