require("./util.js");
require("./virtual-file.js");

TSVFile = class extends VirtualFile {
  #headers = null;
  #rows = null;

  mimetype = "text/tsv";
  extension = "tsv";

  constructor(records = null) {
    super();
    this.records = records;
  }

  get headers() {
    if (!this.records || isEmpty(this.records)) return null;
    if (!this.#headers) {
      this.#headers = Object.keys(this.records[0]).map((h) => this.sanitize(h));
    }
    return this.#headers;
  }

  get rows() {
    if (!this.records || isEmpty(this.records)) return null;
    if (!this.#rows) {
      this.preprocess();
      this.#rows = this.records.map((row) =>
        Object.values(row).map((v) => this.sanitize(v)),
      );
    }
    return this.#rows;
  }

  get contents() {
    if (!this.records || isEmpty(this.records)) return null;

    let lines = [this.headers, ...this.rows];
    let text = lines.map((l) => l.join("\t")).join("\n") + "\n";
    return text;
  }

  preprocess() {
    for (let [i, record] of Object.entries(this.records)) {
      if (record.series === "") {
        record.series = [];
      }
      if (record.authors === "") {
        record.authors = [];
      }
      if (record.series) {
        record.series = record.series
          .map((series) => {
            return series.name + (series.number ? ` #${series.number}` : "");
          })
          .join(", ");
      }
      if (record.authors) {
        record.authors = record.authors.join(", ");
      }
    }
  }

  sanitize(text) {
    text = text || "";

    if (typeof text == "object") {
      text = JSON.stringify(text);
    }

    text = String(text);

    return text
      .replace(/\t|\v|\f/g, " ")
      .replace(/\r|\n/g, " ")
      .replace(/\0/g, "")
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
  }
};
