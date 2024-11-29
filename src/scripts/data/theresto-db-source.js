import API_ENDPOINT from '../globals/api-endpoint';

class TheRestoDbSource {
  static async homeRestorant() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestorant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default TheRestoDbSource;
