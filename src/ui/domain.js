require("../util.js");

/**
 * Domain class.
 *
 * Parses the subdomain, name, second level domain, and top level domain from a
 * host.
 */
Domain = class {
  /**
   * Create a Domain object.
   *
   * @param {string} host  The host portion of the URL.
   *
   * @example
   *
   * new Domain("example.co.uk");
   */
  constructor(host = null) {
    this.host = host;
  }

  /**
   * Create a domain object from a URL.
   *
   * @param {string} address  URL
   * @example
   *
   * Domain.fromURL("http://www.google.com/")
   */
  static fromURL(address) {
    let url = new URL(address);
    let domain = new Domain(url.host);
    domain.url = url;
    return domain;
  }

  /**
   * Array of dot seperated labels that make up the domain name.
   *
   * @example
   * new Domain("example.com").labels == ["example", "com"];
   */
  get labels() {
    return this.host.split(".");
  }

  /**
   * Array of second level domains available for this top level domain.
   */
  get ok_slds() {
    return this.SLDS[this.tld] || [];
  }

  /**
   * Top level domain.
   *
   * @example
   * new Domain("example.com").tld == "com";
   */
  get tld() {
    return this.labels.slice(-1)[0];
  }

  /**
   * Second level domain(s).
   *
   * @example
   * new Domain("example.co.uk").sld == "co";
   */
  get sld() {
    if (!this.ok_slds.length) return "";

    let labels = this.labels.slice(0, -1);
    let i = labels.length - 1;
    let sld;

    do {
      let attempt = labels.slice(i).join(".");

      if (!this.ok_slds.includes(attempt)) {
        break;
      }

      sld = attempt;
      i--;
    } while (i > 0);

    return sld || "";
  }

  /**
   * Domain name.
   *
   * @example
   * new Domain("example.com").name == "example";
   */
  get name() {
    // count of slds + 1 (tld)
    let suffixes = (this.sld ? this.sld.split(".").length : 0) + 1;
    // name is one backwards from there
    let idx = this.labels.length - suffixes - 1;
    return this.labels[idx];
  }

  /**
   * Subdomain(s).
   *
   * @example
   * new Domain("help.example.com").labels == "help";
   */
  get subdomain() {
    let labels = this.labels.slice();
    // number of slds + 1 (tld) + 1 (name)
    let suffixes = (this.sld ? this.sld.split(".").length : 0) + 2;

    // chop off everything starting at the name
    labels.splice(-suffixes);

    // whatever is left is the subdomain
    let subdomain = labels.join(".");
    return subdomain;
  }
};

Domain.prototype.TLDS = [
  "asia",
  "blue",
  "ca",
  "ceo",
  "ch",
  "club",
  "cm",
  "co",
  "com",
  "de",
  "es",
  "fr",
  "in",
  "international",
  "it",
  "jp",
  "lu",
  "mobi",
  "mp",
  "name",
  "net",
  "nyc",
  "org",
  "pink",
  "pk",
  "red",
  "se",
  "si",
  "ws",
];

Domain.prototype.SLDS = {
  es: ["com", "edu", "gob", "nom", "org"],
  fr: [
    "aeroport",
    "avoues",
    "cci",
    "chambagri",
    "chirurgiens-dentistes",
    "experts-comptables",
    "geometre-expert",
    "greta",
    "huissier-justice",
    "medecin",
    "notaires",
    "pharmacien",
    "port",
    "prd",
    "veterinaire",
  ],
  in: [
    "5g",
    "6g",
    "ac",
    "ai",
    "am",
    "bihar",
    "biz",
    "business",
    "ca",
    "cn",
    "co",
    "com",
    "com",
    "coop",
    "cs",
    "delhi",
    "dr",
    "edu",
    "er",
    "ernet",
    "firm",
    "gen",
    "gov",
    "gujarat",
    "ind",
    "info",
    "int",
    "internet",
    "io",
    "me",
    "mil",
    "net",
    "org",
    "pg",
    "post",
    "pro",
    "res",
    "travel",
    "tv",
    "uk",
    "up",
    "us",
  ],
  jp: ["ac", "ad", "co", "ed", "go", "gr", "lg", "ne", "or"],
  pk: [
    "biz",
    "com",
    "edu",
    "fam",
    "gkp",
    "gob",
    "gog",
    "gok",
    "gop",
    "gos",
    "gov",
    "ltd",
    "mil",
    "net",
    "org",
    "res",
    "web",
  ],
  uk: [
    "ac",
    "bl",
    "co",
    "gov",
    "judiciary",
    "ltd",
    "me",
    "mod",
    "net",
    "nhs",
    "nic",
    "org",
    "parliament",
    "plc",
    "police",
    "rct",
    "royal",
    "sch",
    "ukaea",
  ],
  us: ["dni", "fed", "isa", "nsn"],
};
