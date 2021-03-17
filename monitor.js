const e = require('express');
const got = require('got');
const { send } = require('./bot');

class Monitor {
  constructor(url) {
    this.url = `https://${url}/products.json`;
  }

  start(interval, send) {
    this.request(send);
    setInterval(() => {
      this.request(send);
    }, interval);
  }

  request(send) {
    let item = require('./item.json');
    const request = this.getPage();
    request.then((response) => {
      const latestItem = this.getLatestItem(response);
      console.log(item.id, latestItem.id);
      if (item.id !== latestItem.id) {
        send(latestItem);
        item.id = latestItem.id;
        console.log(`New item: ${this.url.slice(0, -5)}/${latestItem.handle}`);
      } else {
        console.log('Request made');
      }
    });
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