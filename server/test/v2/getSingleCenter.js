// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import Sequelize from 'sequelize';
// import app from '../../app';
//
// chai.use(chaiHttp);
// chai.should();
//
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYm9jb3BrYWthQGdtYWlsLmNvbSIsImlkIjoxLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTExOTY5MTYzLCJleHAiOjE1MTIwNTU1NjN9.VjkqZpi94dUpdmNCmBYeTB4pitO4klegrcz-LT3ThB4';
// const sequelize = new Sequelize(`postgres://${process.env.DB_TEST_USER}:${process.env.DB_TEST_USER}@localhost:5432/event-manager-test`, { logging: false });
//
// describe('GET /api/v2/centers/<centerId>', () => {
//   beforeEach((done) => {
//     sequelize.sync({ force: true }).then(() => { done(); });
//   });
//   it('should return 200 and a center, if the id is valid', () => {
//     chai.request(app)
//       .get(`/api/v2/centers/1?query=${token}`)
//       .then((res) => {
//         res.should.have.status(200);
//       });
//   });
//   it('should return 404, if the id is invalid or doesn\'t exist', () => {
//     chai.request(app)
//       .get(`/api/v2/centers/vdie?query=${token}`)
//       .catch((err) => {
//         err.should.have.status(404);
//       });
//   });
// });
