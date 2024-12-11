/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require("assert");

Feature("Liking Restaurant");

const EMPTY_MESSAGE = "Tidak ada restoran untuk ditampilkan";

Before(({ I }) => {
  I.amOnPage("/#/favorite");
  I.see(EMPTY_MESSAGE, ".restaurant-item__not__found");
});

After(({ I }) => {
  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-item");

  // Membersihkan daftar favorit setelah pengujian selesai
  // Asumsi ada tombol atau fitur untuk menghapus semua restoran favorit
  I.executeScript(() => {
    const clearButton = document.querySelector("#clearFavoritesButton");
    if (clearButton) clearButton.click();
  });
  I.see(EMPTY_MESSAGE, ".restaurant-item__not__found");
});

Scenario("showing empty liked restaurant", ({ I }) => {
  I.seeElement("#query");
  I.see(EMPTY_MESSAGE, ".restaurant-item__not__found");
});

Scenario("liking one restaurant", async ({ I }) => {
  I.see(EMPTY_MESSAGE, ".restaurant-item__not__found");

  I.amOnPage("/");

  I.waitForElement(".restaurant__name a", 10);
  I.seeElement(".restaurant__name a");
  const firstRestaurant = locate(".restaurant__name a").first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement("#likeButton", 10);
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  const likedRestaurantName = await I.grabTextFrom(".restaurant__name");
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario("searching restaurant", async ({ I }) => {
  I.see(EMPTY_MESSAGE, ".restaurant-item__not__found");

  I.amOnPage("/");

  I.waitForElement(".restaurant__name a", 10);
  I.seeElement(".restaurant__name a");

  const restaurantNames = [];

  for (let i = 1; i <= 3; i++) {
    const restaurantLink = locate(".restaurant__name a").at(i);
    const restaurantName = await I.grabTextFrom(restaurantLink);

    I.click(restaurantLink);
    I.waitForElement("#likeButton", 10);
    I.seeElement("#likeButton");
    I.click("#likeButton");

    restaurantNames.push(restaurantName);
    I.amOnPage("/");
  }

  I.amOnPage("/#/favorite");
  I.seeElement("#query");

  const searchQuery = restaurantNames[1].substring(1, 3);
  const matchingRestaurants = restaurantNames.filter((name) => name.includes(searchQuery));

  I.fillField("#query", searchQuery);
  I.pressKey("Enter");

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(".restaurant-item");
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  for (const [index, name] of matchingRestaurants.entries()) {
    const visibleName = await I.grabTextFrom(locate(".restaurant__name").at(index + 1));
    assert.strictEqual(name, visibleName);
  }
});
