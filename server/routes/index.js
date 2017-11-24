const eventsController = require('../controllers').events;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager App'
  }));

  app.post('/events', eventsController.create);
  app.get('/events');
  app.get('/events/:eventId');
  app.put('/events/:eventId', eventsController.edit);
'
};
