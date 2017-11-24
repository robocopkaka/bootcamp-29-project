import centers from '../models/centers';

module.exports = {
  create(req, res) {
    console.log(req.body);
    centers.push(req.body);
    res.status(201).send('Resource created');
  }
};
