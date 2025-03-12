import { Selector } from "testcafe";

fixture("Audible Exporter")
  .page("http://audible.com/categories")
  .clientScripts(
    "../../build/test-scripts/audible-exporter.js",
  )

test("should be visible", async t => {
  await t.expect(Selector("#ae-start-modal").filterVisible().exists).ok();
});

test.skip("clicking start", async t => {
  await t.click("#ae-start-btn");

  await t.expect(Selector("#ae-start-modal").exists).notOk();
  await t.expect(Selector("#ae-notifier").exists).ok();
  await t.wait(1000);

  // this fails because we're not logged in
  await t.expect(Selector("#ae-percent-text").innerText).notEql("0%");
});
