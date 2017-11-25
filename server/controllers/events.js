import events from '../models/events';

const newEvents = [];

module.exports = {
  create(req, res) {
    if (req.body.name === undefined || req.body.date === undefined || req.body.time === undefined
      || req.body.centerId === undefined) {
      res.status(400).send({
        message: 'Bad Request'
      });
    } else {
      newEvents.push(req.body);
      res.status(201).send({
        message: 'Created successfully'
      });
    }
  },
  edit(req, res) {
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    if (event === undefined) {
      res.status(404).send('Resource not found');
    } else if (req.body.name === undefined || req.body.date === undefined
      || req.body.time === undefined || req.body.centerId === undefined) {
      res.status(400).send('Bad request');
    } else {
      event.name = req.body.name;
      res.status(200).send({
        message: 'Resource updated successfully',
        data: event
      });
    }
  },
  delete(req, res) {
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    if (event === undefined) {
      res.status(404).send({
        message: 'Resource not found'
      });
    } else {
      const eventId = events.findIndex(anEvent => anEvent.id === req.params.eventId);
      events.splice(eventId, 1);
      res.status(200).send({
        message: 'Resource deleted successfully'
      });
    }
  },
  get(req, res) {
    res.status(200).send(events);
  },
  getSingle(req, res) {

  }
};
