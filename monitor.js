const got = require('got');

class Monitor {
  constructor(url) {
    this.url = url;
  }

  async getPage() {
    let test;
    try {
      const response = await got(this.url).json();
      return response;
    } catch (error) {
      return error;
    }
  }

}

module.exports.Monitor = Monitor;