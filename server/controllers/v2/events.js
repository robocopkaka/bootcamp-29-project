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
                            categoryId: req.body.categoryId
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
  },
  edit(req, res) {
    User
      .findOne({
        where: { id: req.decoded.id }
      })
      .then((user) => {
        if (!user.isAdmin) {
          res.status(401).send({
            success: false,
            message: 'User is not an admin'
          });
        } else if (user.isAdmin) {
          Event
            .findOne({
              where: { name: req.body.name }
            })
            .then((exists) => {
              if (exists) {
                res.status(409).send({
                  success: false,
                  message: 'Event name already exists'
                });
              } else {
                Event
                  .findOne({
                    where: { id: req.params.eventId },
                    include: [
                      { model: Center }
                    ]
                  })
                  .then((event) => {
                    if (!event) {
                      res.status(404).send({
                        success: false,
                        message: 'Event not found'
                      });
                    } else if (event) {
                      const centerId = event.Center.id;
                      Center
                        .findOne({
                          where: { id: centerId },
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
                            const dates = center.events.map(anEvent => anEvent.date);
                            if (dates.map(Number).indexOf(+(new Date(req.body.date))) !== -1) {
                              res.status(409).send({
                                success: false,
                                message: 'Oops. Date has already been taken'
                              });
                            } else {
                              Event
                                .update({
                                  name: req.body.name,
                                  date: new Date(req.body.date)
                                }, {
                                  where: { id: parseInt(req.params.eventId, 10) }
                                })
                                .then(() => {
                                  res.status(200).send({
                                    success: true,
                                    message: 'Event updated successfully'
                                  });
                                })
                                .catch(() => {
                                  res.status(400).send({
                                    success: false,
                                    message: 'An error occured updating event'
                                  });
                                });
                            }
                          }
                        })
                        .catch(() => {
                          res.status(400).send({
                            success: false,
                            message: 'An error occured finding the center'
                          });
                        });
                    }
                  })
                  .catch(() => {
                    res.status(400).send({
                      success: false,
                      message: 'An error occured finding the event'
                    });
                  });
              }
            })
            .catch(() => {
              res.status(400).send({
                success: false,
                message: 'An error occured finding if the event exists'
              });
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
