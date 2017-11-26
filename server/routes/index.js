import expressJoi from 'express-joi-validator';
import centerSchema from '../validators/centerValidator';
import centerWithIdSchema from '../validators/centerWithIdValidator';
import centerWithParamsSchema from '../validators/centerWithParamsValidator';
import eventSchema from '../validators/eventValidator';
import eventWithIdSchema from '../validators/eventWithIdValidator';
import eventWithParamsSchema from '../validators/eventWithParamsValidator';

const eventsController = require('../controllers').events;
const centersController = require('../controllers').centers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager App'
  }));

  app.post('/events', expressJoi(eventSchema), eventsController.create);
  app.delete('/events/:eventId', expressJoi(eventWithParamsSchema), eventsController.delete);
  app.get('/events', eventsController.get);
  app.get('/events/:eventId', expressJoi(eventWithParamsSchema), eventsController.getSingle);
  app.put('/events/:eventId', expressJoi(eventWithIdSchema), eventsController.edit);

  app.get('/centers', centersController.get);
  app.get('/centers/:centerId', expressJoi(centerWithParamsSchema), centersController.getSingle);
  app.post('/centers', expressJoi(centerSchema), centersController.create);
  app.put('/centers/:centerId', expressJoi(centerWithIdSchema), centersController.edit);
  app.delete('/centers/:centerId', expressJoi(centerWithParamsSchema), centersController.delete);
  // error handler
  app.use((err, req, res, next) => {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload);
    }
  });
};
