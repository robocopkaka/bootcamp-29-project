const eventsController = require('../controllers').events;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager App'
  }));

  app.post('/api/events', eventsController.create);
  app.get('/api/events');
  app.get('/api/events/:eventId');
  app.put('/api/events/:eventId');
};
