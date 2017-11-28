import expressJoi from 'express-joi-validator';
import centerSchema from '../validators/centerValidator';
import centerWithIdSchema from '../validators/centerWithIdValidator';
import centerWithParamsSchema from '../validators/centerWithParamsValidator';
import eventSchema from '../validators/eventValidator';
import eventWithIdSchema from '../validators/eventWithIdValidator';
import eventWithParamsSchema from '../validators/eventWithParamsValidator';
import userSchema from '../validators/userSchema';

const eventsController = require('../controllers/v1').events;
const centersController = require('../controllers/v1').centers;
const usersController = require('../controllers/v2').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager App'
  }));

  app.post('/api/v1/events', expressJoi(eventSchema), eventsController.create);
  app.delete('/api/v1/events/:eventId', expressJoi(eventWithParamsSchema), eventsController.delete);
  app.get('/api/v1/events', eventsController.get);
  app.get('/api/v1/events/:eventId', expressJoi(eventWithParamsSchema), eventsController.getSingleEvent);
  app.put('/api/v1/events/:eventId', expressJoi(eventWithIdSchema), eventsController.edit);

  app.get('/api/v1/centers', centersController.get);
  app.get('/api/v1/centers/:centerId', expressJoi(centerWithParamsSchema), centersController.getSingleCenter);
  app.post('/api/v1/centers', expressJoi(centerSchema), centersController.create);
  app.put('/api/v1/centers/:centerId', expressJoi(centerWithIdSchema), centersController.edit);
  app.delete('/api/v1/centers/:centerId', expressJoi(centerWithParamsSchema), centersController.delete);

  app.post('api/v2/users', usersController.create);
  // error handler
  app.use((err, req, res, next) => {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload);
    }
  });
};
