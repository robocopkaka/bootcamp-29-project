import { Event, Center, User } from '../../models/index';

module.exports = {
  create(req, res) {
    User
      .findOne({
        where: { id: req.decoded.id }
      })
      .then((user) => {
        if (!user.isAdmin) {
          res.status(403).send({
            success: false,
            message: 'User is not an admin'
          });
        } else if (user.isAdmin) {
          Center
            .findOne({
              where: { id: req.body.centerId },
              include: [
                { model: Event, as: 'events' }
              ]
            })
            .then((center) => {
              if (!center) {
                res.status(404).send({
                  success: false,
                  message: 'Center not found'
                });
              } else if (center) {
                const dates = center.events.map(event => event.date);
                if (dates.map(Number).indexOf(+new Date(req.body.date)) !== -1) {
                  res.status(409).send({
                    success: false,
                    message: 'Oops, date already taken. Try another'
                  });
                } else {
                  Event
                    .findOne({
                      where: { name: req.body.name }
                    })
                    .then((event) => {
                      if (event) {
                        res.status(409).send({
                          success: false,
                          message: 'Event name already exists'
                        });
                      } else {
                        Event
                          .create({
                            name: req.body.name,
                            date: req.body.date,
                            guests: 1000,
                            userId: req.decoded.id,
                            centerId: center.id,
                            categoryId: 1
                          })
                          .then(() => {
                            res.status(201).send({
                              success: true,
                              message: 'Event created successfully'
                            });
                          })
                          .catch(() => {
                            res.status(400).send({
                              success: false,
                              message: 'An error occured creating the event'
                            });
                          });
                      }
                    })
                    .catch(() => {
                      res.status(400).send({
                        success: false,
                        message: 'An error occured when checking if event exists'
                      });
                    });
                }
              }
            });
        }
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'An error occured finding the user'
        });
      });
  }
};
