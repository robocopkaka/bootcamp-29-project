import { Event, Center, User } from '../../models/index';

module.exports = {
  /**
 * @swagger
 * definitions:
 *   EventV2:
 *     properties:
 *       name:
 *         type: string
 *       date:
 *         type: date
 *       centerId:
 *         type: number
 *       categoryId:
 *         type: number
 */
  /**
* @swagger
* definitions:
*   InvalidEventV2:
*     properties:
*       name:
*         type: undefined
*       date:
*         type: undefined
*       centerId:
*         type: undefined
*       categoryId:
*         type: undefined
*/
  /**
 * @swagger
 * /api/v2/events:
 *   post:
 *     tags:
 *       - V2 Events
 *     description: Create a new event
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: A successful message
 *         schema:
 *           $ref: '#/definitions/EventV2'
 *       400:
 *         description: Bad requests
 *         schema:
 *           $ref: '#definitions/InvalidEventV2'
 *       403:
 *         description: User is not an admin
 *         schema:
 *           $ref: '#definitions/EventV2'
 */
  /**/
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
                            detail: req.body.detail,
                            date: req.body.date,
                            guests: req.body.guests,
                            userId: req.decoded.id,
                            centerId: center.id,
                            categoryId: req.body.categoryId
                          })
                          .then((response) => {
                            res.status(201).send({
                              success: true,
                              message: 'Event created successfully',
                              event: {
                                id: response.id,
                                name: response.name,
                                detail: response.detail,
                                guests: response.guests,
                                date: response.date,
                                centerId: response.centerId,
                                categoryId: response.categoryId
                              }
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
  /**
 * @swagger
 * /api/v2/events/:eventId:
 *   put:
 *     tags:
 *       - V2 Events
 *     description: Edit an event
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A successful message
 *         schema:
 *           $ref: '#/definitions/EventV2'
 *       400:
 *         description: Bad requests
 *         schema:
 *           $ref: '#definitions/InvalidEventV2'
 *       403:
 *         description: User is not an admin
 *         schema:
 *           $ref: '#definitions/EventV2'
 */
  /**/
  edit(req, res) {
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
                                  date: new Date(req.body.date),
                                  categoryId: 1
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
  },
  /**
 * @swagger
 * /api/v2/events/:eventId:
 *   delete:
 *     tags:
 *       - V2 Events
 *     description: Delete an event
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A successful message
 *       404:
 *         description: Not found
 *       403:
 *         description: User is not an admin
 */
  /**/
  delete(req, res) {
    User
      .findOne({
        where: { id: req.decoded.id }
      })
      .then((user) => {
        if (!user) {
          res.send(401).send({
            success: false,
            message: 'User is not an admin'
          });
        } else {
          Event
            .findOne({
              where: { id: req.params.eventId }
            })
            .then((event) => {
              if (!event) {
                res.status(404).send({
                  success: false,
                  message: 'Event not found'
                });
              } else {
                Event
                  .destroy({
                    where: { id: req.params.eventId }
                  })
                  .then(() => {
                    res.status(200).send({
                      success: true,
                      message: 'Event deleted successfully'
                    });
                  })
                  .catch(() => {
                    res.status(404).send({
                      success: false,
                      message: 'Event deleted successfully'
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
          message: 'An error occured finding the user'
        });
      });
  },
  /**
  * @swagger
  * /api/v2/events/:
  *   get:
  *     tags:
  *       - V2 Events
  *     description: Get all events
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An array with all the events in it
  *       404:
  *         description: Resource not found
  *       400:
  *         description: An error occured
  */
  /**/
  getAllEvents(req, res) {
    Event
      .findAll({})
      .then((events) => {
        if (!events) {
          res.status(404).send({
            success: false,
            message: 'There are no events yet'
          });
        } else if (events) {
          res.status(200).send({
            success: true,
            events
          });
        }
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'An error occured fetching the events'
        });
      });
  },
  /**
  * @swagger
  * /api/v2/events/:
  *   get:
  *     tags:
  *       - V2 Events
  *     description: Get a single event
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An object containing the event
  *       404:
  *         description: Resource not found
  */
  /**/
  getSingleEvent(req, res) {
    Event
      .findOne({
        where: { id: parseInt(req.params.eventId, 10) },
        include: [
          Center
        ]
      })
      .then((event) => {
        if (!event) {
          res.status(404).send({
            success: false,
            message: 'Event not found'
          });
        } else if (event) {
          res.status(200).send({
            success: true,
            event
          });
        }
      });
    // .catch(() => res.status(400).send({
    //   success: false,
    //   message: 'An error occured'
    // }));
  },
};
