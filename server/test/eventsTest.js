import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

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
        throw new Error('Resource not found');
      })
      .catch((err) => {
        err.should.have.status(404);
        err.response.body.should.have.property('message').eql('Resource not found');
      });
  });
});
