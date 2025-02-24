Exporter = function() {

  var classes = {
    notifier: "downloading_notifier",
    bar: "downloading_percentage_bar",
    status_text: "downloading_percentage_txt",
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
      if (this.gi(document, classes.notifier))
        this.gi(document, classes.notifier).outerHTML = "";

      const body_width = document.body.getBoundingClientRect().width;

      let div = Element.create("div", {id: classes.notifier, style: {
        width: `${this.download_bar_width}px`,
        position: "fixed",
        top: "100px",
        left: `${(body_width - this.download_bar_width) / 2}px`,
        background: "#121212",
        border: "1px solid #3de367",
        'border-radius': "0.2em",
        'z-index': new Date().getTime(),
      }})

      let bar = Element.create("div", {id: classes.bar, style: {
        width: "0px",
        height: "50px",
        background: "#3de367",
        border: "1px solid #3de367",
        'border-bottom-right-radius': "0.2em",
        'border-top-right-radius': "0.2em",
        transition: "all 1s",
      }});

      let text = Element.create("div", {id: classes.status_text, style: {
        float: "left",
        padding: "14px",
        color: "#fff",
        width: `${this.download_bar_width - 50}px`,
      }});

      bar.element.appendChild(text.element);
      div.element.appendChild(bar.element);
      document.body.appendChild(div.element);

      this.setStatus("initiating download...");

      return div.element;
    },

    setStatus: function(text) {
      this.gi(document, classes.status_text).innerText = text;
    },

    updateProgress: function(percent, i=null) {
      let bar = this.gi(document, "downloading_percentage_bar");
      let width = this.download_bar_width * percent;
      bar.style.width = `${width}px`;

      if (i != null) {
        let color = i % 2 == 0 ? "#07ba5b" : "#3de367";
        bar.style.background = color;
      }
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
      this.setStatus("Retrieving titles...");
      let library = new Library();
      await library.populate((i, percent) => {
        this.updateProgress(percent, i);
        this.setStatus(`Retrieving titles... ${Math.ceil(percent * 100)}% complete`);
      });
      return library.books;
    },

    enrichLibraryInformation: async function(order_information) {
      var library = await this.loopThroughtAudibleLibrary();
      var contain_arr = [];

      this.setStatus("Retrieving addtional information on titles...");
      const total_results = library.length;
      for (let i = 0; i < total_results; i++) {
        let details = await this.getBookDetails(library[i].url);
        let merge = cleanObject({ ...library[i], ...details });
        contain_arr.push(merge);
        if (i == 2) console.log(contain_arr);
        await this.delay(rando(1111) + 1111);
        this.gi(document, "downloading_percentage_bar").style.width = `${
          this.download_bar_width * (i / total_results)
        }px`;
        this.gi(document, "downloading_percentage_bar").style.background =
          i % 2 == 0 ? "#07ba5b" : "#3de367";
        this.setStatus(
          `${
            merge.author
          } - ${Math.ceil(
            (i / total_results) * 100
          )}% complete -- approx ${Math.round(
            ((((total_results - i) / 100) * 1.9) / 60) * 100
          )} minutes remaining`
        );
      }
      this.gi(
        document,
        "downloading_percentage_bar"
      ).style.width = `${this.download_bar_width}px`;
      this.setStatus("100% complete");
      console.log(contain_arr);
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
      if (this.gi(document, "downloading_notifier"))
        this.gi(document, "downloading_notifier").outerHTML = "";
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
          console.log("failed");
          console.log(err);
          return {};
        }
      } else {
        return {};
      }
    },

    getAllOrders: async function() {
      this.setStatus("Retrieving this year's purchases...");

      var first_page = await this.getOrderPageByDate("last_365_days", 1);
      var titles = first_page.titles;

      for (let i = 0; i < first_page.pages.length; i++) {
        let next_page = await this.getOrderPageByDate(
          "last_365_days",
          first_page.pages[i]
        );
        next_page?.titles?.forEach((title) => titles.push(title));
      }
      let last_year = Math.min(
        ...titles
          .map((t) => /^\d{4}/.exec(t.purchase_date)?.[0])
          .filter((t) => t)
          .map((t) => parseInt(t))
      );

      let years_loop = first_page.order_date_sel.slice(
        first_page.order_date_sel.indexOf(last_year.toString()),
        20
      );
      await this.delay(rando(333) + 666);

      for (let y = 0; y < years_loop.length; y++) {
        let page = await this.getOrderPageByDate(years_loop[y], 1);
        page?.titles?.forEach((title) => titles.push(title));
        this.gi(document, "downloading_percentage_bar").style.width = `${
          this.download_bar_width * (y / years_loop.length)
        }px`;
        this.gi(document, "downloading_percentage_bar").style.background =
          y % 2 == 0 ? "#07ba5b" : "#3de367";
        this.setStatus(`Retrieving ${years_loop[y]} purchases...`);
        for (let i = 0; i < page.pages.length; i++) {
          let next_page = await this.getOrderPageByDate(years_loop[y], page.pages[i]);
          next_page?.titles?.forEach((title) => titles.push(title));
          this.setStatus(`Retrieving ${years_loop[i]} purchases... page: ${page.pages[i]}`);
        }
        await this.delay(rando(333) + 666);
      }
      return this.unqKey(titles, "url");
    },

    getOrderPageByDate: async function (df, p) {
      console.log("getOrderPageByDate()", df, p);
      var doc = await this.fetchDoc(
        `https://www.audible.com/account/purchase-history?ref=&tf=orders&df=${df}&ps=40&pn=${p}`
      );

      var order_date_sel = Array.from(
        this.tn(this.gi(doc, "ui-it-purchase-history-date-filter"), "option")
      ).map((t) => t.value);

      var wrapper = this.cn(doc, "purchase-history-pagination-wrapper");
      var links = this.tn(wrapper?.[0], "a");
      var pages = Array.from(links)?.map((r) => /&pn=(\d+)/.exec(r.href)?.[1]);

      var titles = Array.from(this.tn(this.tn(doc, "tbody")?.[0], "tr"))
        .map((tr) => {
          let purchase_date = this.cn(
            tr,
            "ui-it-purchasehistory-item-purchasedate"
          )?.[0]?.innerText?.trim();
          return {
            url: /.+?(?=\?)/.exec(this.tn(tr, "a")?.[0]?.href)?.[0],
            title: /.+(?=[\s\n]+By:)/.exec(
              this.cn(tr, "ui-it-purchasehistory-item-title")?.[0]?.innerText
            )?.[0],
            author: /(?<=[\s\n]+By: ).+/.exec(
              this.cn(tr, "ui-it-purchasehistory-item-title")?.[0]?.innerText
            )?.[0],
            purchase_date: purchase_date
              ? dateString(purchase_date)
              : purchase_date,
          };
        })
        .filter((r) => r.title && r.author);

      page = {
        titles: titles,
        order_date_sel: order_date_sel,
        pages: pages?.length ? this.unqHsh(pages, {}) : [],
      };

      return page;
    },

    run: async function() {
      try {
        this.createDownloadHTML();
        var order_information = await this.getAllOrders();
        this.enrichLibraryInformation(order_information);
      } catch (err) {
        console.log("Fatal error:", err, err.name, err.message);
      }
    }
  };
}
