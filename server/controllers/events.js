const events = [];
module.exports = {
  create(req, res) {
    if (req.body.name === undefined || req.body.date === undefined || req.body.time === undefined) {
      res.status(400).send('Bad Request');
    } else {
      events.push(req.body);
      res.status(201).send({
        message: 'Created successfully'
      });
    }
  }
};
