import { Selector } from "testcafe";

fixture("Library Notifier")
  .page("https://devexpress.github.io/testcafe/example")
  .clientScripts(
    "./scripts/library-notifier.js",
  )

test("should be visible", async t => {
  await t.expect(Selector("#ae-notifier").filterVisible().exists).ok();
});
