import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import centers from '../models/centers';

chai.use(chaiHttp);
chai.should();

describe('GET /centers', () => {
  it('should return a 200 and all the centers in the system', () => {
    chai.request(app)
      .get('/centers')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.should.eql(centers);
      });
  });
});
