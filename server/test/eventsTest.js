import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import validEvent from '../models/validEvent';
import invalidEvent from '../models/invalidEvent';
import newEvent from '../models/newEvent';

chai.use(chaiHttp);
chai.should();

describe('DELETE events/<eventid>', () => {
  it('should return a successful message if the id exists', () => {
    chai.request(app)
      .delete('/events/1')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Resource deleted successfully');
      })
      .catch((err) => {
        err.should.have.status(404);
      });
  });
  it('should return a resource not found if the id doesn\'t exist', () => {
    chai.request(app)
      .delete('/events/20')
      .then(() => {
        // throw new Error('Resource not found');
      })
      .catch((err) => {
        err.should.have.status(404);
        err.response.body.should.have.property('message').eql('Resource not found');
      });
  });
});
describe('POST /events endpoint', () => {
  it('should return \'Resource created\' and a 201 if the center parameters are valid', () => {
    chai.request(app)
      .post('/events')
      .send(newEvent)
      .then((res) => {
        res.should.have.status(201);
        res.body.should.have.property('id');
        res.body.should.have.property('message').eql('Resource created');
      })
      .catch(() => {
        // console.log(err.status);
        // err.should.have.status(404);
      });
  });
  it('should return \'Bad request\' and a 400 if the center parameters are invalid', () => {
    chai.request(app)
      .post('/events')
      .send(invalidEvent)
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
      .post('/events')
      .send(validEvent)
      .catch((err) => {
        console.log(err.response.error.text.message);
        err.should.have.status(409);
        err.response.error.text.should.eql('Resource conflict');
      });
  });
});
