import { Selector } from "testcafe";

fixture("Orders Notifier")
  .page("https://devexpress.github.io/testcafe/example")
  .clientScripts(
    "../../build/test-scripts/order-notifier.js",
  )

test("should be visible", async t => {
  await t.expect(Selector("#ae-notifier").filterVisible().exists).ok();
});
