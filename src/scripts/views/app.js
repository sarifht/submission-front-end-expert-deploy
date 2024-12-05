import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";
import DrawerInitiator from "../utils/drawer-initiator";

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = url ? (await import("../routes/routes")).default[url] : null;

    if (!page) {
      displayRestaurants();
      return;
    }

    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
