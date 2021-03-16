const monitor = require('./monitor');

const url = 'https://bdgastore.com/products.json';
const client = new monitor.Monitor(url);

const request = client.getPage()

request.then((response) => console.log(response.products));