const express = require('express');
const controllers = require('./controllers');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
  });
});

app.get('/films', controllers.Films);
app.get('/enableDates', controllers.GetEnableDates);
app.get('/films/:id', controllers.GetFilmById);

// app.listen(3001, () => {
//   console.log('...');
// });

module.exports = app;
