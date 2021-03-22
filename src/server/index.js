const express = require('express');
const app = express();
const port = 4040;

app.use(express.static('dist'));

app.listen(port, () => {
  // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
