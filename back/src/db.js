const mongoose = require('mongoose');
const moment = require('moment');

const db = mongoose.connect('mongodb://localhost/cinemaDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const filmSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  poster: String,
  genres: [String],
  age_rating: String,
  availableSessions: [
    {
      date: String,
      sessions: [
        {
          time: String,
          hall: {
            totalNumberOfSeats: String,
            reservedSeats: [String],
          },
        },
      ],
    },
  ],
});

const Film = mongoose.model('Film', filmSchema);
module.exports = Film;

// Film.create({
//   _id: mongoose.Types.ObjectId(),
//   genres: ['экшн'],
//   name: 'Русский рейд',
//   poster: 'https://s3.kinoteatr.ru/preview/upload/movies/4980/cover.jpg',
//   age_rating: '18',
//   availableSessions: [
//     {
//       date: '2020-10-03',
//       sessions: [
//         {
//           hall: {
//             reservedSeats: ['1:1', '4:1', '2:10'],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '7:30',
//         },
//         {
//           hall: {
//             reservedSeats: ['2:10', '4:3', '2:2', '3:10'],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '10:30',
//         },
//         {
//           hall: {
//             reservedSeats: [],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '13:30',
//         },
//       ],
//     },
//     {
//       date: '2020-10-04',
//       sessions: [
//         {
//           hall: {
//             reservedSeats: ['1:2', '3:5', '2:5'],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '7:00',
//         },
//         {
//           hall: {
//             reservedSeats: ['1:2', '3:5', '3:10', '2:2', '2:3', '3:10'],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '10:00',
//         },
//         {
//           hall: {
//             reservedSeats: [],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '13:30',
//         },
//       ],
//     },
//     {
//       date: '2020-10-05',
//       sessions: [
//         {
//           hall: {
//             reservedSeats: ['1:2', '3:5', '2:5'],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '7:00',
//         },
//         {
//           hall: {
//             reservedSeats: ['1:2', '3:5', '3:10', '2:2', '2:3', '3:10'],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '10:00',
//         },
//         {
//           hall: {
//             reservedSeats: [],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '13:30',
//         },
//       ],
//     },
//     {
//       date: '2020-10-06',
//       sessions: [
//         {
//           hall: {
//             reservedSeats: ['1:2', '3:5', '2:5'],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '7:00',
//         },
//         {
//           hall: {
//             reservedSeats: ['1:2', '3:5', '3:10', '2:2', '2:3', '3:10'],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '10:00',
//         },
//         {
//           hall: {
//             reservedSeats: [],
//             totalNumberOfSeats: '10:5',
//           },

//           time: '13:30',
//         },
//       ],
//     },
//   ],
// });

for (let i = 0; i < 4; i++) {
  var str = `availableSessions.${i}.date`;
  let obj = {
    $set: {},
  };
  obj[str] = moment().add({ day: i }).format().split('T')[0];

  Film.updateMany({}, obj, (err, films) => {
    if (err) console.log(err);
  });
}
