import chai from 'chai';
import request from 'supertest';
import app from '../../app';
import newEventDB from '../../schemas/newEventDB';

chai.should();

describe('POST /events', () => {
  it('should return a 201 if the event is created successfully', () => {
    request(app)
      .post('/api/v2/events')
      .send(newEventDB)
      .expect(200)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        err.should.have.status(404);
      });
  });
});

describe('POST /events', () => {
  it('should return a 409 if the event date is already taken', () => {
    request(app)
      .post('/api/v2/events')
      .send(newEventDB)
      .expect(409)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        err.should.have.status(404);
      });
  });
});

describe('POST /events', () => {
  it('should return a 400 if the parameters are undefined', () => {
    request(app)
      .post('/api/v2/events')
      .send(newEventDB)
      .expect(400)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        err.should.have.status(404);
      });
  });
});
