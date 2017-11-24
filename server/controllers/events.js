const events = [
  {
    id: '1',
    name: 'kachi\'s event',
    date: '2011-11-11',
    time: '08:00',
    centerId: '1'
  },
  {
    id: '2',
    name: 'kachi\'s second event',
    date: '2011-11-11',
    time: '08:00',
    centerId: '3'
  },
  {
    id: '3',
    name: 'kachi\'s event',
    date: '2011-11-11',
    time: '08:00',
    centerId: '2'
  }
];

module.exports = {
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
  }
};
