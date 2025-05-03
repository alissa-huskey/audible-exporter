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

    // the false value should return false, not ""
    result = new Result({}, { audible_original: false }, {});
    expect(result.first("audible_original")).toBe(false);
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
      authors: [
        {
          name: "Raymond E. Feist",
          id: "B000AQU2EI",
          url: "/author/B000AQU2EI",
        },
        {
          name: "William R. Forstchen",
          id: "B000APZ9N8",
          url: "/author/B000APZ9N8",
        },
      ],
      narrators: ["Matt Bates"],
      series: [
        {
          id: "B0D9HWCMMS",
          url: "/series/Riftwar-Cycle-Publication-Order-Audiobooks/B0D9HWCMMS",
          name: "Riftwar Cycle [Publication Order]",
          number: "17",
        },
        {
          id: "B01LWZA84Q",
          url: "/series/Riftwar-Cycle-Audiobooks/B01LWZA84Q",
          name: "Riftwar Cycle [Chronological Order]",
          number: "4",
        },
        {
          id: "B00UM9FILU",
          url: "/series/Legends-of-the-Riftwar-Audiobooks/B00UM9FILU",
          name: "Legends of the Riftwar",
          number: "1",
        },
      ],
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
      audible_original: false,
      category_type: "fiction",
      main_category: "Science Fiction & Fantasy",
      sub_category: "Fantasy",
      categories: ["Fantasy"],
      rating: 4.7,
      num_ratings: 168,
      is_adult: false,
    };

    let expected = {
      id: "006297534X",
      url: "http://www.audible.com/pd/006297534X",
      title: "Honored Enemy",
      authors: [
        {
          name: "Raymond E. Feist",
          id: "B000AQU2EI",
          url: "/author/B000AQU2EI",
        },
        {
          name: "William R. Forstchen",
          id: "B000APZ9N8",
          url: "/author/B000APZ9N8",
        },
      ],
      narrators: ["Matt Bates"],
      series: [
        {
          id: "B0D9HWCMMS",
          url: "/series/Riftwar-Cycle-Publication-Order-Audiobooks/B0D9HWCMMS",
          name: "Riftwar Cycle [Publication Order]",
          number: "17",
        },
        {
          id: "B01LWZA84Q",
          url: "/series/Riftwar-Cycle-Audiobooks/B01LWZA84Q",
          name: "Riftwar Cycle [Chronological Order]",
          number: "4",
        },
        {
          id: "B00UM9FILU",
          url: "/series/Legends-of-the-Riftwar-Audiobooks/B00UM9FILU",
          name: "Legends of the Riftwar",
          number: "1",
        },
      ],
      duration_minutes: 797,
      language: "English",
      release_date: "2020 Jul 7",
      release_timestamp: 1594101601000,
      publisher: "HarperAudio",
      publisher_summary:
        "New York Times Best-Selling Author  In the frozen Northlands of Midkemia, Captain Dennis Hartraft’s Marauders have just had a disastrous encounter with their sworn enemy, the Tsurani. Wounded and disheartened, the Mauraders set out for the shelter of a frontier garrison. They don’t know that a Tsurani patrol is sent to support an assault on that same garrison. Arriving simultaneously, the Marauders and Tsurani find the outpost already overrun by a dark enemy whose ferocity is legendary in Midkemia. In order to survive, the foes must band together and fight as one. As they make their way across the inhospitable climate, the two batallions struggle not only with the elements and their enemy, but also their consciences. Can their hatred for their mutual enemy overcome their distrust of each other? And, with both sides carrying painful scars from past wars, what is more important: one’s life or one’s honor?",
      purchase_date: "10-19-2024",
      audible_original: false,
      category_type: "fiction",
      main_category: "Science Fiction & Fantasy",
      sub_category: "Fantasy",
      categories: ["Fantasy"],
      rating: 4.7,
      num_ratings: 168,
      is_adult: false,
    };

    let result = new Result(library, details, order);

    expect(result.data()).toEqual(expected);
  });
});
