import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('GET /api/v1/centers/<centerId>', () => {
  it('should return 200 and a center, if the id is valid', () => {
    chai.request(app)
      .get('/api/v1/centers/1')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.have.property('id').eql(1);
      });
  });
  it('should return 404, if the id is invalid or doesn\'t exist', () => {
    chai.request(app)
      .get('/api/v1/centers/20')
      .catch((err) => {
        err.should.have.status(404);
      });
  });
});
