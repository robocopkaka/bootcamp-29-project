import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import events from '../schemas/events';

chai.use(chaiHttp);
chai.should();

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
