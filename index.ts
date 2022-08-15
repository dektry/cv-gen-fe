const express = require('express');
const path = require('path');
const cors = require('cors');

const setupApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.static(path.resolve(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // tslint:disable-next-line
    console.log(`App listening at http://localhost:${port}`);
  });
};
setupApp();
