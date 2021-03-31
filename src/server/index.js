const path = require('path');
const express = require('express');
const app = express();
const port = 4040;

app.use(express.static('public'));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
    console.log(`server started at ${port}`);
});
