import db from '../../models/index';

module.exports = {
  create(req, res) {
    db.User
      .findOne({
        where: { id: req.decoded.id }
      })
      .then((user) => {
        if (!user.isAdmin) {
          res.status(403).send('User is not an admin');
        } else if (user.isAdmin) {
          db.Center
            .create({
              name: req.body.name,
              detail: req.body.detail,
              capacity: req.body.capacity,
              address: req.body.address,
              state: req.body.state,
              userId: user.id
            })
            .then((center) => {
              res.status(201).send({
                status: 201,
                success: true,
                message: 'center created successfully',
                center
              });
            })
            .catch(error => res.status(500).send(error));
        }
      });
  },
  getSingleCenter(req, res) {
    db.Center
      .findOne({
        where: { id: parseInt(req.params.centerId, 10) }
      })
      .then((center) => {
        if (!center) {
          res.status(404).send('Center not found');
        } else if (center) {
          res.status(200).send(center);
        }
      })
      .catch(error => res.status(400).send(error));
  }
};
