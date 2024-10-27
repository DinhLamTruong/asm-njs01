const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const movieRoute = require('./routes/movie');
const authenticateToken = require('./middleware/authenticateToken');

app.use(authenticateToken);
app.use('/api', movieRoute);
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.listen(8080);
