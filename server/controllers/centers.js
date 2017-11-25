import centers from '../models/centers';

module.exports = {
  create(req, res) {
    const center = centers.find(aCenter => aCenter.name === req.body.name);
    if (center === undefined) {
      centers.push(req.body);
      res.status(201).send('Resource created');
    } else {
      res.status(409).send('Resource conflict');
    }
  },
  edit(req, res) {
    // let center = centers.find(aCenter => aCenter.id === req.params.centerId);
    const centerIndex = centers.findIndex(aCenter => aCenter.id === req.params.centerId);
    centers[centerIndex] = req.body;
    res.status(200).send({
      message: 'Resource updated',
      data: centers[centerIndex]
    });
  }
};
