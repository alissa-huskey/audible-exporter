Exporter = function() {
  const all_cats = [
    { category: "Architecture", type: "nonfiction" },
    { category: "Art", type: "nonfiction" },
    { category: "Arts & Entertainment" },
    { category: "Audio Performances & Dramatizations" },
    { category: "Entertainment & Performing Arts", type: "nonfiction" },
    { category: "Music", type: "nonfiction" },
    { category: "Photography", type: "nonfiction" },
    { category: "Adventurers, Explorers & Survival", type: "nonfiction" },
    { category: "Art & Literature", type: "nonfiction" },
    { category: "Biographies & Memoirs" },
    { category: "Cultural, Ethnic & Regional", type: "nonfiction" },
    { category: "Diaries & Correspondence", type: "nonfiction" },
    { category: "Entertainment & Celebrities", type: "nonfiction" },
    { category: "Historical", type: "nonfiction" },
    { category: "LGBT", type: "nonfiction" },
    { category: "Military & War", type: "nonfiction" },
    { category: "People with Disabilities", type: "nonfiction" },
    { category: "Politics & Activism", type: "nonfiction" },
    { category: "Professionals & Academics", type: "nonfiction" },
    { category: "Religious", type: "nonfiction" },
    { category: "Sports", type: "nonfiction" },
    { category: "True Crime", type: "nonfiction" },
    { category: "Women", type: "nonfiction" },
    { category: "Business & Careers" },
    { category: "Business Development & Entrepreneurship", type: "nonfiction" },
    { category: "Career Success", type: "nonfiction" },
    { category: "Management & Leadership", type: "nonfiction" },
    { category: "Marketing & Sales", type: "nonfiction" },
    { category: "Women in Business", type: "nonfiction" },
    { category: "Workplace & Organizational Behavior", type: "nonfiction" },
    { category: "Action & Adventure", type: "fiction" },
    { category: "Animals & Nature", type: "fiction" },
    { category: "Art", type: "fiction" },
    { category: "Biographies", type: "nonfiction" },
    { category: "Children's Audiobooks" },
    { category: "Education & Learning", type: "nonfiction" },
    { category: "Fairy Tales, Folk Tales & Myths", type: "fiction" },
    { category: "History", type: "nonfiction" },
    { category: "Holidays & Celebrations", type: "nonfiction" },
    { category: "Literature & Fiction", type: "fiction" },
    { category: "Music & Performing Arts", type: "fiction" },
    { category: "Mystery & Suspense", type: "fiction" },
    { category: "Religions" },
    { category: "Science & Technology", type: "nonfiction" },
    { category: "Science Fiction & Fantasy", type: "fiction" },
    { category: "Vehicles & Transportation" },
    { category: "Computer Science", type: "nonfiction" },
    { category: "Computers & Technology" },
    { category: "Content Creation & Social Media", type: "nonfiction" },
    { category: "History & Culture", type: "nonfiction" },
    { category: "Security & Encryption", type: "nonfiction" },
    { category: "Education & Learning" },
    { category: "Language Learning", type: "nonfiction" },
    { category: "Study Guides & Test Preparation", type: "nonfiction" },
    { category: "Words, Language & Grammar", type: "nonfiction" },
    { category: "Writing & Publishing", type: "nonfiction" },
    { category: "Erotica" },
    { category: "Literature & Fiction", type: "fiction" },
    { category: "Sex Instruction", type: "fiction" },
    { category: "Addiction & Recovery", type: "nonfiction" },
    { category: "Aging & Longevity", type: "nonfiction" },
    { category: "Alternative & Complementary Medicine", type: "nonfiction" },
    { category: "Beauty, Grooming & Style", type: "nonfiction" },
    { category: "Children's Health", type: "nonfiction" },
    { category: "Dentistry & Oral Health", type: "nonfiction" },
    { category: "Fitness, Diet & Nutrition", type: "nonfiction" },
    { category: "Health & Wellness" },
    { category: "Medicine & Health Care Industry", type: "nonfiction" },
    { category: "Psychology & Mental Health", type: "nonfiction" },
    { category: "Safety & Emergency Preparedness", type: "nonfiction" },
    { category: "Sexual & Reproductive Health", type: "nonfiction" },
    { category: "Africa", type: "nonfiction" },
    { category: "Americas", type: "nonfiction" },
    { category: "Ancient History", type: "nonfiction" },
    { category: "Arctic & Antarctica", type: "nonfiction" },
    { category: "Asia", type: "nonfiction" },
    { category: "Australia, New Zealand & Oceania", type: "nonfiction" },
    { category: "Europe", type: "nonfiction" },
    { category: "History" },
    { category: "Middle East", type: "nonfiction" },
    { category: "Military", type: "nonfiction" },
    { category: "Religious", type: "nonfiction" },
    { category: "Russia", type: "nonfiction" },
    { category: "Women", type: "nonfiction" },
    { category: "World", type: "nonfiction" },
    { category: "Food & Wine", type: "nonfiction" },
    { category: "Gardening & Horticulture", type: "nonfiction" },
    { category: "Home & Garden" },
    { category: "House & Home", type: "nonfiction" },
    { category: "Pets & Animal Care", type: "nonfiction" },
    { category: "Sustainable & Green Living", type: "nonfiction" },
    { category: "Biographies & Memoirs", type: "nonfiction" },
    { category: "LGBT" },
    { category: "LGBT Studies", type: "nonfiction" },
    { category: "Literature & Fiction", type: "fiction" },
    { category: "Mystery, Thriller & Suspense", type: "fiction" },
    { category: "Romance", type: "fiction" },
    { category: "Science Fiction & Fantasy", type: "fiction" },
    { category: "Action & Adventure", type: "fiction" },
    { category: "African American", type: "fiction" },
    { category: "Ancient, Classical & Medieval Literature", type: "fiction" },
    { category: "Anthologies & Short Stories", type: "fiction" },
    { category: "Classics", type: "fiction" },
    { category: "Drama & Plays", type: "fiction" },
    { category: "Erotica", type: "fiction" },
    { category: "Essays", type: "fiction" },
    { category: "Genre Fiction", type: "fiction" },
    { category: "Historical Fiction", type: "fiction" },
    { category: "Horror", type: "fiction" },
    { category: "Humor & Satire", type: "fiction" },
    { category: "LGBT", type: "fiction" },
    { category: "Literary History & Criticism", type: "fiction" },
    { category: "Literature & Fiction" },
    { category: "Memoirs, Diaries & Correspondence", type: "fiction" },
    { category: "Poetry", type: "fiction" },
    { category: "Women's Fiction", type: "fiction" },
    { category: "World Literature", type: "fiction" },
    { category: "Banks & Banking", type: "nonfiction" },
    { category: "Corporate & Public Finance", type: "nonfiction" },
    { category: "E-Commerce", type: "nonfiction" },
    { category: "Economics", type: "nonfiction" },
    { category: "Insurance", type: "nonfiction" },
    { category: "International", type: "nonfiction" },
    { category: "Investing & Trading", type: "nonfiction" },
    { category: "Money & Finance" },
    { category: "Personal Finance", type: "nonfiction" },
    { category: "Real Estate", type: "nonfiction" },
    { category: "Crime Fiction", type: "fiction" },
    { category: "Mystery", type: "fiction" },
    { category: "Mystery, Thriller & Suspense" },
    { category: "Thriller & Suspense", type: "fiction" },
    { category: "True Crime", type: "nonfiction" },
    { category: "Anthropology", type: "nonfiction" },
    { category: "Archaeology", type: "nonfiction" },
    { category: "Law", type: "nonfiction" },
    { category: "Philosophy", type: "nonfiction" },
    { category: "Politics & Government", type: "nonfiction" },
    { category: "Politics & Social Sciences" },
    { category: "Social Sciences", type: "nonfiction" },
    { category: "Parenting & Families", type: "nonfiction" },
    { category: "Personal Development", type: "nonfiction" },
    { category: "Relationships", type: "nonfiction" },
    { category: "Relationships, Parenting & Personal Development" },
    { category: "Agnosticism", type: "nonfiction" },
    { category: "Atheism", type: "nonfiction" },
    { category: "Buddhism", type: "nonfiction" },
    { category: "Christianity", type: "nonfiction" },
    { category: "Hinduism", type: "nonfiction" },
    { category: "Islam", type: "nonfiction" },
    { category: "Judaism", type: "nonfiction" },
    { category: "Occult", type: "nonfiction" },
    {
      category: "Other Religions, Practices & Sacred Texts",
      type: "nonfiction",
    },
    { category: "Religion & Spirituality" },
    { category: "Religious Studies", type: "nonfiction" },
    { category: "Spirituality", type: "nonfiction" },
    { category: "Action & Adventure", type: "fiction" },
    { category: "Anthologies & Short Stories", type: "fiction" },
    { category: "Christian", type: "fiction" },
    { category: "Clean & Wholesome", type: "fiction" },
    { category: "Contemporary", type: "fiction" },
    { category: "Fantasy", type: "fiction" },
    { category: "Historical", type: "fiction" },
    { category: "LGBT", type: "fiction" },
    { category: "Military", type: "fiction" },
    { category: "Multicultural", type: "fiction" },
    { category: "Paranormal", type: "fiction" },
    { category: "Romance" },
    { category: "Romantic Comedy", type: "fiction" },
    { category: "Romantic Suspense", type: "fiction" },
    { category: "Royalty", type: "fiction" },
    { category: "Science Fiction", type: "fiction" },
    { category: "Sports", type: "fiction" },
    { category: "Westerns", type: "fiction" },
    { category: "Engineering", type: "nonfiction" },
    { category: "Mathematics", type: "nonfiction" },
    { category: "Science", type: "nonfiction" },
    { category: "Science & Engineering" },
    { category: "Fantasy", type: "nonfiction" },
    { category: "Science Fiction", type: "nonfiction" },
    { category: "Science Fiction & Fantasy", type: "nonfiction" },
    { category: "Adventurers, Explorers & Survival", type: "nonfiction" },
    { category: "Baseball & Softball", type: "nonfiction" },
    { category: "Basketball", type: "nonfiction" },
    { category: "Biographies & Memoirs", type: "nonfiction" },
    { category: "Coaching", type: "nonfiction" },
    { category: "Combat Sports & Self-Defense", type: "nonfiction" },
    { category: "Cricket", type: "nonfiction" },
    { category: "Cycling", type: "nonfiction" },
    { category: "Equestrian Sports", type: "nonfiction" },
    { category: "Extreme Sports", type: "nonfiction" },
    { category: "Football", type: "nonfiction" },
    { category: "Golf", type: "nonfiction" },
    { category: "Hockey", type: "nonfiction" },
    { category: "Motor Sports", type: "nonfiction" },
    { category: "Olympics & Paralympics", type: "nonfiction" },
    { category: "Outdoors & Nature", type: "nonfiction" },
    { category: "Running & Jogging", type: "nonfiction" },
    { category: "Soccer", type: "nonfiction" },
    { category: "Sociology of Sports", type: "nonfiction" },
    { category: "Sports & Outdoors" },
    { category: "Sports History", type: "nonfiction" },
    { category: "Sports Psychology", type: "nonfiction" },
    { category: "Sports Writing", type: "nonfiction" },
    { category: "Tennis", type: "nonfiction" },
    { category: "Track & Field", type: "nonfiction" },
    { category: "Triathlon", type: "nonfiction" },
    { category: "Walking", type: "nonfiction" },
    { category: "Water Sports", type: "nonfiction" },
    { category: "Winter Sports", type: "nonfiction" },
    { category: "Biographies", type: "nonfiction" },
    { category: "Health, Lifestyle & Relationships", type: "nonfiction" },
    { category: "History & Culture", type: "nonfiction" },
    { category: "Literature & Fiction", type: "fiction" },
    { category: "Mystery, Thriller & Suspense", type: "fiction" },
    { category: "Politics, Society & Current Events", type: "nonfiction" },
    { category: "Religion & Spirituality", type: "nonfiction" },
    { category: "Romance", type: "fiction" },
    { category: "Science & Technology", type: "nonfiction" },
    { category: "Science Fiction & Fantasy", type: "fiction" },
    { category: "Teen & Young Adult" },
    { category: "Adventure Travel", type: "nonfiction" },
    { category: "Africa", type: "nonfiction" },
    { category: "Asia", type: "nonfiction" },
    { category: "Australia & Oceania", type: "nonfiction" },
    { category: "Caribbean", type: "nonfiction" },
    { category: "Central & South America", type: "nonfiction" },
    { category: "Europe", type: "nonfiction" },
    { category: "Guided Tours", type: "nonfiction" },
    { category: "Middle East", type: "nonfiction" },
    { category: "North America", type: "nonfiction" },
    { category: "Polar Regions", type: "nonfiction" },
    { category: "Russia", type: "nonfiction" },
    { category: "Travel & Tourism" },
    { category: "Travel Writing & Commentary", type: "nonfiction" },
  ];

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
    download_bar_width: document.body.getBoundingClientRect().width * 0.8,

    /* misc functions
     * --------------------------------------------------------------------------------
     */

    rando: (n) => Math.round(Math.random() * n),
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

    getCatType: (subcat) => {
      return all_cats.filter((r) => r.category === subcat).length &&
      all_cats.filter((r) => r.category === subcat)[0].type;
    },

    /* formatting functions
     * --------------------------------------------------------------------------------
     */

    reg: (o, n) => (o ? o[n] : ""),

    str: function(o) {
      return typeof o == "object"
        ? this.tsvReady(JSON.stringify(o))
        : o
    },

    tryFloat: function(d) {
      try {
        return parseFloat(d);
      } catch (err) {
        return d;
      }
    },

    dateString: function(d) {
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var date = new Date(d);
      return `${date.getFullYear()} ${months[date.getMonth()]} ${date.getDate()}`;
    },

    cleanObject: function(ob) {
      return Object.entries(ob).reduce((r, [k, v]) => {
        if (
          v != null &&
          v != undefined &&
          v !== "" &&
          (typeof v == "boolean" ||
            typeof v == "string" ||
            typeof v == "symbol" ||
            typeof v == "number" ||
            typeof v == "function" ||
            (typeof v == "object" &&
              ((Array.isArray(v) && v.length) || Array.isArray(v) != true)))
        ) {
          r[k] = v;
          return r;
        } else {
          return r;
        }
      }, {});
    },

    tsvReady: (s) => (
      s
        ? s
            .replace(/\t|\v|\f|\u0009/g, " ")
            .replace(/\r|\n/g, "↵")
            .replace(/\0/g, "")
            .replace(/\\/g, "\\\\")
            .replace(/\'/g, "\\'")
            .replace(/\"/g, '\\"')
        : s
    ),

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
      var output_ = table.map((el) => el.map((itm) => this.str(itm)));
      this.downloadr(output_, named_file);
    },


    /* parsing functions
     * --------------------------------------------------------------------------------
     */

    parseLibraryPage: function(doc) {
      return this.cn(doc, "adbl-library-content-row").length
        ? Array.from(this.cn(doc, "adbl-library-content-row")).map((card) => {
            let ul = this.cn(card, classes.ul_card)[0];
            let author = this.cn(ul, classes.author)[0];
            let narrator = this.cn(ul, classes.narrator)[0];
            let series = this.cn(ul, classes.series)[0];
            return {
              url:
                this.cn(ul, classes.title)[0] && this.cn(ul, classes.title)[0].parentElement
                  ? this.cn(ul, classes.title)[0].parentElement.href?.replace(/\?.+/, "")
                  : "",
              title: this.cn(ul, classes.title)[0]
                ? this.cn(ul, classes.title)[0].innerText.trim()
                : "",
              author:
                author && this.cn(author, "bc-color-base")[0]
                  ? this.cn(author, "bc-color-base")[0].innerText.trim()
                  : "",
              narrator:
                narrator && this.cn(narrator, "bc-color-base")[0]
                  ? this.cn(narrator, "bc-color-base")[0].innerText.trim()
                  : "",
              series:
                series && this.tn(series, "a")[0]
                  ? this.tn(series, "a")[0].innerText.trim()
                  : "",
            };
          })
        : [];
    },

    parseBookDetails: function(doc) {
      let publisher_summary = this.cn(doc, classes.summary)[0]
        ?.innerText?.trim()
        ?.replace(/Publisher's Summary\s*/, "")
        ?.replace(/([\n\r\s]+|)©.+/, "")
        ?.replace(/[\n\r]+(\s+|)/g, "<br>")
        ?.replace(/\t/g, " ")
        ?.replace(/"/g, "'");

      let audible_og = Array.from(doc.querySelectorAll("h2"))
        .filter((i) => /About This Audible Original/i.test(i.innerHTML))?.[0]
        ?.parentElement.innerText?.trim()
        ?.replace(/About This Audible Original\s*/, "")
        ?.replace(/([\n\r\s]+|)©.+/, "")
        ?.replace(/[\n\r]+(\s+|)/g, "<br>")
        ?.replace(/\t/g, " ")
        ?.replace(/"/g, "'");

      var categories =
        this.cn(doc, classes.categories)[0] &&
        Array.from(this.tn(this.cn(doc, classes.categories)[0], "a")).length
          ? Array.from(this.tn(this.cn(doc, classes.categories)[0], "a")).map((a) =>
              a.innerText.trim()
            )
          : [];

      var date = this.cn(doc, classes.release_date)[0]
        ? this.dateString(
            this.cn(doc, classes.release_date)[0]
              .innerText.replace(/.+date:/i, "")
              .trim()
          )
        : "";

      let extra_cats = Array.from(this.cn(doc, "bc-chip-text"))?.map((i) =>
        i.getAttribute("data-text")
      );

      var audible_og_cats = Array.from(
        this.tn(this.cn(doc, "categoriesLabel")?.[0], "a")
      ).map((i) => i.innerText);

      return this.cleanObject({
        main_category: categories?.[0] || audible_og_cats?.[0],
        sub_category: categories?.at(-1) || audible_og_cats?.at(-1),
        categories: [...categories, ...extra_cats, ...audible_og_cats],
        duration_minutes: this.cn(doc, classes.runtime)[0]
          ? this.lengthOfBookInMinutes(
              this.cn(doc, classes.runtime)[0]
                .innerText.replace(/length:/i, "")
                .trim()
            )
          : "",
        language: this.cn(doc, classes.language)?.[0]
          ?.innerText?.replace(/[\s\n\r]*language:[\s\n\r]+/gi, "")
          ?.trim(),
        release_date: date,
        release_timestamp: date ? new Date(date).getTime() : "",
        publisher: this.cn(doc, classes.publisher)[0]
          ? this.cn(doc, classes.publisher)[0]
              .innerText.replace(/Publisher:/i, "")
              .trim()
          : "",
        category_type: this.getCatType(categories[categories.length - 1]),
        publisher_summary: publisher_summary || audible_og,
        audible_oginal: audible_og ? true : false,
        book: /, book (\d+)/i.exec(this.cn(doc, classes.series)?.[0]?.innerText)?.[1],
        rating: this.tryFloat(
          /[\d\.]+/.exec(
            this.cn(this.cn(doc, "ratingsLabel")?.[0], "bc-pub-offscreen")?.[0]?.innerText
          )?.[0]
        ),
        num_ratings: this.tryFloat(
          /[\d,]+/
            .exec(
              this.cn(this.cn(doc, "ratingsLabel")?.[0], "bc-color-link")?.[0]?.innerText
            )?.[0]
            ?.replace(/\D+/)
        ),
        critic_summary: this.cn(doc, "productCriticsSummary")?.[0]
          ?.innerText?.trim()
          ?.replace(/Critic Reviews\s*/, "")
          ?.replace(/([\n\r\s]+|)©.+/, "")
          ?.replace(/[\n\r]+(\s+|)/g, "<br>")
          ?.replace(/\t/g, " ")
          ?.replace(/"/g, "'"),
      });
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
      var mins = this.reg(/\d+(?=\smin)/.exec(s), 0)
        ? parseInt(this.reg(/\d+(?=\smin)/.exec(s), 0))
        : 0;
      var hours = this.reg(/\d+(?=\shrs)/.exec(s), 0)
        ? parseInt(this.reg(/\d+(?=\shrs)/.exec(s), 0)) * 60
        : 0;
      return hours + mins;
    },

    /* DOM functions
     * --------------------------------------------------------------------------------
     */

    cn: (o, s) => (o ? o.getElementsByClassName(s) : ""),
    tn: (o, s) => (o ? o.getElementsByTagName(s) : ""),
    gi: (o, s) => ( o ? o.getElementById(s) : ""),
    ele: (t) => document.createElement(t),
    attr: (o, k, v) => o.setAttribute(k, v),
    a: function(l, r) { r.forEach(a => this.attr(l, a[0], a[1])) },
    setStatus: function(text) {
      this.gi(document, "downloading_percentage_txt").innerText = text;
    },

    createDownloadHTML: function() {
      if (this.gi(document, "downloading_notifier"))
        this.gi(document, "downloading_notifier").outerHTML = "";
      const body_width = document.body.getBoundingClientRect().width;
      let cont = this.ele("div");
      this.a(cont, [
        ["id", "downloading_notifier"],
        [
          "style",
          `position: fixed; top: 100px; left: ${
            (body_width - this.download_bar_width) / 2
          }px; width: ${this.download_bar_width}px; z-index: ${new Date().getTime()}; background: #121212; border: 1px solid #3de367; border-radius: 0.2em;`,
        ],
      ]);
      document.body.appendChild(cont);
      let perc = this.ele("div");
      this.a(perc, [
        ["id", "downloading_percentage_bar"],
        [
          "style",
          `width: 0px; height: 50px; background: #3de367; border: 1px solid #3de367; border-bottom-right-radius: 0.2em; border-top-right-radius: 0.2em; transition: all 1s;`,
        ],
      ]);
      cont.appendChild(perc);
      let txt = this.ele("div");
      this.a(txt, [
        ["id", "downloading_percentage_txt"],
        [
          "style",
          `float: left; padding: 14px; color: #fff; width: ${
            this.download_bar_width - 50
          }px;`,
        ],
      ]);
      perc.appendChild(txt);
      txt.innerText = "initiating download...";
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
      const doc = await this.fetchDoc(
        `https://www.audible.com/library/titles?ref=a_library_t_c6_pageNum_0&pageSize=50&page=1`
      );
      const page_size = parseInt(
        Array.from(
          doc.getElementsByName("pageSize")[0].getElementsByTagName("option")
        ).filter((r) => r && r.selected)[0].value
      );
      const num_pages = Math.max(
        ...Array.from(doc.getElementsByClassName("pageNumberElement"))
          .map((p) => p.innerText.trim())
          .filter((r) => r && /^\d+$/.test(r))
          .map((n) => parseInt(n))
      );
      const num_titles = page_size * num_pages;
      const total_results = Math.ceil(num_titles / 50);
      const contain_arr = [];
      for (let i = 0; i < total_results; i++) {
        const cards = await this.getAudibleLibraryPage(i);
        await this.delay(111);
        if (cards) {
          cards.forEach((card) => {
            if (contain_arr.every((itm) => itm.url != card.url))
              contain_arr.push(card);
          });
          if (cards.some((card) => card.title == "Your First Listen")) break;
        }
        this.gi(document, "downloading_percentage_bar").style.width = `${
          this.download_bar_width * (i / total_results)
        }px`;
        this.gi(document, "downloading_percentage_bar").style.background =
          i % 2 == 0 ? "#07ba5b" : "#3de367";
          this.setStatus(
            `Retrieving titles... ${Math.ceil((i / total_results) * 100)}% complete`
          );
      }
      return contain_arr;
    },

    enrichLibraryInformation: async function(order_information) {
      this.createDownloadHTML();
      var library = await this.loopThroughtAudibleLibrary();
      var contain_arr = [];

      this.setStatus("Retrieving addtional information on titles...");
      const total_results = library.length;
      for (let i = 0; i < total_results; i++) {
        let details = await this.getBookDetails(library[i].url);
        let merge = this.cleanObject({ ...library[i], ...details });
        contain_arr.push(merge);
        if (i == 2) console.log(contain_arr);
        await this.delay(this.rando(1111) + 1111);
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
      this.createDownloadHTML();
      this.setStatus("Retrieving last year's purchases...");

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
      await this.delay(this.rando(333) + 666);

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
        await this.delay(this.rando(333) + 666);
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
              ? this.dateString(purchase_date)
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
        var order_information = await this.getAllOrders();
        this.enrichLibraryInformation(order_information);
      } catch (err) {
        console.log("Fatal error:", err, err.name, err.message);
      }
    }
  };
}

if (typeof process === "undefined" || process.env.JEST_WORKER_ID === undefined) {
  Exporter().run();
}
