import events from '../../models/events';

module.exports = {
  create(req, res) {
    const event = events.find(anEvent => anEvent.name === req.body.name);
    if (event === undefined) {
      const last = events.slice(-1);
      req.body.id = last + 1;
      events.push(req.body);
      res.status(201).send({
        message: 'Created successfully'
      });
    } else {
      res.status(409).send('Resource conflict');
    }
  },
  edit(req, res) {
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    if (event === undefined) {
      res.status(404).send('Resource not found');
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
      const eventId = parseInt(req.params.centerId, 10);
      const eventIndex = events.findIndex(anEvent => anEvent.id === eventId);
      events.splice(eventIndex, 1);
      res.status(200).send({
        message: 'Resource deleted successfully'
      });
    }
  },
  get(req, res) {
    res.status(200).send(events);
  },
  getSingle(req, res) {
    const event = events.find(aEvent => aEvent.id === parseInt(req.params.eventId, 10));
    if (event === undefined) {
      res.status(404).send({
        message: 'Resource not found'
      });
    } else {
      res.status(200).send(event);
    }
  }
};
