import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('DELETE /centers/<centerId>', () => {
  it('should delete a center and return a 204 if the ID is valid', () => {
    chai.request(app)
      .delete('/centers/2')
      .then((res) => {
        res.should.have.status(200);
      })
      .catch((err) => {
        err.should.have.status(404);
      });
  });
  it('should return a 404 if the ID is invalid or doesn\'t exist', () => {
    chai.request(app)
      .delete('/centers/90')
      .catch((err) => {
        err.should.have.status(404);
      });
  });
});
