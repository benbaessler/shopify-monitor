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

  getItembyID(page, id) {
    const products = page.products;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i];
      }
    }
    console.error('Invalid ID');
    return null;
  }

}

module.exports.Monitor = Monitor;