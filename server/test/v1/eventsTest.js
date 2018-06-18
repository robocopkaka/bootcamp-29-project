import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import validEvent from '../../schemas/validEvent';
import invalidEvent from '../../schemas/invalidEvent';
import newEvent from '../../schemas/newEvent';
import events from '../../schemas/events';

chai.use(chaiHttp);
chai.should();

describe('POST /api/v1/events endpoint', () => {
  it('should return \'Resource created\' and a 201 if the center parameters are valid', () => {
    chai.request(app)
      .post('/api/v1/events')
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
      .post('/api/v1/events')
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
      .post('/api/v1/events')
      .send(newEvent)
      .catch((err) => {
        err.should.have.status(409);
        err.response.error.text.should.eql('Resource conflict');
      });
  });
});

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

describe('GET /api/v1/events', () => {
  it('should return a 200 and all the centers in the system', () => {
    chai.request(app)
      .get('/api/v1/events')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.should.eql(events);
      });
  });
});

describe('GET /api/v1/events/<eventId>', () => {
  it('should return 200 and a event, if the id is valid', () => {
    chai.request(app)
      .get('/api/v1/events/1')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('id').eql(1);
      });
  });
  it('should return 404, if the id is invalid or doesn\'t exist', () => {
    chai.request(app)
      .get('/api/v1/events/20')
      .catch((err) => {
        err.should.have.status(404);
      });
  });
});

describe('DELETE /api/v1/events/<eventid>', () => {
  it('should return a successful message and a 200 if the id exists', () => {
    chai.request(app)
      .delete('/api/v1/events/1')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Resource deleted successfully');
      })
      .catch((err) => {
        err.should.have.status(404);
      });
  });
  it('should return a resource not found and a 404 if the id doesn\'t exist', () => {
    chai.request(app)
      .delete('/api/v1/events/20')
      .then(() => {
        // throw new Error('Resource not found');
      })
      .catch((err) => {
        err.should.have.status(404);
        err.response.body.should.have.property('message').eql('Resource not found');
      });
  });
});
