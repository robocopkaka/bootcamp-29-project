import chai from 'chai';
import request from 'supertest';
import app from '../../app';
import newCenterDB from '../../schemas/newCenterDB';
import './initialize';
import db from '../../models/index';

chai.should();
// const { sequelize } = db;
let token;
describe('Centers endpoints', () => {
  before(() => (
    request(app)
      .post('/api/v2/users/login')
      .send({
        email: 'onyekachi@kachi.com',
        password: 'password',
      })
      .then((res) => {
        token = res.body.token;
      })
  ));
  describe('POST /api/v2/centers endpoint', () => {
    it('should return \'Resource created\' and a 201 if the center parameters are valid', () => (
      request(app)
        .post('/api/v2/centers')
        .set('x-access-token', token)
        .send(newCenterDB)
        .then((res) => {
          res.should.have.status(201);
          // res.body.should.have.property('id');
          // res.body.should.have.property('message').eql('Center created');
        })
    ));
    it('should return \'Bad request\' and a 400 if the center parameters are invalid', () => {
      chai.request(app)
        .post('/api/v2/centers')
        .set('x-access-token', token)
        .send()
        .then(() => {
          //
        })
        .catch((err) => {
          err.should.have.status(400);
          err.response.body.should.have.property('message');
        });
    });
    it('should return \'Resource conflict\' and a 409 if the center exists', () => (
      request(app)
        .post('/api/v2/centers')
        .set('x-access-token', token)
        .send(newCenterDB)
        .catch((res) => {
          res.should.have.status(409);
        })
    ));
  });
  describe('GET /api/v2/centers', () => {
    it('should return a 200 and all the centers in the system', () => (
      request(app)
        .get('/api/v2/centers')
        .then((res) => {
          res.should.have.status(200);
          res.body.centers.should.be.an('array');
        })
    ));
  });

  describe('GET /api/v2/centers/<centerId>', () => {
    it('should return 200 and a center, if the id is valid', () => (
      request(app)
        .get('/api/v2/centers/1')
        .then((res) => {
          res.should.have.status(200);
          res.body.center.should.have.property('events');
          res.body.center.events.should.be.an('array');
        })
    ));
    it('should return 404, if the id is invalid or doesn\'t exist', () => (
      request(app)
        .get('/api/v2/centers/190888')
        .catch((err) => {
          err.should.have.status(404);
        })
    ));
  });

  describe('PUT /api/v1/centers/<centerId>', () => {
    it('should return a 200 if the parameters were valid', () => (
      request(app)
        .put('/api/v2/centers/1')
        .set('x-access-token', token)
        .send({
          name: 'The main centerssssssss',
          detail: 'We exist',
          image: 'ramsey.jpg',
          address: 'somewhere in lagos',
          state: 'lagos',
          capacity: 1000
        })
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Center updated successfully');
        })
    ));
    it('should return a 400 if the parameters were invalid', () => (
      chai.request(app)
        .put('/api/v2/centers/1')
        .set('x-access-token', token)
        .send({})
        .catch((err) => {
          err.should.have.status(400);
        })
    ));
    it('should return a 409 if there\'s a resource conflict with center names', () => (
      chai.request(app)
        .put('/api/v2/centers/1')
        .set('x-access-token', token)
        .send({
          name: 'The main centerssssssss',
          detail: 'We exist',
          image: 'ramsey.jpg',
          address: 'somewhere in lagos',
          state: 'lagos',
          capacity: 1000
        })
        .catch((err) => {
          err.should.have.status(409);
          err.response.body.should.have.property('message').eql('Center name exists');
        })
    ));
    it('should return a 404 if the ID is invalid or doesn\'t exist', () => (
      chai.request(app)
        .put('/api/v2/centers/2000000000000')
        .set('x-access-token', token)
        .send(newCenterDB)
        .then(() => {
        })
        .catch((err) => {
          err.should.have.status(404);
        })
    ));
  });
});
