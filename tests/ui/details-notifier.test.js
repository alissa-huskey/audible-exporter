require("../../src/ui/details-notifier.js");

describe("DetailsNotifier", () => {
  let timers = [new Timer(0, 1000), new Timer(0, 1500), new Timer(0, 2000)];

  let notifier = new DetailsNotifier();

  test(".item_no = value", () => {
    let notifier = new DetailsNotifier();
    notifier.total = 100;
    notifier.item_no = 10;

    expect(notifier.item_no).toBe(10);
    expect(notifier.percent).toBe(0.1);
    expect(notifier.text).toBe(notifier.message);
  });

  test(".total = value", () => {
    let notifier = new DetailsNotifier();
    notifier.item_no = 10;
    notifier.total = 100;

    expect(notifier.total).toBe(100);
    expect(notifier.text).toBe(notifier.message);

    expect().toBe();
  });

  test(".timer = value", () => {
    notifier.timer = timers[0];
    expect(notifier.times[0]).toBe(timers[0]);
  });

  test(".remaining", () => {
    notifier.total = 100;
    notifier.item_no = 10;
    expect(notifier.remaining).toBe(90);
  });

  test(".per_item", () => {
    notifier.times = timers;
    expect(notifier.per_item).toBe(1500);
  });

  test(".ms_left", () => {
    notifier.total = 100;
    notifier.item_no = 10;
    notifier.times = timers;

    expect(notifier.ms_left).toBe(135000 * 1.05);
  });

  test(".minutes_left", () => {
    notifier.total = 100;
    notifier.item_no = 10;
    notifier.times = timers;

    expect(notifier.minutes_left).toBe("2.4");
  });

  test(".message", () => {
    let notifier = new DetailsNotifier();
    expect(notifier.message).toBe(
      "Retrieving additional information on titles...",
    );

    notifier.total = 100;
    notifier.item_no = 50;
    expect(notifier.message).toBe("Retrieving book 50 of 100");

    notifier.times = [new Timer(0, timePerItem(notifier, 10.5))];
    expect(notifier.message).toBe(`Retrieving book 50 of 100`);
  });
});
