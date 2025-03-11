import { Selector } from "testcafe";

fixture("Start Modal")
  .page("https://devexpress.github.io/testcafe/example")
  .clientScripts(
    "./scripts/start-modal.js",
  )

test("should be visible", async t => {
  await t.expect(Selector("#ae-start-modal").filterVisible().exists).ok();
});
