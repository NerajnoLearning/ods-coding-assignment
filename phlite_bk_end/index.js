const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Define your routes here

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
