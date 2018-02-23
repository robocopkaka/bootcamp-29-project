import chai from 'chai';
import request from 'supertest';
import app from '../../app';
import newEventDB from '../../schemas/newEventDB';
import editEventDB from '../../schemas/editEventDB';
import './initialize';

// const { sequelize } = db;
chai.should();
let token;
describe('Events endpoints', () => {
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
  describe('POST /events', () => {
    it('should return a 201 if the event is created successfully', () => (
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(201)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
        })
    ));
    it('should return a 409 if the event date is already taken', () => (
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(409)
        .catch((err) => {
          err.should.have.status(409);
          err.body.should.be.an('object');
        })
    ));
    it('should return a 400 if the parameters are undefined', () => (
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send({})
        .expect(400)
        .catch((err) => {
          err.should.have.status(400);
          err.body.should.be.an('object');
        })
    ));
    it('should return a 403 if the token is missing', () => (
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', '')
        .send(newEventDB)
        .expect(403)
        .catch((err) => {
          err.should.have.status(403);
          err.body.should.be.an('object');
        })
    ));
  });
  describe('PUT /events/<eventId>', () => {
    it('should return a 200 if the update is successful', () => (
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send(editEventDB)
        .expect(200)
        .then((res) => {
          res.should.have.status(200);
        })
    ));
    it('should return a 400 if an empty object is sent', () => (
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send({})
        .expect(400)
        .catch((err) => {
          err.should.have.status(400);
        })
    ));
    it('should return a 409 if an event name already exists', () => (
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send({
          name: 'kachi\'s ultra mega second event',
          detail: 'Awesome events',
          guests: 1000,
          date: '2018-11-30',
          categoryId: 1,
          centerId: 1
        })
        .expect(409)
        .catch((err) => {
          err.should.have.status(409);
        })
    ));
    it('should return a 409 if an event date already exists', () => (
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send({
          name: 'kachi\'s ultra dupy event',
          detail: 'Awesome event',
          guests: 1000,
          date: '2019-11-11',
          categoryId: 1,
          centerId: 1
        })
        .expect(409)
        .catch((err) => {
          err.should.have.status(409);
        })
    ));
    it('should return a 200 if the request body deep equals a row with the params ID in the database', () => (
      request(app)
        .put('/api/v2/events/2')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(200)
        .catch((err) => {
          err.should.have.status(200);
        })
    ));
    it('should return a 403 if the token is missing', () => (
      request(app)
        .put('/api/v2/events/1')
        .send(editEventDB)
        .expect(403)
        .catch((err) => {
          err.should.have.status(403);
        })
    ));
  });
  describe('DELETE /events/:eventId', () => {
    it('should return a 200 if the ID is valid', () => (
      request(app)
        .delete('/api/v2/events/1')
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {
          res.should.have.status(200);
        })
    ));
    it('should return a 404 if the ID isn\'t in the database', () => (
      request(app)
        .delete('/api/v2/events/2000000000000')
        .set('x-access-token', token)
        .expect(404)
        .catch((err) => {
          err.should.have.status(404);
        })
    ));
  });
  describe('GET /api/v2/events', () => {
    it('should return a 200 and all the events in the system', () => (
      request(app)
        .get('/api/v2/events')
        .then((res) => {
          res.should.have.status(200);
          res.body.events.should.be.an('array');
        })
    ));
  });
  describe('GET /api/v2/events/<eventId>', () => {
    it('should return 200 and an event, if the id is valid', () => (
      request(app)
        .get('/api/v2/events/2')
        .then((res) => {
          res.should.have.status(200);
          res.body.event.should.have.property('id');
          res.body.event.should.have.property('Center').should.be.an('object');
          res.body.event.should.be.an('object');
        })
        .catch((err) => {
          console.log(err);
        })
    ));
    it('should return 404, if the id is doesn\'t exist', () => (
      request(app)
        .get('/api/v2/events/190888')
        .catch((err) => {
          err.should.have.status(404);
        })
    ));
  });
});
