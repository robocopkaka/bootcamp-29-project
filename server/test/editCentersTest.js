import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import validCenter from '../models/validCenter';
import newCenter from '../models/newCenter';
import invalidCenter from '../models/invalidCenter';

chai.use(chaiHttp);
chai.should();

describe('PUT /centers/<centerId>', () => {
  it('should return a 200 if the parameters were valid', () => {
    chai.request(app)
      .put('/centers/1')
      .send(newCenter)
      .then((res) => {
        res.should.have.status(200);
        // check that a property was modified
      })
      .catch((err) => {
        err.should.have.status(404);
      });
  });
  it('should return a 400 if the parameters were invalid', () => {
    chai.request(app)
      .put('/centers/1')
      .send(invalidCenter)
      .then(() => {
        // res.should.have.status(200);
        // check that a property was modified
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
  it('should return a 409 if there\'s a resource conflict with center names', () => {
    chai.request(app)
      .put('/centers/1')
      .send(validCenter)
      .then(() => {
        // res.should.have.status(200);
        // check that a property was modified
      })
      .catch((err) => {
        err.should.have.status(409);
        err.response.request.res.should.have.property('text').eql('Resource conflict');
      });
  });
});
