module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
  ChooseRandomSeat: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      const freeSeats = await page.$$(
          selector
      );
      if (freeSeats.length === 0) {
        throw new Error(`No such free seat`);
      }
      const randomIndex = Math.floor(Math.random() * freeSeats.length);
      const randomSeat = freeSeats[randomIndex];
      await randomSeat.click()
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  selectSomeCountFreeSeats: async function (page, countPlace) {
    try {
      await page.waitForSelector('.buying-scheme__wrapper div');
      const rows = await page.$$('.buying-scheme__wrapper div');
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const freeSeats = await page.$$(
            `.buying-scheme__wrapper div:nth-child(${rowIndex + 1}) .buying-scheme__chair:not(.buying-scheme__chair_taken):not(.buying-scheme__chair_selected)`
        );
        if (freeSeats.length < countPlace) {
          continue;
        }
        for (let i = 0; i <= freeSeats.length - countPlace; i++) {
          const adjacentSeats = freeSeats.slice(i, i + countPlace);

          for (let seat of adjacentSeats) {
            await seat.click();
          }

          return;
        }
      }
      throw new Error('There are no suitable places');
    }
    catch (error) {
      throw new Error(`Selector is not clickable: ${error.message}`);
    }
  },
  isDisabled: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, el => el.disabled);
    } catch (error) {
      throw new Error(`Button is not available for selector: ${selector}`);
    }
  },
};
