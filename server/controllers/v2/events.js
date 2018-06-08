import deepEqual from 'deep-equal';
import moment from 'moment';
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
      .then(() => {
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
              const todayDate = new Date();
              const month = todayDate.getMonth() + 1;
              const day = todayDate.getDay();
              const year = todayDate.getFullYear();
              const date = new Date(year, month, day);
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
                    } else if (moment(req.body.date, moment.ISO_8601, true).isValid() === false) {
                      res.status(403).send({
                        success: false,
                        message: 'You entered an invalid date'
                      });
                    } else if (Date.parse(todayDate) > Date.parse(new Date(req.body.date))) {
                      console.log([todayDate, new Date(req.body.date)]);
                      res.status(403).send({
                        success: false,
                        message: 'You likely entered a date that has already passed. Please enter another'
                      });
                    } else if (req.body.guests > center.capacity) {
                      res.status(403).send({
                        success: false,
                        message: 'The center you selected cannot accomodate the number of guests you entered. Please select another'
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
                          res.status(500).send({
                            success: false,
                            message: 'An error occured creating the event'
                          });
                        });
                    }
                  })
                  .catch(() => {
                    res.status(500).send({
                      success: false,
                      message: 'An error occured when checking if event exists'
                    });
                  });
              }
            }
          });
      })
      .catch(() => {
        res.status(500).send({
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
        if (!user) {
          res.status(404).send({
            success: false,
            message: 'User not found'
          });
        } else if (user) {
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
                if ((user.dataValues.id !== event.dataValues.userId) && !user.dataValues.isAdmin) {
                  res.status(403).send({
                    success: false,
                    message: 'You are not allowed to edit this event'
                  });
                } else if (moment(req.body.date, moment.ISO_8601, true).isValid() === false) {
                  res.status(403).send({
                    success: false,
                    message: 'You entered an invalid date'
                  });
                } else
                if (user.dataValues.id === event.dataValues.userId || user.dataValues.isAdmin) {
                  const fetchedEvent = event.dataValues;
                  delete fetchedEvent.createdAt;
                  delete fetchedEvent.updatedAt;
                  delete fetchedEvent.Center;
                  delete fetchedEvent.id;
                  // figure out how to handle status later
                  delete fetchedEvent.status;
                  delete fetchedEvent.userId;
                  // console.log(fetchedEvent);

                  if (deepEqual(fetchedEvent, req.body) || fetchedEvent.name === req.body.name) {
                    Event
                      .update({
                        name: req.body.name,
                        guests: req.body.guests,
                        centerId: req.body.centerId,
                        detail: req.body.detail,
                        date: req.body.date,
                        categoryId: req.body.categoryId
                      }, {
                        returning: true,
                        where: { id: parseInt(req.params.eventId, 10) }
                      })
                      .then(([rowsUpdate, [updatedEvent]]) => {
                        res.status(200).send({
                          success: true,
                          message: 'Event updated successfully',
                          event: updatedEvent
                        });
                      })
                      .catch(() => {
                        res.status(500).send({
                          success: false,
                          message: 'An error occured updating events'
                        });
                      });
                  } else {
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
                            .then((foundEvent) => {
                              if (!foundEvent) {
                                res.status(404).send({
                                  success: false,
                                  message: 'Event not found'
                                });
                              } else if (foundEvent) {
                                const centerId = foundEvent.Center.id;
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
                                      const todayDate = new Date();
                                      const month = todayDate.getMonth() + 1;
                                      const day = todayDate.getDay();
                                      const year = todayDate.getFullYear();
                                      const date = new Date(year, month, day);
                                      if (
                                        dates.map(Number).indexOf(+(new Date(req.body.date))) !== -1
                                      ) {
                                        res.status(409).send({
                                          success: false,
                                          message: 'Oops. Date has already been taken'
                                        });
                                      } else if (moment(req.body.date, moment.ISO_8601, true).isValid() === false) { // eslint-disable-line max-len
                                        res.status(403).send({
                                          success: false,
                                          message: 'You entered an invalid date'
                                        });
                                      } else if (
                                        Date.parse(todayDate) > Date.parse(new Date(req.body.date))) {
                                        res.status(403).send({
                                          success: false,
                                          message: 'You likely entered a date that has already passed. Please enter another'
                                        });
                                      } else if (req.body.guests > center.capacity) {
                                        res.status(403).send({
                                          success: false,
                                          message: 'The center you selected cannot accomodate the number of guests you entered. Please select another'
                                        });
                                      } else {
                                        Event
                                          .update({
                                            name: req.body.name,
                                            detail: req.body.detail,
                                            guests: req.body.guests,
                                            centerId: req.body.centerId,
                                            date: req.body.date,
                                            categoryId: req.body.categoryId
                                          }, {
                                            returning: true,
                                            where: { id: parseInt(req.params.eventId, 10) }
                                          })
                                          .then(([rowsUpdate, [updatedEvent]]) => {
                                            res.status(200).send({
                                              success: true,
                                              message: 'Event updated successfully',
                                              event: updatedEvent
                                            });
                                          })
                                          .catch(() => {
                                            res.status(500).send({
                                              success: false,
                                              message: 'An error occured updating event'
                                            });
                                          });
                                      }
                                    }
                                  })
                                  .catch(() => {
                                    res.status(500).send({
                                      success: false,
                                      message: 'An error occured finding the center'
                                    });
                                  });
                              }
                            })
                            .catch(() => {
                              res.status(500).send({
                                success: false,
                                message: 'An error occured finding the event'
                              });
                            });
                        }
                      })
                      .catch(() => {
                        res.status(500).send({
                          success: false,
                          message: 'An error occured finding if the event exists'
                        });
                      });
                  }
                }
              }
            })
            .catch(() => {
              res.status(500).send({
                success: false,
                message: 'An error occured finding the event'
              });
            });
        }
      })
      .catch(() => {
        res.status(500).send({
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
        // if (!user.isAdmin) {
        //   res.status(403).send({
        //     success: false,
        //     message: 'User is not an admin'
        //   });
        // } else {
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
            } else if (!user.isAdmin && event.dataValues.userId !== user.dataValues.id) {
              console.log(user.dataValues.id, event.dataValues.userId)
              res.status(403).send({
                success: false,
                message: 'User is either not an admin or did not create this event'
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
                });
              // .catch(() => {
              //   res.status(500).send({
              //     success: false,
              //     message: 'Internal server error'
              //   });
              // });
            }
          });
        // .catch(() => {
        //   res.status(400).send({
        //     success: false,
        //     message: 'An error occured finding the event'
        //   });
        // });
        // }
      })
      .catch(() => {
        res.status(500).send({
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
    const { limit = 9 } = req.query;
    let offset = 0;
    Event.findAndCountAll()
      .then((data) => {
        if (!data) {
          res.status(404).send({
            success: false,
            message: 'No events found'
          });
        } else if (data) {
          const { page = 1 } = req.query;
          const pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);
          Event
            .findAll({
              limit,
              offset,
              order: [
                ['id', 'ASC']
              ]
            })
            .then((events) => {
              const next = parseInt(page, 10) + 1;
              let prev = 1;
              if (page > 1) {
                prev = page - 1;
              }
              res.status(200).send({
                success: true,
                data: {
                  events
                },
                meta: {
                  pagination: {
                    limit,
                    offset,
                    page,
                    pages,
                    total: data.count,
                    next: `http://localhost:8000/api/v2/events?page=${next}`,
                    previous: `http://localhost:8000/api/v2/events?page=${prev}`
                  }
                }
              });
            });
        }
      });
    // .catch(() => {
    //   res.status(500).send({
    //     success: false,
    //     message: 'An error occured fetching the events'
    //   });
    // });
  },
  getEventsInCenter(req, res) {
    const { centerId } = req.params;
    const { limit = 9 } = req.query;
    const { page = 1 } = req.query;
    let offset = 0;
    Event.findAndCountAll({
      where: { centerId }
    })
      .then((data) => {
        const pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Event.findAll({
          where: { centerId },
          limit,
          offset,
          order: [
            ['id', 'ASC']
          ]
        })
          .then((events) => {
            const next = parseInt(page, 10) + 1;
            let prev = 1;
            if (page > 1) {
              prev = page - 1;
            }
            res.status(200).send({
              success: true,
              data: {
                events
              },
              meta: {
                pagination: {
                  limit,
                  offset,
                  page,
                  pages,
                  total: data.count,
                  prev: `http://localhost:8000/api/v2/centers/${parseInt(centerId, 10)}/events?page=${prev}`,
                  next: `http://localhost:8000/api/v2/centers/${parseInt(centerId, 10)}/events?page=${next}`
                }
              }
            });
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

  getEventsForUser(req, res) {
    const { userId } = req.params;
    let { limit = 9 } = req.query;
    const { page = 1 } = req.query;
    let offset = 0;
    Event.findAndCountAll({
      where: { userId }
    })
      .then((data) => {
        const pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Event.findAll({
          where: { userId },
          limit,
          offset,
          order: [
            ['id', 'ASC']
          ]
        })
          .then((events) => {
            const next = parseInt(page, 10) + 1;
            let prev = 1;
            if (page > 1) {
              prev = page - 1;
            }
            limit = parseInt(limit, 10);
            res.status(200).send({
              success: true,
              data: {
                events
              },
              meta: {
                pagination: {
                  limit,
                  offset,
                  page,
                  pages,
                  total: data.count,
                  prev: `http://localhost:8000/api/v2/users/${parseInt(userId, 10)}/events?page=${prev}`,
                  next: `http://localhost:8000/api/v2/users/${parseInt(userId, 10)}/events?page=${next}`
                }
              }
            });
          });
      });
  }
};
