import chai from 'chai';
import chaiHttp from 'chai-http';
import Sequelize from 'sequelize';
import app from '../../app';
// import User from '../../models/user';
const sequelize = new Sequelize(`postgres://${process.env.DB_TEST_USER}:${process.env.DB_TEST_USER}@localhost:5432/event-manager-test`, { logging: false });
chai.use(chaiHttp);
chai.should();

describe('POST /users', () => {
  beforeEach((done) => {
    sequelize.sync({ force: true }).then(() => { done(); });
  });
  it('should return a 200 if the parameters are valid', () => {
    chai.request(app)
      .post('/api/v2/users')
      .send({
        name: 'kkkddqwkkkk',
        email: 'test@test.com',
        password: 'tests'
      })
      .then((res) => {
        res.should.have.status(201);
        // check if a token was created
      })
      .catch((err) => {
        err.should.have.status(400);
      })
  });
  it('should return a 403 if the credentials are invalid', () => {
    chai.request(app)
      .post('/api/v2/users')
      .send({
        name: 'Okereke Onyekachi',
        email: 'test@test.com',
        password: 'tests'
      })
      .catch((err) => {
        err.should.have.status(403);
      });
  });
});
