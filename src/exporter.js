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
    modal: new Modal(),

    /* misc functions
     * --------------------------------------------------------------------------------
     */

    unqHsh: (a, o) => (a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true))),

    timeLeft: function(remaining) {
      let per_book = 1.9;

      return Math.round((remaining * per_book) / 60);
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
        parser = new ADBLBookPage(doc);
      } else {
        parser = new NormalBookPage(doc);
      }

      return parser.data()
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
      let url = URL.createObjectURL(file);
      this.modal.file = [url, filename];
      this.modal.show()
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
      this.notifier.reset();
      this.notifier.text = "Retrieving library...";
      let library = new LibraryFetcher();
      await library.populate((i, page_count) => {
        let page = i + 1;
        let percent = page/page_count;
        this.notifier.updateProgress(percent, i);
        this.notifier.text = `Retrieving library: page ${page} of ${page_count}`;
      });
      log_table("library", library.books);
      return library.books;
    },

    enrichLibraryInformation: async function(orders, library) {
      let library_info, order_info, book_info, info;
      let results = [];

      let total_results = library.length;

      this.notifier.reset();
      this.notifier.text = "Retrieving additional information on titles...";

      let fetcher = new DetailsFetcher(library);
      await fetcher.populate((i, total, data) => {
        let percent = i/total;
        let remaining = total - i;

        this.notifier.updateProgress(percent, i);
        this.notifier.text = `
          Retrieving book ${(i+1).toLocaleString()} of ${total.toLocaleString()} (approx ${this.timeLeft(remaining)} minutes remaining)
        `.trim();
      });

      log_table("details", fetcher.books);

      for (library_info of library) {
        book_info = fetcher.books[library_info.id],
        order_info = orders.filter((i) => i.url == r.url) || {};
        info = cleanObject({...library_info, ...book_info, order_info});
        results.push(info);
      }
      return results;
    },

    downloadTSV: function(books) {
      this.convert2TsvAndDownload(
        books,
        "audible_export_" + new Date().getTime() + ".tsv"
      );
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
      this.notifier.reset();
      this.notifier.text = "Retrieving purchases...";

      orders = new OrdersFetcher();
      await orders.init()
      await orders.populate((year, page, page_count, percent) => {
        this.notifier.updateProgress(percent, page);
        this.notifier.text = `Retrieving ${year} purchases: page ${page} of ${page_count}`;
      });
      log_table("purchases", orders.items);
      return orders.items;
    },

    getOrderPageByDate: async function (year, num) {
      info("getOrderPageByDate()", year, num);
      page = new OrderPage(year, num);
      await page.get();
      return page;
    },

    run: async function() {
      try {
        let before = new Date().getTime();

        this.modal.create();
        this.notifier.create();
        this.notifier.text = "Initiating download...";

        let orders = await this.getAllOrders();
        let library = await this.loopThroughtAudibleLibrary();
        let books = await this.enrichLibraryInformation(orders, library);

        if (!books) {
          error("Failed to download books.")
          this.notifier.reset();
          this.notifier.text = "Failed."
          return;
        }

        let after = new Date().getTime();
        let elapsed = (after - before) / 1000 / 60;
        info(`Done. (${books.length} books, ${elapsed.toFixed(2)} minutes)`);
        this.notifier.percent = 1;
        this.notifier.text = "Done."

        log_table("Your audible data", books);
        this.downloadTSV(books);

      } catch (err) {
        error("Fatal error:", err, err.name, err.message);
      }
    }
  };
}
