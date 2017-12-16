// import chai from 'chai';
// import request from 'supertest';
// // import db from '../../models/index';
// import app from '../../app';
// import newEventDB from '../../schemas/newEventDB';
// import editEventDB from '../../schemas/editEventDB';
//
// // const { sequelize } = db;
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtha2ExNjYwQGdtYWlsLmNvbSIsImlkIjo2LCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MTIyMzczMjUsImV4cCI6MTUxMjMyMzcyNX0.MpMnDy8O0YVrOw32MtKHp6ympKx669UlzUjNyGf2guw';
// chai.should();
// describe('Events', () => {
//   describe('POST /events', () => {
//     it('should return a 201 if the event is created successfully', () => {
//       request(app)
//         .post(`/api/v2/events?token=${token}`)
//         .send(newEventDB)
//         .expect(200)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.an('object');
//           err.should.have.status(404);
//         });
//     });
//     it('should return a 409 if the event date is already taken', () => {
//       request(app)
//         .post(`/api/v2/events?token=${token}`)
//         .send(newEventDB)
//         .expect(409)
//         .end((err, res) => {
//           res.should.have.status(409);
//           res.body.should.be.an('object');
//           err.should.have.status(404);
//         });
//     });
//     it('should return a 400 if the parameters are undefined', () => {
//       request(app)
//         .post(`/api/v2/events?token=${token}`)
//         .send(newEventDB)
//         .expect(400)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.should.be.an('object');
//           err.should.have.status(404);
//         });
//     });
//     it('should return a 403 if the token is missing', () => {
//       request(app)
//         .post('/api/v2/events')
//         .send(newEventDB)
//         .expect(403)
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.body.should.be.an('object');
//           err.should.have.status(404);
//         });
//     });
//   });
//   describe('PUT /events/<eventId>', () => {
//     it('should return a 200 if the update is successful', () => {
//       request(app)
//         .put(`/api/v2/events/1?token=${token}`)
//         .send(editEventDB)
//         .expect(200)
//         .end((err, res) => {
//           res.body.should.be.an('object');
//           err.should.have.status(404);
//         });
//     });
//     it('should return a 400 if an empty object is sent', () => {
//       request(app)
//         .put(`/api/v2/events/1?token=${token}`)
//         .send({})
//         .expect(400)
//         .end((err, res) => {
//           res.should.have.status(400);
//           err.should.have.status(404);
//         });
//     });
//     it('should return a 409 if an event name ', () => {
//       request(app)
//         .put(`/api/v2/events/1?token=${token}`)
//         .send({})
//         .expect(409)
//         .end((err, res) => {
//           res.should.have.status(409);
//           err.should.have.status(404);
//         });
//     });
//     it('should return a 403 if the token is missing', () => {
//       request(app)
//         .post('/api/v2/events/1')
//         .send(newEventDB)
//         .expect(403)
//         .end((err, res) => {
//           res.should.have.status(403);
//           err.should.have.status(404);
//         });
//     });
//   });
//   describe('DELETE /events/:eventId', () => {
//     it('should return a 200 if the ID is valid', () => {
//       request(app)
//         .delete('/api/v2/events/1')
//         .expect(200)
//         .end((err, res) => {
//           res.should.have.status(200);
//           err.should.have.status(404);
//         });
//     });
//     it('should return a 404 if the ID is valid', () => {
//       request(app)
//         .delete(`/api/v2/events/dfdfdfd?token=${token}`)
//         .expect(200)
//         .end((err, res) => {
//           res.should.have.status(200);
//           err.should.have.status(404);
//         });
//     });
//   });
// });
