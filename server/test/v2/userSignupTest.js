import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
// import User from '../../models/user';

chai.use(chaiHttp);
chai.should();

describe('POST /users', () => {
  it('should return a 200 if the parameters are valid', () => {
    chai.request(app)
      .post('/users/login')
      .send({
        email: 'test@test.com',
        password: 'tests'
      })
      .then((res) => {
        res.should.have.status(200);
        // check if a token was created
      });
  });
  it('should return a 403 if the credentials are invalid', () => {
    chai.request(app)
      .post('/users')
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
