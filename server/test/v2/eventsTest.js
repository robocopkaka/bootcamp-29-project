import chai from 'chai';
import request from 'supertest';
import app from '../../app';
import newEventDB from '../../schemas/newEventDB';
import editEventDB from '../../schemas/editEventDB';

require('./initialize');

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
    it('should return a 201 if the event is created successfully', () => {
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(201)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          err.should.have.status(404);
        });
    });
    it('should return a 409 if the event date is already taken', () => {
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(409)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.an('object');
          err.should.have.status(404);
        });
    });
    it('should return a 400 if the parameters are undefined', () => {
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(400)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          err.should.have.status(404);
        });
    });
    it('should return a 403 if the token is missing', () => {
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', '')
        .send(newEventDB)
        .expect(403)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          err.should.have.status(404);
        });
    });
  });
  // describe('PUT /events/<eventId>', () => {
  //   it('should return a 200 if the update is successful', () => {
  //     request(app)
  //       .put('/api/v2/events/1')
  //       .set('x-access-token', token)
  //       .send(editEventDB)
  //       .expect(200)
  //       .end((err, res) => {
  //         res.body.should.be.an('object');
  //         err.should.have.status(404);
  //       });
  //   });
  //   it('should return a 400 if an empty object is sent', () => {
  //     request(app)
  //       .put('/api/v2/events/1')
  //       .set('x-access-token', token)
  //       .send({})
  //       .expect(400)
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         err.should.have.status(404);
  //       });
  //   });
  //   it('should return a 409 if an event name already exists', () => {
  //     request(app)
  //       .put('/api/v2/events/1')
  //       .set('x-access-token', token)
  //       .send({})
  //       .expect(409)
  //       .end((err, res) => {
  //         res.should.have.status(409);
  //         err.should.have.status(404);
  //       });
  //   });
  //   it('should return a 403 if the token is missing', () => {
  //     request(app)
  //       .post('/api/v2/events/1')
  //       .set('x-access-token', token)
  //       .send(newEventDB)
  //       .expect(403)
  //       .end((err, res) => {
  //         res.should.have.status(403);
  //         err.should.have.status(404);
  //       });
  //   });
  // });
  // describe('DELETE /events/:eventId', () => {
  //   it('should return a 200 if the ID is valid', () => {
  //     request(app)
  //       .delete('/api/v2/events/1')
  //       .set('x-access-token', token)
  //       .expect(200)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         err.should.have.status(404);
  //       });
  //   });
  //   it('should return a 404 if the ID is valid', () => {
  //     request(app)
  //       .delete('/api/v2/events/dfdfdfd')
  //       .set('x-access-token', token)
  //       .expect(200)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         err.should.have.status(404);
  //       });
  //   });
  // });
});
