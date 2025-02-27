File = class {
  mimetype = null;

  constructor(records=null) {
    this.records = records;
  }

  get blob() {
    return new Blob([this.contents], {type: this.mimetype});
  }

  get url() {
    return URL.createObjectURL(this.blob);
  }

  get filename() {
    let ts = new Date().getTime();
    return `audible_${ts}.${this.extension}`;
  }
}
