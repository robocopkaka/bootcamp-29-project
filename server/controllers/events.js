const events = [];
module.exports = {
  create(req, res) {
    if (req.body.name === undefined || req.body.date === undefined || req.body.time === undefined
      || req.body.centerId === undefined) {
      res.status(400).send({
        message: 'Bad Request'
      });
    } else {
      events.push(req.body);
      res.status(201).send({
        message: 'Created successfully'
      });
    }
  }
};
