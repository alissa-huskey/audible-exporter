require("./util.js");
require("./virtual-file.js");

JSONFile = class extends VirtualFile {
  #headers = null;
  #rows = null;

  mimetype = "text/json";
  extension = "json";

  constructor(records = null) {
    super();
    this.records = records;
  }

  get contents() {
    if (!this.records || isEmpty(this.records)) return null;
    return JSON.stringify(this.records);
  }
};
