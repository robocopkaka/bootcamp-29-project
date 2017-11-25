import centers from '../models/centers';

module.exports = {
  create(req, res) {
    const center = centers.find(aCenter => aCenter.name === req.body.name);
    if (center === undefined) {
      // add an ID to the request body before pushing it to the database
      const last = centers.slice(-1);
      req.body.id = last[0].id + 1;
      centers.push(req.body);
      res.status(201).send('Resource created');
    } else {
      res.status(409).send('Resource conflict');
    }
  },
  edit(req, res) {
    const centerIndex = centers.findIndex(aCenter => aCenter.id === req.params.centerId);
    const center = centers.find(aCenter => aCenter.id === req.params.centerId);
    const exist = centers.find(aCenter => aCenter.name === req.body.name);
    if (center === undefined) {
      res.status(404).send('Resource not found');
    } else if (exist === undefined && center !== undefined) {
      centers[centerIndex].name = req.body.name;
      res.status(200).send({
        message: 'Resource updated',
        data: centers[centerIndex]
      });
    } else {
      res.status(409).send('Resource conflict');
    }
  },
  delete(req, res) {
    // centerId = parseInt(req.params.id, 10);
    const center = centers.find(aCenter => aCenter.id === parseInt(req.params.centerId, 10));
    if (center === undefined) {
      res.status(404).send({
        message: 'Resource not found'
      });
    } else {
      const centerId = parseInt(req.params.centerId, 10);
      const centerIndex = centers.findIndex(aCenter => aCenter.id === centerId);
      centers.splice(centerIndex, 1);
      res.status(200).send({
        message: 'Resource deleted successfully'
      });
    }
  },
  get(req, res) {
    res.status(200).send(centers);
  }
};
