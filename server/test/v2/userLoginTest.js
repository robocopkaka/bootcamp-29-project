import chai from 'chai';
import chaiHttp from 'chai-http';
import Sequelize from 'sequelize';
import app from '../../app';
// import User from '../../models/user';

chai.use(chaiHttp);
chai.should();

const sequelize = new Sequelize(`postgres://${process.env.DB_TEST_USER}:${process.env.DB_TEST_USER}@localhost:5432/event-manager-test`, { logging: false });


describe('/users/login', () => {
  beforeEach((done) => {
    sequelize.sync({ force: true }).then(() => { done(); });
  });
  it('should return a 200 if the credentials are valid', () => {
    chai.request(app)
      .post('/api/v2/users/login')
      .send({
        email: 'robocopkaka@gmail.com',
        password: 'tests'
      })
      .then((res) => {
        res.should.have.status(200);
      });
  });
  it('should return a 403 if the credentials are invalid', () => {
    chai.request(app)
      .post('/api/v2/users/login')
      .send({
        email: undefined,
        password: undefined
      })
      .catch((err) => {
        err.should.have.status(403);
      });
  });
});
