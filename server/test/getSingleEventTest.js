import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('GET /events/<eventId>', () => {
  it('should return 200 and a event, if the id is valid', () => {
    chai.request(app)
      .get('/events/1')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('id').eql(1);
      });
  });
  it('should return 404, if the id is invalid or doesn\'t exist', () => {
    chai.request(app)
      .get('/events/20')
      .catch((err) => {
        err.should.have.status(404);
      });
  });
});
