const express = require('express');

const app = express();

const routes = require('./routes/app');

app.set('port', (process.env.PORT || 5000));
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API. To use, send a request with a string containing a date and (optional) time, e.g. /My+date+and+time+of+birth+was+01%2F01%2F1990+at+18%3A30.' });
});

router.route('/:reqInput')
  .get(routes.getTimestamp);

app.use(router);

module.exports = app;
