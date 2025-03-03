/**
 * file.js
 * ************************************************************************************
 */

File = class {
  #contents = null;

  mimetype = null;
  extension = null;

  constructor(contents=null) {
    this.#contents = contents;
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

  get contents() {
    return this.#contents;
  }

  set contents(value) {
    this.#contents = value;
  }
}
