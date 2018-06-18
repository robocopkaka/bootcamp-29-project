import chai from 'chai';
import request from 'supertest';
import app from '../../app';
import newEventDB from '../../schemas/newEventDB';
import editEventDB from '../../schemas/editEventDB';
import datePassedEventDB from '../../schemas/datePassedEvent';
import moreGuestsEventsDB from '../../schemas/moreGuestsEventsDB';
import invalidEventDate from '../../schemas/invalidEventDate';
// import './initialize';

// const { sequelize } = db;
chai.should();
let token;
describe('Events endpoints', () => {
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
  describe('POST /events', () => {
    it('should return a 201 if the event is created successfully', () => (
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(201)
        .then((res) => {
          res.should.have.status(201);
          res.body.event.id.should.equal(13);
          res.body.event.name.should.equal('kachi\'s ultra mega second event');
          res.body.event.detail.should.equal('Awesome event');
          res.body.event.date.should.equal('2019-11-11T00:00:00.000Z');
          res.body.event.guests.should.equal(1000);
          res.body.event.categoryId.should.equal(1);
          res.body.event.centerId.should.equal(1);
          res.body.message.should.equal('Event created successfully');
        })
    ));
    it('should return a 409 if the event date is already taken', () => (
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(409)
        .then((res) => {
          res.should.have.status(409);
          res.body.should.be.an('object');
          res.body.message.should.equal('Oops, date already taken. Try another');
        })
    ));
    it('should return a 400 if the parameters are undefined', () => (
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send({})
        .expect(400)
        .catch((err) => {
          err.should.have.status(400);
          err.body.should.be.an('object');
        })
    ));
    it('should return a 403 if the token is missing', () => (
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', '')
        .send(newEventDB)
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          res.body.message.should.equal('No token provided');
        })
    ));
    it('should return a 403 if the date entered has passed', () => {
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(datePassedEventDB)
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal('You likely entered a date that has already passed. Please enter another');
        });
    });
    it('should return a 403 if the number of guests is more than the center\'s capacity', () => {
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(moreGuestsEventsDB)
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal('The center you selected cannot accomodate the number of guests you entered. Please select another');
        });
    });
    it('should return a 403 if the date is invalid', () => {
      request(app)
        .post('/api/v2/events')
        .set('x-access-token', token)
        .send(invalidEventDate)
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal('You entered an invalid date');
        });
    });
  });
  describe('PUT /events/<eventId>', () => {
    it('should return a 200 if the update is successful', () => (
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send(editEventDB)
        .expect(200)
        .then((res) => {
          res.should.have.status(200);
          res.body.event.id.should.equal(1);
          res.body.event.name.should.equal('kachi\'s ultra third event');
          res.body.event.detail.should.equal('Awesome event');
          res.body.event.date.should.equal('2019-11-02T00:00:00.000Z');
          res.body.event.guests.should.equal(1000);
          res.body.event.categoryId.should.equal(1);
          res.body.event.centerId.should.equal(1);
          res.body.message.should.equal('Event updated successfully');
        })
    ));
    it('should return a 400 if an empty object is sent', () => (
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send({})
        .expect(400)
        .catch((err) => {
          err.should.have.status(400);
        })
    ));
    it('should return a 409 if an event name already exists', () => (
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send({
          name: 'kachi\'s ultra mega second event',
          detail: 'Awesome events',
          guests: 1000,
          date: '2018-11-30',
          categoryId: 1,
          centerId: 1
        })
        .expect(409)
        .then((res) => {
          res.should.have.status(409);
          res.body.message.should.equal('Event name already exists');
        })
    ));
    it('should return a 409 if an event date already exists', () => (
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send({
          name: 'kachi\'s ultra dupy event',
          detail: 'Awesome event',
          guests: 1000,
          date: '2019-11-11',
          categoryId: 1,
          centerId: 1
        })
        .expect(409)
        .then((res) => {
          res.should.have.status(409);
          res.body.message.should.equal('Oops. Date has already been taken');
        })
    ));
    it('should return a 200 if the request body deep equals a row with the params ID in the database', () => (
      request(app)
        .put('/api/v2/events/13')
        .set('x-access-token', token)
        .send(newEventDB)
        .expect(200)
        .then((res) => {
          res.should.have.status(200);
          res.body.event.id.should.equal(13);
          res.body.event.name.should.equal('kachi\'s ultra mega second event');
          res.body.event.detail.should.equal('Awesome event');
          res.body.event.date.should.equal('2019-11-11T00:00:00.000Z');
          res.body.event.guests.should.equal(1000);
          res.body.event.categoryId.should.equal(1);
          res.body.event.centerId.should.equal(1);
          res.body.message.should.equal('Event updated successfully');
        })
    ));
    it('should return a 403 if the token is missing', () => (
      request(app)
        .put('/api/v2/events/1')
        .send(editEventDB)
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.message.should.equal('No token provided');
        })
    ));
    it('should return a 403 if the date entered has passed', () => {
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send(datePassedEventDB)
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal('You likely entered a date that has already passed. Please enter another');
        });
    });
    it('should return a 403 if the number of guests is more than the center\'s capacity', () => {
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send(moreGuestsEventsDB)
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal('The center you selected cannot accomodate the number of guests you entered. Please select another');
        });
    });
    it('should return a 403 if an authorized user tries to edit an event', () => (
      request(app)
        .post('/api/v2/users/login')
        .send({
          email: 'wilson@kachi.com',
          password: 'password',
        })
        .then((res) => {
          const token2 = res.body.token;
          request(app)
            .put('/api/v2/events/1')
            .set('x-access-token', token2)
            .send(editEventDB)
            .expect(403)
            .then((res) => {
              res.should.have.status(403);
              res.body.message.should.equal('You are not allowed to edit this event');
            });
        })
    ));
    it('should return a 403 if the date is invalid', () => {
      request(app)
        .put('/api/v2/events/1')
        .set('x-access-token', token)
        .send(invalidEventDate)
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal('You entered an invalid date');
        });
    });
  });
  describe('DELETE /events/:eventId', () => {
    it('should return a 200 if the ID is valid', () => (
      request(app)
        .delete('/api/v2/events/1')
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Event deleted successfully');
        })
    ));
    it('should return a 404 if the ID isn\'t in the database', () => (
      request(app)
        .delete('/api/v2/events/2000000000000')
        .set('x-access-token', token)
        .expect(404)
        .then((res) => {
          res.should.have.status(404);
          res.body.message.should.equal('Event not found');
        })
    ));
    it('should return a 403 if no token is supplied', () => (
      request(app)
        .delete('/api/v2/events/1')
        .expect(403)
        .then((res) => {
          res.should.have.status(403);
          res.body.message.should.equal('No token provided');
        })
    ));
  });
  describe('GET /api/v2/events', () => {
    it('should return a 200 and all the events in the system', () => (
      request(app)
        .get('/api/v2/events')
        .then((res) => {
          res.should.have.status(200);
          res.body.data.events.should.be.an('array');
          res.body.data.events.length.should.equal(9);
          res.body.should.have.property('meta');
          res.body.meta.should.have.property('pagination');
          res.body.meta.pagination.limit.should.equal(9);
        })
    ));
    it('should a 400 if the page number specified is invalid', () => {
      request(app)
        .get(`/api/v2/events?page=${'ox'}`)
        .then((res) => {
          res.should.have.status(400);
        });
    });
    it('should return the appropriate number of events for the limit specified', () => {
      request(app)
        .get(`/api/v2/events?limit=${4}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('events');
          res.body.data.events.length.should.equal(4);
          res.body.meta.pagination.limit.should.equal(4);
        });
    });
    it('should start at the right event if the page number is specified', () => {
      request(app)
        .get(`/api/v2/events?limit=${4}&page=${2}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('events');
          res.body.data.events.length.should.equal(4);
          res.body.data.events[0].id.should.equal(6);
          res.body.meta.pagination.limit.should.equal(4);
        });
    });
  });
  describe('GET /api/v2/centers/:centerId/events', () => {
    it('should return a 200 and all the events for the center specified', () => {
      request(app)
        .get(`/api/v2/centers/${1}/events`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('events');
          res.body.data.events.length.should.equal(9);
          res.body.meta.pagination.limit.should.equal(9);
          res.body.meta.pagination.page.should.equal(1);
        });
    });
    it('should return the appropriate number of events for the limit specified', () => {
      request(app)
        .get(`/api/v2/centers/${1}/events?limit=${4}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('events');
          res.body.data.events.length.should.equal(4);
          res.body.meta.pagination.limit.should.equal(4);
        });
    });
    it('should return the appropriate page number if one is specified', () => {
      request(app)
        .get(`/api/v2/centers/${1}/events?page=${2}&limit=${4}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.meta.pagination.page.should.equal(2);
        });
    });
    it('should a 400 if an invalid page number is used', () => {
      request(app)
        .get(`/api/v2/centers/${1}/events?page=${'ox'}`)
        .then((error) => {
          error.should.have.status(400);
        });
    });
    it('should a 400 if an invalid limit number is used', () => {
      request(app)
        .get(`/api/v2/centers/${1}/events?limit=${'ox'}`)
        .then((error) => {
          error.should.have.status(400);
        });
    });
    it('should links for the previous and next pages', () => {
      request(app)
        .get(`/api/v2/centers/${1}/events?limit=${4}&page=${2}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.meta.pagination.prev.should.equal(`http://localhost:8000/api/v2/centers/${1}/events?page=${1}`);
          res.body.meta.pagination.next.should.equal(`http://localhost:8000/api/v2/centers/${1}/events?page=${3}`);
        });
    });
  });
  describe('GET /api/v2/events/<eventId>', () => {
    it('should return 200 and an event, if the id is valid', () => (
      request(app)
        .get('/api/v2/events/2')
        .then((res) => {
          res.should.have.status(200);
          res.body.event.should.have.property('id');
          res.body.event.should.have.property('Center').should.be.an('object');
          res.body.event.should.be.an('object');
        })
    ));
    it('should return 404, if the id is doesn\'t exist', () => (
      request(app)
        .get('/api/v2/events/190888')
        .then((res) => {
          res.should.have.status(404);
          res.body.message.should.equal('Event not found');
        })
    ));
  });
  describe('GET /api/v2/users/<userId>/events', () => {
    it('should return a 200 and all the events for the user specified', () => {
      request(app)
        .get(`/api/v2/users/${1}/events`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('events');
          res.body.data.events.length.should.equal(9);
          res.body.meta.pagination.limit.should.equal(9);
          res.body.meta.pagination.page.should.equal(1);
        });
    });
    it('should return a 200 and all the events for the user specified', () => {
      request(app)
        .get(`/api/v2/users/${2}/events`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('events');
          res.body.data.events.length.should.equal(2);
          res.body.meta.pagination.limit.should.equal(9);
          res.body.meta.pagination.page.should.equal(1);
        });
    });
    it('should return the appropriate number of events for the limit specified', () => {
      request(app)
        .get(`/api/v2/users/${1}/events?limit=${4}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('events');
          res.body.data.events.length.should.equal(4);
          res.body.meta.pagination.limit.should.equal(4);
        });
    });
    it('should return the appropriate page number if one is specified', () => {
      request(app)
        .get(`/api/v2/users/${1}/events?page=${2}&limit=${4}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.meta.pagination.page.should.equal(2);
        });
    });
    it('should a 400 if an invalid page number is used', () => {
      request(app)
        .get(`/api/v2/users/${1}/events?page=${'ox'}`)
        .then((error) => {
          error.should.have.status(400);
        });
    });
    it('should a 400 if an invalid limit number is used', () => {
      request(app)
        .get(`/api/v2/users/${1}/events?limit=${'ox'}`)
        .then((error) => {
          error.should.have.status(400);
        });
    });
    it('should links for the previous and next pages', () => {
      request(app)
        .get(`/api/v2/users/${1}/events?limit=${4}&page=${2}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.meta.pagination.prev.should.equal(`http://localhost:8000/api/v2/users/${1}/events?page=${1}`);
          res.body.meta.pagination.next.should.equal(`http://localhost:8000/api/v2/users/${1}/events?page=${3}`);
        });
    });
  });
});
