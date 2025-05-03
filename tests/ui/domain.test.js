require("../../src/ui/domain.js");

describe("new Domain()", () => {
  test("new Domain()", () => {
    let domain = new Domain();
    expect(domain).toBeA(Domain);

    domain = new Domain("audible.com");
    expect(domain.host).toBe("audible.com");
  });

  test("Domain.fromURL()", () => {
    let address = "https://www.audible.com/categories";
    let url = new URL(address);
    let domain = Domain.fromURL(address);

    expect(domain.url).toEqual(url);
    expect(domain.host).toBe("www.audible.com");
  });

  test(".TLDS & .SLDS", () => {
    let d = new Domain();
    expect(d.TLDS[0]).toBe("asia");
    expect(d.SLDS.es[0]).toBe("com");
  });

  test(".labels", () => {
    let domain = new Domain("help.audible.co.uk");
    expect(domain.labels).toEqual(["help", "audible", "co", "uk"]);
  });

  test(".ok_slds", () => {
    let domain = new Domain("audible.es");
    let slds = ["com", "edu", "gob", "nom", "org"];

    expect(domain.ok_slds).toEqual(slds);
  });

  test(".tld", () => {
    let domain = new Domain("audible.com");
    expect(domain.tld).toBe("com");
  });

  test.each([
    /* eslint-disable prettier/prettier */
    { host: "example.com", sld: "" },                    // no sld
    { host: "example.co.fr", sld: "" },                  // .co is not a valid sld of .fr
    { host: "example.alt.gov", sld: "" },                // .gov has no valid slds
    { host: "example.co.uk", sld: "co" },                // .co is a valid sld of .uk
    { host: "example.co.uk", sld: "co" },                // .co is a valid sld of .uk
    { host: "example.fs.school.za", sld: "fs.school" },  // .za has multiple level slds
    /* eslint-enable prettier/prettier */
  ])(".sld ($host)", ({ host, sld }) => {
    Domain.prototype.SLDS.za = ["school", "fs.school"];

    let domain = new Domain(host);
    expect(domain.sld).toBe(sld);
  });

  test.each([
    { host: "example.com", name: "example" },
    { host: "example.co.fr", name: "co" },
    { host: "example.co.uk", name: "example" },
    { host: "help.example.com", name: "example" },
    { host: "www.example.fs.school.za", name: "example" },
    { host: "fake.example.faker.com", name: "faker" },
  ])(".name ($host)", ({ host, name }) => {
    let domain = new Domain(host);
    expect(domain.name).toBe(name);
  });

  test.each([
    { host: "help.example.com", subdomain: "help" },
    { host: "example.com", subdomain: "" },
    { host: "example.co.uk", subdomain: "" },
    { host: "www.example.fs.school.za", subdomain: "www" },
    { host: "fake.example.faker.com", subdomain: "fake.example" },
  ])(".subdomain ($host)", ({ host, subdomain }) => {
    let domain = new Domain(host);
    expect(domain.subdomain).toBe(subdomain);
  });

  test("", () => {
    expect(true).toBe(true);
  });
});
