import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import newCenterDB from '../../schemas/newCenterDB';
import db from '../../models/index';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtha2ExNjYwQGdtYWlsLmNvbSIsImlkIjo2LCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MTIwNjQwODMsImV4cCI6MTUxMjE1MDQ4M30.WW8WfZfNjzf6ELaM4HvFn5fjny4lbpvoM_rE2RbMUe4';

chai.use(chaiHttp);
chai.should();
const { sequelize } = db;

describe('drop tables', () => {
  beforeEach((done) => {
    sequelize.sync({ force: true }).then(() => { done(); });
  });
});

describe('POST /api/v2/centers endpoint', () => {
  it('should return \'Resource created\' and a 201 if the center parameters are valid', () => {
    chai.request(app)
      .post(`/api/v2/centers?token=${token}`)
      .send(newCenterDB)
      .then((res) => {
        res.should.have.status(201);
        // res.body.should.have.property('id');
        // res.body.should.have.property('message').eql('Center created');
      })
      .catch(() => {
        // console.log(err.status);
        // err.should.have.status(404);
      });
  });
  it('should return \'Bad request\' and a 400 if the center parameters are invalid', () => {
    chai.request(app)
      .post(`/api/v2/centers?token=${token}`)
      .send()
      .then(() => {
        //
      })
      .catch((err) => {
        err.should.have.status(400);
        err.response.body.should.have.property('message');
      });
  });
});
describe('GET /api/v2/centers', () => {
  it('should return a 200 and all the centers in the system', () => {
    chai.request(app)
      .get('/api/v2/centers')
      .then((res) => {
        res.should.have.status(200);
        res.body.users.should.be.an('array');
      });
  });
});

describe('GET /api/v2/centers/<centerId>', () => {
  it('should return 200 and a center, if the id is valid', () => {
    chai.request(app)
      .get('/api/v2/centers/1')
      .then((res) => {
        res.should.have.status(200);
      });
  });
  it('should return 404, if the id is invalid or doesn\'t exist', () => {
    chai.request(app)
      .get('/api/v2/centers/190888')
      .catch((err) => {
        err.should.have.status(404);
      });
  });
});

describe('PUT /api/v1/centers/<centerId>', () => {
  it('should return a 200 if the parameters were valid', () => {
    chai.request(app)
      .put('/api/v2/centers/1')
      .send({
        name: 'The main centerssssssss',
        detail: 'We exist',
        image: 'ramsey.jpg',
        address: 'somewhere in lagos',
        state: 'lagos',
        capacity: 1000
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.data.should.have.property('name').eql('The main centerssssssss');
      });
  });
  it('should return a 400 if the parameters were invalid', () => {
    chai.request(app)
      .put('/api/v2/centers/1')
      .send({})
      .catch((err) => {
        err.should.have.status(400);
      });
  });
  it('should return a 409 if there\'s a resource conflict with center names', () => {
    chai.request(app)
      .put('/api/v2/centers/1')
      .send(newCenterDB)
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
      .put('/api/v2/centers/2000000000000')
      .send(newCenterDB)
      .then(() => {
      })
      .catch((err) => {
        err.should.have.status(404);
      });
  });
});
