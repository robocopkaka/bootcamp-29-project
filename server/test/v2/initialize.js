import request from 'supertest';
import app from '../../app';
import db from '../../models/index';
//
// const { sequelize } = db;
//
// describe('drop tables', () => {
//   before((done) => {
//     sequelize.sync({ force: true }).then(() => { done(); });
//   });
// });
//
// // module.exports = initializeTest;
let token;
before((done) => {
  db.Category.sync({ force: true }).then(() => {
    db.Category
      .create({
        name: 'wedding'
      })
      .then(() => {})
      .catch((err) => {
        throw err;
      });
  });
  db.User.sync({ force: true })
    .then(() => {
      request(app)
        .post('/api/v2/users')
        .send({
          name: 'Onyekachi',
          email: 'onyekachi@kachi.com',
          password: 'password',
        })
        .then(() => {});
      request(app)
        .post('/api/v2/users')
        .send({
          name: 'Onyekachi',
          email: 'wilson@kachi.com',
          password: 'password',
        })
        .then(() => {});
      db.Center.sync({ force: true }).then(() => {
        db.Center
          .create({
            name: 'Center4',
            detail: 'We exist',
            image: 'ramsey.jpg',
            address: 'somewhere in lagos',
            chairs: 10,
            projector: 1,
            capacity: 1000,
            state: 'state'
          })
          .then(() => {});
        db.Event.sync({ force: true }).then(() => {
          db.Center
            .findOne({
              where: { id: 1 },
              include: [
                { model: db.Event, as: 'events' }
              ]
            })
            .then((center) => {
              if (!center) {
                // do stuff
              } else {
                db.Event
                  .create({
                    name: 'new event',
                    date: '2020-01-01',
                    detail: 'Awesome event',
                    guests: 1000,
                    categoryId: 1,
                    centerId: center.id
                  })
                  .then(() => {});
              }
            });
        });
      });
      done();
    });
});

module.exports = token;
