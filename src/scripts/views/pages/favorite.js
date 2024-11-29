// Sarif Hidayatullah
import FavoriteRestoIdb from '../../data/favoriteresto-idb';
import { createRestoItemTemplate, emptyFavorit } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <section class="content">
        <div class="select">
          <h1><u tabindex="0">Restoran Favorite</u></h1>
          <div class="list" id="restos"></div>
          <div class="" id="kosong"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restos = await FavoriteRestoIdb.getAllRestos();
    const restosContainer = document.querySelector('#restos');
    const restosEmpty = document.querySelector('#kosong');

    if (restos.length > 0) {
      restos.forEach((resto) => {
        restosContainer.innerHTML += createRestoItemTemplate(resto);
      });
    } else {
      restosEmpty.innerHTML += emptyFavorit;
    }
  },
};

export default Favorite;
