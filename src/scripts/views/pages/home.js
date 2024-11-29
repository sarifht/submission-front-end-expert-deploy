// Sarif Hidayatullah
import TheRestoDbSource from '../../data/theresto-db-source';
import { createRestoItemTemplate, createJumbotron } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="jumbotron" id="jumbotron">
      </div>

      <section class="content">
        <div class="select">
            <h1><u tabindex="0">Pilih Restoran</u></h1>
            <div class="list" id="restos"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restos = await TheRestoDbSource.homeRestorant();

    const jumbotronContainer = document.querySelector('#jumbotron');
    jumbotronContainer.innerHTML += createJumbotron;

    const restosContainer = document.querySelector('#restos');
    restos.forEach((resto) => {
      restosContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default Home;
