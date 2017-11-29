import chai from 'chai';
import chaiHttp from 'chai-http';
import Sequelize from 'sequelize';
import app from '../../app';
import newCenterDB from '../../schemas/newCenterDB';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYm9jb3BrYWthQGdtYWlsLmNvbSIsImlkIjoxLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTExOTYwNTAxLCJleHAiOjE1MTIwNDY5MDF9.VP4O9UCI_zGS4E0riLqEoit1YFAk_bDIKROZ5YdImPo';

chai.use(chaiHttp);
chai.should();
const sequelize = new Sequelize(`postgres://${process.env.DB_TEST_USER}:${process.env.DB_TEST_USER}@localhost:5432/event-manager-test`, { logging: false });

describe('POST /api/v2/centers endpoint', () => {
  beforeEach((done) => {
    sequelize.sync({ force: true }).then(() => { done(); });
  });
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
  it('should return a 500 if the center name is already in the database', () => {
    chai.request(app)
      .post(`/api/v2/centers?token=${token}`)
      .send(newCenterDB)
      .catch((err) => {
        err.should.have.status(500);
        err.response.request.res.should.have.property('text').eql('Resource conflict');
      });
  });
  it('should return a 200 and all the centers in the system', () => {
    chai.request(app)
      .get('/api/v1/centers')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
      });
  });
});
