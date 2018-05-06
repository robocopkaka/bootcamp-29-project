import chai from 'chai';
import request from 'supertest';
import app from '../../app';
import newCenterDB from '../../schemas/newCenterDB';
// import './initialize';
import db from '../../models/index';

chai.should();
// const { sequelize } = db;
let token;
describe('Centers endpoints', () => {
  before(() => (
    request(app)
      .post('/api/v2/users/login')
      .send({
        email: 'onyekachi@kachi.com',
        password: 'password',
      })
      .then((res) => {
        ({ token } = res.body);
      })
  ));
  describe('POST /api/v2/centers endpoint', () => {
    it('should return \'Resource created\', a center object and a 201 if the center parameters are valid', () => (
      request(app)
        .post('/api/v2/centers')
        .set('x-access-token', token)
        .send(newCenterDB)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.have.property('center');
          res.body.should.have.property('center').should.be.an('object');
          res.body.center.should.have.property('id');
          res.body.center.id.should.equal(10);
          res.body.center.name.should.equal('Center3');
          res.body.center.detail.should.equal('We exist');
          res.body.center.image.should.equal('ramsey.jpg');
          res.body.center.address.should.equal('somewhere in lagos');
          res.body.center.chairs.should.equal(10);
          res.body.center.projector.should.equal(1);
          res.body.center.capacity.should.equal(1000);
          res.body.center.state.should.equal('state');
          res.body.message.should.equal('Center created successfully');
        })
        .catch(err => console.log(err.response))
    ));
    it('should return \'Bad request\' and a 400 if the center parameters are invalid', () => {
      chai.request(app)
        .post('/api/v2/centers')
        .set('x-access-token', token)
        .send()
        .then(() => {
          //
        })
        .catch((err) => {
          err.should.have.status(400);
          err.response.body.should.have.property('message');
        });
    });
    it('should return \'Resource conflict\' and a 409 if the center exists', () => (
      request(app)
        .post('/api/v2/centers')
        .set('x-access-token', token)
        .send(newCenterDB)
        .catch((res) => {
          res.should.have.status(409);
          res.body.message.should.equal('Center already exists');
        })
    ));
  });
  describe('GET /api/v2/centers', () => {
    it('should return a 200 and all the centers in the system', () => (
      request(app)
        .get('/api/v2/centers')
        .then((res) => {
          res.should.have.status(200);
          res.body.data.centers.should.be.an('array');
          res.body.data.centers.length.should.equal(9);
          res.body.should.have.property('meta');
          res.body.meta.should.have.property('pagination');
          res.body.meta.pagination.limit.should.equal(9);
        })
    ));
    it('should a 400 if the page number specified is invalid', () => {
      request(app)
        .get(`/api/v2/centers?page=${'ox'}`)
        .then((res) => {
          res.should.have.status(400);
        });
    });
    it('should return the appropriate number of centers for the limit specified', () => {
      request(app)
        .get(`/api/v2/centers?limit=${4}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('centers');
          res.body.data.centers.length.should.equal(4);
          res.body.meta.pagination.limit.should.equal(4);
        });
    });
    it('should start at the right center if the page number is specified', () => {
      request(app)
        .get(`/api/v2/centers?limit=${4}&page=${2}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('centers');
          res.body.data.centers.length.should.equal(4);
          res.body.data.centers[0].id.should.equal(5);
          res.body.meta.pagination.limit.should.equal(4);
        });
    });
  });

  describe('GET /api/v2/centers/<centerId>', () => {
    it('should return 200 and a center, if the id is valid', () => (
      request(app)
        .get('/api/v2/centers/1')
        .then((res) => {
          res.should.have.status(200);
        })
        .catch((err) => {
          console.log(err);
        })
    ));
    it('should return 404, if the id is invalid or doesn\'t exist', () => (
      request(app)
        .get('/api/v2/centers/190888')
        .catch((err) => {
          err.should.have.status(404);
        })
    ));
  });

  describe('PUT /api/v1/centers/<centerId>', () => {
    it('should return a 200 if the parameters were valid', () => (
      request(app)
        .put('/api/v2/centers/2')
        .set('x-access-token', token)
        .send({
          name: 'The main centerssssssss',
          detail: 'We exist',
          image: 'ramsey.jpg',
          address: 'somewhere in lagos',
          state: 'lagos',
          chairs: 10,
          projector: 1,
          capacity: 1000
        })
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.property('center');
          res.body.center.id.should.equal(2);
          res.body.center.name.should.equal('The main centerssssssss');
          res.body.center.detail.should.equal('We exist');
          res.body.center.image.should.equal('ramsey.jpg');
          res.body.center.address.should.equal('somewhere in lagos');
          res.body.center.chairs.should.equal(10);
          res.body.center.projector.should.equal(1);
          res.body.center.capacity.should.equal(1000);
          res.body.center.state.should.equal('lagos');
        })
    ));
    it('should return a 200 if the request body deep equals a row with the params ID in the database', () => (
      chai.request(app)
        .put('/api/v2/centers/1')
        .set('x-access-token', token)
        .send({
          name: 'Centerrry',
          detail: 'We exist',
          image: 'ramsey.jpg',
          address: 'somewhere in lagos',
          chairs: 10,
          projector: 1,
          capacity: 1000,
          state: 'state'
        })
        .then((res) => {
          res.should.have.status(200);
          res.body.center.should.have.property('id');
          res.body.center.id.should.equal(1);
          res.body.center.name.should.equal('Centerrry');
          res.body.center.detail.should.equal('We exist');
          res.body.center.image.should.equal('ramsey.jpg');
          res.body.center.address.should.equal('somewhere in lagos');
          res.body.center.chairs.should.equal(10);
          res.body.center.projector.should.equal(1);
          res.body.center.capacity.should.equal(1000);
          res.body.center.state.should.equal('state');
          res.body.message.should.equal('Center updated successfully');
        })
    ));
    it('should return a 400 if the parameters were invalid', () => (
      chai.request(app)
        .put('/api/v2/centers/1')
        .set('x-access-token', token)
        .send({})
        .catch((err) => {
          err.should.have.status(400);
        })
    ));
    it('should return a 409 if there\'s a resource conflict with center names', () => (
      chai.request(app)
        .put('/api/v2/centers/1')
        .set('x-access-token', token)
        .send({
          name: 'The main centerssssssss',
          detail: 'We existed',
          image: 'ramsey.jpg',
          address: 'somewhere in lagos',
          state: 'lagos',
          capacity: 1000
        })
        .catch((err) => {
          err.should.have.status(409);
          err.response.body.should.have.property('message').eql('Center name exists');
        })
    ));
    it('should return a 404 if the ID is invalid or doesn\'t exist', () => (
      chai.request(app)
        .put('/api/v2/centers/2000000000000')
        .set('x-access-token', token)
        .send(newCenterDB)
        .then(() => {
        })
        .catch((err) => {
          err.should.have.status(404);
        })
    ));
  });
});
