import db from '../../models/index';

module.exports = {
  create(req, res) {
    db.User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then((user) => {
        res.status(200).send({
          data: user
        });
      })
      .catch(err => res.status(400).send(err));
  }
};
