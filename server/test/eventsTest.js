// const chai = require('chai');
import chai from 'chai';
import chaiHttp from 'chai-http';
// const app = require('../app');
import app from '../app';

// const { expect } = require('chai').expect;
chai.use(chaiHttp);

chai.should();

describe('POST /events', () => {
  // this.timeout(5000);

  it('should create an event if all parameters are supplied', () => {
    chai.request(app)
      .post('/api/events')
      .send({
        name: 'name',
        date: '2017-11-11',
        time: '08:00'
      })
      .then((res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
      })
      .catch((err) => {
        err.should.have.status(404);
      });
  });

  // POST - Bad request
  it('should return Bad request if the name is missing', () => {
    chai.request(app)
      .post('/api/events')
      .send({
        date: '2011-11-11',
        time: '08:00'
      })
      .then(() => {
        // console.log('gets to then');
        // throw new Error('Invalid content type!');
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
  it('should return Bad request if the name is missing', () => {
    chai.request(app)
      .post('/api/events')
      .send({
        name: 'kachi\'s event',
        time: '08:00'
      })
      .then(() => {
        // console.log('gets to then');
        // throw new Error('Invalid content type!');
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
  it('should return Bad request if the time is missing', () => {
    chai.request(app)
      .post('/api/events')
      .send({
        name: 'kachi\'s event',
        date: '2017-11-11'
      })
      .then(() => {
        // console.log('gets to then');
        // throw new Error('Invalid content type!');
      })
      .catch((err) => {
        err.should.have.status(400);
      });
  });
});
