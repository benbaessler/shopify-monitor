const got = require('got');

const url = 'https://bdgastore.com/products.json';

(async () => {
  try {
    const response = await got(url);
    console.log(response.body);
  } catch (error) {
    console.error(error);
  }
})();