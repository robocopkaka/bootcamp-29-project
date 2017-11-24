const events = [
  {
    id: 1,
    name: 'kachi\'s event',
    date: '2011-11-11',
    time: '08:00',
    centerId: 1
  },
  {
    id: 3,
    name: 'kachi\'s second event',
    date: '2011-11-11',
    time: '08:00',
    centerId: 1
  },
  {
    id: 3,
    name: 'kachi\'s event',
    date: '2011-11-11',
    time: '08:00',
    centerId: 1
  }
];

module.exports = {
  delete(req, res) {
    const event = events.find(anEvent => anEvent.id === req.params.id);
    events.splice(event, 1);
    res.status(200).send({
      message: 'Resource deleted successfully',
      data: event
    });
  }
};
