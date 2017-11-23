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
    date: '2011-01-01',
    time: '08:00',
    centerId: 1
  }
];

module.exports = {
  edit(req, res) {
    console.log(req.params);
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    event.name = req.body.name;
    res.status(200).send(event);
  }
};
