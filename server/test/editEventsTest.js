import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import validEvent from '../models/validEvent';
import invalidEvent from '../models/invalidEvent';
import newEvent from '../models/newEvent';

chai.use(chaiHttp);
chai.should();

describe('PUT /api/v1/events/<eventid>', () => {
  it('should edit an event if the parameters supplied are valid and return a 200', () => {
    chai.request(app)
      .put('/api/v1/events/1')
      .send(validEvent)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.have.property('id');
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
  it('should return resource not found and a 404 if the id doesn\'t exist yet', () => {
    chai.request(app)
      .put('/api/v1/events/10')
      .send(newEvent)
      .catch((err) => {
        err.should.have.status(404);
      });
  });
  it('should not edit an event if the parameters supplied are invalid and return a 400', () => {
    chai.request(app)
      .put('/api/v1/events/1')
      .send(invalidEvent)
      .then(() => {
        //
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
  it('should not edit an event if a malformed request is passed  and return a 400', () => {
    chai.request(app)
      .put('/api/v1/events/1')
      .send({
        hack: 'yeah',
        some: 'stuff'
      })
      .then(() => {
        //
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
});
