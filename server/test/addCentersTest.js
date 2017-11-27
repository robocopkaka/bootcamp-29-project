import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import validCenter from '../models/validCenter';
import invalidCenter from '../models/invalidCenter';
import newCenter from '../models/newCenter';

chai.use(chaiHttp);
chai.should();

describe('POST /api/v1/centers endpoint', () => {
  it('should return \'Resource created\' and a 201 if the center parameters are valid', () => {
    chai.request(app)
      .post('/api/v1/centers')
      .send(newCenter)
      .then((res) => {
        res.should.have.status(201);
        res.body.should.have.property('id');
        res.body.should.have.property('message').eql('Center created');
      })
      .catch(() => {
        // console.log(err.status);
        // err.should.have.status(404);
      });
  });
  it('should return \'Bad request\' and a 400 if the center parameters are invalid', () => {
    chai.request(app)
      .post('/api/v1/centers')
      .send(invalidCenter)
      .then(() => {
        //
      })
      .catch((err) => {
        err.should.have.status(400);
        err.response.body.should.have.property('message');
      });
  });
  it('should return a 409 if the center name is already in the database', () => {
    chai.request(app)
      .post('/api/v1/centers')
      .send(validCenter)
      .catch((err) => {
        err.should.have.status(409);
        err.response.request.res.should.have.property('text').eql('Resource conflict');
      });
  });
});
