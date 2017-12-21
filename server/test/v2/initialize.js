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
          isAdmin: true
        })
        .then(() => {});
      db.Center.sync({ force: true }).then(() => {
        db.Event.sync({ force: true }).then(() => {});
      });
      done();
    });
});

module.exports = token;
