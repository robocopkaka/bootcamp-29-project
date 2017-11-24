import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import validCenter from '../models/validCenter';
import invalidCenter from '../models/invalidCenter';

chai.use(chaiHttp);
chai.should();

describe('POST /centers endpoint', () => {
  it('should return \'Resource created\' and a 201 if the center parameters are valid', () => {
    chai.request(app)
      .post('/events')
      .send({
        name: 'The main center',
        detail: 'We exist',
        facilities: ['chairs', 'projectors', 'some other stuff'],
        image: 'ramsey.jpg'
      })
      .then((res) => {
        res.should.have.status(201);
        res.body.should.have.property('id');
        res.body.should.have.property('message').eql('Resource created');
      })
      .catch((err) => {
        console.log('gets to catch');
        err.should.have.status(404);
      });
  });
  it('should return \'Bad request\' and a 400 if the center parameters are invalid', () => {
    chai.request(app)
      .post('/events')
      .send(invalidCenter)
      .catch((err) => {
        err.should.have.status(400);
        err.response.body.should.have.property('message').eql('Bad request');
      });
  });
  it('should return a 409 if the center name is already in the database', () => {
    chai.request(app)
      .post('/events')
      .send(validCenter)
      .catch((err) => {
        err.should.have.status(409);
        err.response.body.should.have.property('message').eql('Resource exists');
      });
  });
});
