const events = [
  {
    id: '1',
    name: 'Kachi\'s event',
    date: '2011-01-01',
    time: '08:00',
    centerId: 1
  },
  {
    id: '2',
    name: 'Kachi\'s event',
    date: '2011-01-02',
    time: '08:00',
    centerId: 1
  }
];

module.exports = {
  edit(req, res) {
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    if (event === undefined) {
      res.status(404).send('Resource not found');
    } else if (req.body.name === undefined || req.body.date === undefined
      || req.body.time === undefined || req.body.centerId === undefined) {
      res.status(400).send('Bad request');
    } else {
      event.name = req.body.name;
      res.status(200).send(event);
    }
  }
};
