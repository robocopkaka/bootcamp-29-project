import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/index';
import app from '../../app';
// import User from '../../models/user';
// const sequelize = new Sequelize(`postgres://${process.env.DB_TEST_USER}:${process.env.DB_TEST_USER}@localhost:5432/event-manager-test`, { logging: false });
const { sequelize } = db;
chai.use(chaiHttp);
chai.should();

describe('POST /users', () => {
  // beforeEach((done) => {
  //   sequelize.sync({ force: true }).then(() => { done(); });
  // });
  afterEach((done) => { done(); });
  it('should return a 200 if the parameters are valid', () => {
    chai.request(app)
      .post('/api/v2/users')
      .send({
        name: 'kkkddqws',
        email: 'testss@estss.com',
        password: 'testssssss'
      })
      .then((res) => {
        console.log(res.status);
        res.should.have.status(200);
        // check if a token was created
      })
      .catch((err) => {
        console.log('gets to catch');
        err.should.have.status(400);
      });
  });
  it('should return a 400 if the credentials are invalid', () => {
    chai.request(app)
      .post('/api/v2/users')
      .send({
        name: undefined,
        email: undefined,
        password: undefined
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
});
