import CONFIG from "../../globals/config";

const createJumbotron = `
  <div class="hero" alt="Jumbotron">
    <div tabindex="0" class="hero_text">
        <h1 class="herotitle">Selamat Datang di Sarif Resto</h1>
        <p class="herosubtitle">Cari Restoran Favorit Kamu</p>
    </div>
  </div>
`;

const createRestoDetailTemplate = (resto) => `
<div class="grid-detail">
  <div>
    <img class="detail-img" src="${CONFIG.BASE_IMAGE_URL + resto.restaurant.pictureId}" alt="${resto.restaurant.name}" />
  </div>
  <div class="detail-info">  
    <h2 tabindex="0" class="detail-nama">${resto.restaurant.name}</h2>
    <p>${resto.restaurant.address}</p>
    <div class="grid-city-rating">

    <div tabindex="0" class="city-detail">
      <p class="p-city"><i class="fas fa-map-marker-alt"></i> ${resto.restaurant.city}</p>
    </div>

    <div tabindex="0" class="rating-detail">
        <p class="p-rating-detail"><i class="fas fa-star"></i> ${resto.restaurant.rating}</p>
    </div>
  </div>

    <div class="flex-category">
      <h4>Category:</h4>
      <div class="p-category">
        ${resto.restaurant.categories
          .map(
            (categorie) => `
            <span tabindex="0" class="categorie-restaurant">${categorie.name}</span>
          `
          )
          .join("")}
      </div>
    </div>

    <h2 class="judul-menu" tabindex="0">Food Menus:</h2>
    <div class="list-menu">
    ${resto.restaurant.menus.foods
      .map(
        (food) => `
      <li>${food.name}</li>
        `
      )
      .join("")}
      </div>
    
      <h2 class="judul-menu" tabindex="0">Drink Menus:</h2>
      <div class="list-menu">
        ${resto.restaurant.menus.drinks
          .map(
            (drink) => `
        <li>${drink.name}</li>
        `
          )
          .join("")}
    </div>
  </div>
</div>

<div class="desc-pad">
  <h2 class="judul-detail" tabindex="0">Description:</h2>
  <p tabindex="0" class="p-padding">${resto.restaurant.description}</p>
  <h2 class="judul-detail" tabindex="0">Reviews:</h2>
  <div class="restaurant-reviews">
    ${resto.restaurant.customerReviews
      .map(
        (review) => `
      <div class="grid-review">
        <div class="review-review">
          <p tabindex="0">${review.name}</p>
          <h5 tabindex="0" class="p-city">${review.date}</h5>
        </div>
        <div class="review-review">
          <p tabindex="0" class="p-review">${review.review}</p>
        </div>
      </div>
    `
      )
      .join("")}
  </div>
</div>
`;

const createRestoItemTemplate = (resto) => `
<div class="list_item">
  <img class="list_item_thumb" src="${resto.pictureId ? CONFIG.BASE_IMAGE_URL + resto.pictureId : "https://picsum.photos/id/666/800/450?grayscale"}" alt="${resto.name}" title="${resto.name}">
    <div tabindex="0" aria-label="rating" class="rating"><i class="fas fa-star"></i> ${resto.rating}</div>
    <div class="list_item_content">
      <p class="list_item_city">
          <a href="#" class="list_item_city_value" aria-label="Alamat"><i class="fas fa-map-marker-alt"></i>  ${resto.city}</a>
      </p>
      <h1 class="list_item_title"><a aria-label="${resto.name}" href="${`/#/detail/${resto.id}`}">${resto.name}</a></h1>
      <div tabindex="0" class="list_item_desc">${resto.description.slice(0, 180)}...</div>
    </div>
</div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const emptyFavorit = `
  <div class="favorite-kosong">
    <i class="fa fa-folder-open-o" aria-hidden="true"></i>
    <p>Restaurant Favorite masih kosong</p>
  </div>
`;

export { createRestoItemTemplate, createRestoDetailTemplate, createJumbotron, createLikeButtonTemplate, createLikedButtonTemplate, emptyFavorit };
