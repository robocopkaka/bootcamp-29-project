const eventsController = require('../controllers').events;

module.exports = (app) => {
  app.delete('/events/:eventId', eventsController.delete);
};
