const { Monitor } = require('./monitor');

const url = 'bdgastore.com';
const client = new Monitor(url);

const request = client.getPage()

request.then((response) => {
  // console.log(client.getParameters(response));
  console.log(client.getLatestItem(response).variants);
  // console.log(client.getItembyID(response, 6548024393802));
});