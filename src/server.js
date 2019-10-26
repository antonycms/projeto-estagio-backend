require('dotenv-save').config();
const app = require('./app');

const port = process.env.PORT;
const host = process.env.HOST;

function init() {
  app.listen(port, host);
  console.log(`Server running on port ${port}`);
}

init();