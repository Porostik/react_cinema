const Film = require('./db');
const url = require('url');
const moment = require('moment');

module.exports.Films = (req, res) => {
  const obj = req.query;

  const newObj = {};

  for (const key in obj) {
    if (key === 'date') {
      newObj[`availableSessions.${key}`] = obj[key];
      continue;
    }
    newObj[key] = { $in: obj[key] };
  }

  Film.find(newObj, { availableSessions: false, __v: false }, (err, films) => {
    if (err) console.log(err);
    res.json(films);
  });
};

module.exports.GetEnableDates = (_, res) => {
  Film.find({}, { 'availableSessions.date': true, _id: false }, (err, dates) => {
    if (err) console.log(err);
    let enableDates = new Set();

    dates.forEach((item) => {
      item['availableSessions'].forEach((item) => {
        enableDates.add(item['date']);
      });
    });

    res.json(Array.from(enableDates));
  });
};

module.exports.GetFilmById = (req, res) => {
  const id = req.params['id'];

  Film.findById(id, (err, film) => {
    if (err) console.log(err);

    res.json(film);
  });
};
