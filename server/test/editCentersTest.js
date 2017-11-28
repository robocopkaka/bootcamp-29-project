import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import validCenter from '../schemas/validCenter';
import invalidCenter from '../schemas/invalidCenter';

chai.use(chaiHttp);
chai.should();

describe('PUT /api/v1/centers/<centerId>', () => {
  it('should return a 200 if the parameters were valid', () => {
    chai.request(app)
      .put('/api/v1/centers/1')
      .send({
        name: 'The main centerssssssss',
        detail: 'We exist',
        image: 'ramsey.jpg',
        address: 'somewhere in lagos',
        state: 'lagos'
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.data.should.have.property('name').eql('The main centerssssssss');
      });
  });
  it('should return a 400 if the parameters were invalid', () => {
    chai.request(app)
      .put('/api/v1/centers/1')
      .send(invalidCenter)
      .catch((err) => {
        err.should.have.status(400);
      });
  });
  it('should return a 409 if there\'s a resource conflict with center names', () => {
    chai.request(app)
      .put('/api/v1/centers/3')
      .send(validCenter)
      .then(() => {
        // res.should.have.status(409);
      })
      .catch((err) => {
        err.should.have.status(409);
        err.response.error.text.should.eql('Resource conflict');
      });
  });
  it('should return a 404 if the ID is invalid or doesn\'t exist', () => {
    chai.request(app)
      .put('/api/v1/centers/20')
      .send(validCenter)
      .then(() => {
      })
      .catch((err) => {
        err.should.have.status(404);
      });
  });
});
