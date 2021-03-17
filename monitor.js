const got = require('got');

class Monitor {
  constructor(url) {
    this.url = `https://${url}/products.json`;
  }

  async getPage() {
    try {
      const response = await got(this.url).json();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  getLatestItem(page) {
    return page.products[0];
  }

  getParameters(page) {
    return Object.keys(this.getLatestItem(page));
  }
}

module.exports.Monitor = Monitor;