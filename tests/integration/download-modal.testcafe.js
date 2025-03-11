import { Selector } from "testcafe";

fixture("Download Modal")
  .page("https://devexpress.github.io/testcafe/example")
  .clientScripts(
    "./scripts/download-modal.js",
  )

test("should be visible", async t => {
  await t.expect(Selector(".ae-modal").filterVisible().exists).ok();
});
