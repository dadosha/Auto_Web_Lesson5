const { clickElement, putText, getText, ChooseRandomSeat, selectSomeCountFreeSeats, isDisabled } = require("./lib/commands.js");
const { generateName, getDateTimestamp } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(5000);
});

afterEach(() => {
  page.close();
});

describe("Cinema tests", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("Buy a movie ticket today for a standard seat", async () => {
    const timeStamp = getDateTimestamp(1);
    const expect_text = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

    await clickElement(page, `[data-time-stamp='${timeStamp}']`);
    await clickElement(page, `[data-seance-id='199']`);
    await ChooseRandomSeat(page, ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
    await clickElement(page, `.acceptin-button`);
    await clickElement(page, `.acceptin-button`);

    const actual = await getText(page, `.ticket__hint`);
    expect(actual).toEqual(expect_text);
  });

  test("Buy a movie ticket today for a vip seat", async () => {
    const timeStamp = getDateTimestamp(1);
    const expect_text = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

    await clickElement(page, `[data-time-stamp='${timeStamp}']`);
    await clickElement(page, `[data-seance-id='199']`);
    await ChooseRandomSeat(page, ".buying-scheme__chair_vip:not(.buying-scheme__chair_taken)");
    await clickElement(page, `.acceptin-button`);
    await clickElement(page, `.acceptin-button`);

    const actual = await getText(page, `.ticket__hint`);
    expect(actual).toEqual(expect_text);
  });

  test("Buy multiple tickets to a movie", async () => {
    const timeStamp = getDateTimestamp(1);
    const expect_text = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

    await clickElement(page, `[data-time-stamp='${timeStamp}']`);
    await clickElement(page, `[data-seance-id='199']`);
    await selectSomeCountFreeSeats(page, 3);
    await clickElement(page, `.acceptin-button`);
    await clickElement(page, `.acceptin-button`);

    const actual = await getText(page, `.ticket__hint`);
    expect(actual).toEqual(expect_text);
  });

  test("Cannot select a seat that is already taken", async () => {
    const timeStamp = getDateTimestamp(1);
    const expect_value = true;

    await clickElement(page, `[data-time-stamp='${timeStamp}']`);
    await clickElement(page, `[data-seance-id='199']`);
    await ChooseRandomSeat(page, ".buying-scheme__wrapper .buying-scheme__chair_taken:not(.buying-scheme__chair_disabled)");

    const actual = await isDisabled(page, '.acceptin-button');
    expect(actual).toEqual(expect_value);
  });

  test("The 'Забронировать' button is inactive until a seat is selected", async () => {
    const timeStamp = getDateTimestamp(1);
    const expect_value = true;

    await clickElement(page, `[data-time-stamp='${timeStamp}']`);
    await clickElement(page, `[data-seance-id='199']`);
    await clickElement(page, `.acceptin-button`);

    const actual = await isDisabled(page, '.acceptin-button');
    expect(actual).toEqual(expect_value);
  });
});
