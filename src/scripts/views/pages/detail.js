// Sarif Hidayatullah
import UrlParser from '../../routes/url-parser';
import TheRestoDbSource from '../../data/theresto-db-source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="detail-resto" class="restos-detail"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await TheRestoDbSource.detailRestorant(url.id);
    console.log(resto);

    const restoContainer = document.querySelector('#detail-resto');
    restoContainer.innerHTML = createRestoDetailTemplate(resto);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: resto.restaurant.id,
        name: resto.restaurant.name,
        description: resto.restaurant.description,
        pictureId: resto.restaurant.pictureId,
        city: resto.restaurant.city,
        rating: resto.restaurant.rating,
      },
    });
  },
};

export default Detail;
