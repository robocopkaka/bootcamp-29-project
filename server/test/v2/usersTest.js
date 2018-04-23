import chai from 'chai';
// import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../../app';
import './initialize';

chai.should();

describe('/Users', () => {
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
          res.body.should.have.property('user');
          res.body.user.should.be.an('object');
          res.body.user.should.not.have.property('password');
          res.body.user.name.should.equal('Onyekachi');
          res.body.user.email.should.equal('kachi@kachi.com');
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
    it('should return a 401 if the user isn\'t found', () => (
      chai.request(app)
        .post('/api/v2/users/login')
        .send({
          email: 'riri@rir.com',
          password: 'thththt'
        })
        .catch((err) => {
          err.should.have.status(401);
          err.response.body.should.have.property('message');
          err.response.body.message.should.equal('Invalid email/password');
        })
    ));
    it('should return a 401 if the email is wrong', () => (
      chai.request(app)
        .post('/api/v2/users/login')
        .send({
          email: 'kachi@kachi.com',
          password: 'thththt'
        })
        .catch((err) => {
          err.should.have.status(401);
          err.response.body.should.have.property('message');
          err.response.body.message.should.equal('Invalid email/password');
        })
    ));
  });
});
