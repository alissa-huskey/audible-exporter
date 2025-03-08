/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/result.js");

describe("Result", () => {
  let row = new Result();

  test("new Result()", () => {
    expect(row).toBeA(Result);
  });

  test("new Result(library, details, order)", () => {
    let row = new Result({ a: 1 }, { b: 2 }, { c: 3 });

    expect(row.library).toEqual({ a: 1 });
    expect(row.details).toEqual({ b: 2 });
    expect(row.order).toEqual({ c: 3 });
  });

  test(".first(key)", () => {
    let result;

    // the value for title from order is chosen, as defined in Result.#headers
    result = new Result({ title: "a" }, { title: "b" }, { title: "c" });
    expect(result.first("title")).toBe("c");

    // no title value is defiend, so "" is returned
    result = new Result({}, {}, {});
    expect(result.first("title")).toBe("");

    // #headers defines book as only in details, so it's ignored in all others
    result = new Result({ book: "x" }, {}, {});
    expect(result.first("book")).toBe("");

    // the false value should return false, not ""
    result = new Result({}, { audible_oginal: false }, {});
    expect(result.first("audible_oginal")).toBe(false);
  });

  test(".data()", () => {
    let order = {
      id: "006297534X",
      url: "http://www.audible.com/pd/006297534X",
      title: "Honored Enemy",
      author: "Raymond E. Feist, William R. Forstchen",
      purchase_date: "10-19-2024",
    };

    let library = {
      id: "006297534X",
      url: "/pd/Honored-Enemy-Audiobook/006297534X",
      title: "Honored Enemy: Legends of the Riftwar, Book 1",
      author: "Raymond E. Feist",
      narrator: "Matt Bates",
      series: "Riftwar Cycle [Publication Order]",
    };

    let details = {
      id: "006297534X",
      title: "Honored Enemy",
      duration_minutes: 797,
      language: "English",
      release_date: "2020 Jul 7",
      release_timestamp: 1594101601000,
      publisher: "HarperAudio",
      publisher_summary:
        "New York Times Best-Selling Author  In the frozen Northlands of Midkemia, Captain Dennis Hartraft’s Marauders have just had a disastrous encounter with their sworn enemy, the Tsurani. Wounded and disheartened, the Mauraders set out for the shelter of a frontier garrison. They don’t know that a Tsurani patrol is sent to support an assault on that same garrison. Arriving simultaneously, the Marauders and Tsurani find the outpost already overrun by a dark enemy whose ferocity is legendary in Midkemia. In order to survive, the foes must band together and fight as one. As they make their way across the inhospitable climate, the two batallions struggle not only with the elements and their enemy, but also their consciences. Can their hatred for their mutual enemy overcome their distrust of each other? And, with both sides carrying painful scars from past wars, what is more important: one’s life or one’s honor?",
      audible_oginal: false,
      book: "1",
      category_type: "fiction",
      main_category: "Science Fiction & Fantasy",
      sub_category: "Fantasy",
      categories: ["Fantasy"],
      rating: 4.7,
      num_ratings: 168,
    };

    let expected = {
      id: "006297534X",
      url: "http://www.audible.com/pd/006297534X",
      title: "Honored Enemy",
      author: "Raymond E. Feist, William R. Forstchen",
      narrator: "Matt Bates",
      series: "Riftwar Cycle [Publication Order]",
      duration_minutes: 797,
      language: "English",
      release_date: "2020 Jul 7",
      release_timestamp: 1594101601000,
      publisher: "HarperAudio",
      publisher_summary:
        "New York Times Best-Selling Author  In the frozen Northlands of Midkemia, Captain Dennis Hartraft’s Marauders have just had a disastrous encounter with their sworn enemy, the Tsurani. Wounded and disheartened, the Mauraders set out for the shelter of a frontier garrison. They don’t know that a Tsurani patrol is sent to support an assault on that same garrison. Arriving simultaneously, the Marauders and Tsurani find the outpost already overrun by a dark enemy whose ferocity is legendary in Midkemia. In order to survive, the foes must band together and fight as one. As they make their way across the inhospitable climate, the two batallions struggle not only with the elements and their enemy, but also their consciences. Can their hatred for their mutual enemy overcome their distrust of each other? And, with both sides carrying painful scars from past wars, what is more important: one’s life or one’s honor?",
      purchase_date: "10-19-2024",
      audible_oginal: false,
      book: "1",
      category_type: "fiction",
      main_category: "Science Fiction & Fantasy",
      sub_category: "Fantasy",
      categories: ["Fantasy"],
      rating: 4.7,
      num_ratings: 168,
    };

    let result = new Result(library, details, order);

    expect(result.data()).toEqual(expected);
  });
});
