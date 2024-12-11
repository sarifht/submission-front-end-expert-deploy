/* eslint-disable no-undef */
const assert = require("assert");

Feature("Unliking Restaurant");

const EMPTY_MESSAGE = "Tidak ada restoran untuk ditampilkan";

Before(({ I }) => {
  I.amOnPage("/#/favorite");
  I.see(EMPTY_MESSAGE, ".restaurant-item__not__found");
});

Scenario("showing empty liked menu restaurant", ({ I }) => {
  I.dontSeeElement(".restaurant-item");
  I.see(EMPTY_MESSAGE, ".restaurant-item__not__found");
});

Scenario("unliking one restaurant", async ({ I }) => {
  // Liking a restaurant first
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
  I.seeElement(".restaurant-item");

  const likedRestaurantName = await I.grabTextFrom(".restaurant__name");
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  // Unliking the restaurant
  I.click(".restaurant__name a");
  I.waitForElement("#likeButton", 10);
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.see(EMPTY_MESSAGE, ".restaurant-item__not__found");
});
