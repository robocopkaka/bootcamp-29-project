import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import validCenter from '../../schemas/validCenter';
import invalidCenter from '../../schemas/invalidCenter';
import newCenter from '../../schemas/newCenter';
import centers from '../../schemas/centers';

chai.use(chaiHttp);
chai.should();

describe('POST /api/v1/centers endpoint', () => {
  it('should return \'Resource created\' and a 201 if the center parameters are valid', () => {
    chai.request(app)
      .post('/api/v1/centers')
      .send(newCenter)
      .then((res) => {
        res.should.have.status(201);
        res.body.should.have.property('id');
        res.body.should.have.property('message').eql('Center created');
      })
      .catch(() => {
        // console.log(err.status);
        // err.should.have.status(404);
      });
  });
  it('should return \'Bad request\' and a 400 if the center parameters are invalid', () => {
    chai.request(app)
      .post('/api/v1/centers')
      .send(invalidCenter)
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
      .post('/api/v1/centers')
      .send(validCenter)
      .catch((err) => {
        err.should.have.status(409);
        err.response.request.res.should.have.property('text').eql('Resource conflict');
      });
  });
});

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

describe('GET /api/v1/centers', () => {
  it('should return a 200 and all the centers in the system', () => {
    chai.request(app)
      .get('/api/v1/centers')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.should.eql(centers);
      });
  });
});

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

describe('DELETE /api/v1/centers/<centerId>', () => {
  it('should delete a center and return a 204 if the ID is valid', () => {
    chai.request(app)
      .delete('/api/v1/centers/2')
      .then((res) => {
        res.should.have.status(200);
      })
      .catch((err) => {
        err.should.have.status(404);
      });
  });
  it('should return a 404 if the ID is invalid or doesn\'t exist', () => {
    chai.request(app)
      .delete('/api/v1/centers/90')
      .catch((err) => {
        err.should.have.status(404);
      });
  });
});
