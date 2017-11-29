// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../app';
// import db from '../../models/index';
//
// chai.use(chaiHttp);
// chai.should();
//
// const { sequelize } = db;
//
// describe('GET /api/v2/centers', () => {
//   beforeEach((done) => {
//     sequelize.sync({ force: true }).then(() => { done(); });
//   });
//   it('should return a 200 and all the centers in the system', () => {
//     chai.request(app)
//       .get('/api/v1/centers')
//       .then((res) => {
//         res.should.have.status(200);
//         res.body.should.be.an('array');
//       });
//   });
// });
