const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText, ChooseRandomSeat, selectSomeCountFreeSeats, isDisabled } = require("../../lib/commands");
const { getDateTimestamp } = require("../../lib/util.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("open the home page of the cinema's website", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("Go to the cinema in {string} days", async function (string) {
  const timeStamp = getDateTimestamp(Number(string));
  return await clickElement(this.page, `[data-time-stamp='${timeStamp}']`);
});

When("Select film {string}", async function (string) {
  return await clickElement(this.page, `[data-seance-id='${string}']`);
});

When("Choose any {string} location", async function (string) {
  return await ChooseRandomSeat(this.page, `.buying-scheme__chair_${string}:not(.buying-scheme__chair_taken)`);
});

When("Click the 'Забронировать' button", async function () {
  return await clickElement(this.page, `.acceptin-button`);
});

When("Click on the 'Получить код бронирования' button", async function () {
  return await clickElement(this.page, `.acceptin-button`);
});

When("Choose {string} seats in the hall", async function (string) {
  return await selectSomeCountFreeSeats(this.page, Number(string));
});

When("Select an already taken seat", async function () {
  return await ChooseRandomSeat(this.page, ".buying-scheme__wrapper .buying-scheme__chair_taken:not(.buying-scheme__chair_disabled)");
});

Then("Receive qr code and instructions {string}", async function (string) {
  const actual = await getText(this.page, `.ticket__hint`);
  const expected = await string;
  expect(actual).equal(expected);
});

Then("The 'Забронировать' button is disabled", async function () {
  const actual = await isDisabled(this.page, '.acceptin-button');
  const expected = true;
  expect(actual).equal(expected);
});
