import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import validEvent from '../models/validEvent';
import invalidEvent from '../models/invalidEvent';
import newEvent from '../models/newEvent';

chai.use(chaiHttp);
chai.should();

describe('PUT /events/<eventid>', () => {
  it('should edit an event if the parameters supplied are valid', () => {
    chai.request(app)
      .put('/events/1')
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
  it('should return resource not found if the id doesn\'t exist yet', () => {
    chai.request(app)
      .put('/events/10')
      .send(newEvent)
      .catch((err) => {
        err.should.have.status(404);
      });
  });
  it('should not edit an event if the parameters supplied are invalid', () => {
    chai.request(app)
      .put('/events/1')
      .send(invalidEvent)
      .then(() => {
        //
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
  it('should not edit an event if a malformed request is passed', () => {
    chai.request(app)
      .put('/events/1')
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
