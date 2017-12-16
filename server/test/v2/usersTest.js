import chai from 'chai';
// import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../../app';
import db from '../../models/index';
// import User from '../../models/user';

// chai.use(chaiHttp);
chai.should();

// const sequelize = new Sequelize(`postgres://${process.env.DB_TEST_USER}:${process.env.DB_TEST_USER}@localhost:5432/event-manager-test`, { logging: false });
// const { sequelize } = db;
describe('/Users', () => {
  before((done) => {
    db.User.sync({ force: true }).then(() => { done(); });
  });
  describe('POST /users', () => {
    it('should return a 201 if the parameters are valid', () => (
      request(app)
        .post('/api/v2/users')
        .send({
          name: 'Onyekachi',
          email: 'kachi@kachi.com',
          password: 'password'
        })
        .then((res) => {
          res.should.have.status(201);
        })
    ));
    it('should return a 400 if the credentials are invalid', () => (
      chai.request(app)
        .post('/api/v2/users')
        .send({
          name: undefined,
          email: undefined,
          password: undefined
        })
        .catch((err) => {
          err.should.have.status(400);
        })
    ));
  });

  describe('/users/login', () => {
    it('should return a 200 if the credentials are valid', () => (
      chai.request(app)
        .post('/api/v2/users/login')
        .send({
          email: 'kachi@kachi.com',
          password: 'password'
        })
        .then((res) => {
          // console.log(res);
          res.should.have.status(200);
        })
    ));
    it('should return a 400 if the credentials are invalid', () => (
      chai.request(app)
        .post('/api/v2/users/login')
        .send({
          email: undefined,
          password: undefined
        })
        .catch((err) => {
          err.should.have.status(400);
        })
    ));
    it('should return a 404 if the user isn\'t found', () => (
      chai.request(app)
        .post('/api/v2/users/login')
        .send({
          email: 'riri@rir.com',
          password: 'thththt'
        })
        .catch((err) => {
          err.should.have.status(404);
        })
    ));
  });
});
