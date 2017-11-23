import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('PUT /events/<eventid>', () => {
  it('should edit an event if the parameters supplied are valid', () => {
    chai.request(app)
      .put('/events/1')
      .send({
        name: 'edited name',
        date: '2017-11-11',
        time: '08:00',
        centerId: 3
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('id');
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
});
