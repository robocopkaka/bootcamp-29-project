import deepEqual from 'deep-equal';
import { Event, Center, User } from '../../models/index';
// import { User } from '../../models/index';
// import { Center } from '../../models/index';

module.exports = {
  create(req, res) {
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
          Center
            .findOne({
              where: { name: req.body.name }
            })
            .then((center) => {
              if (center) {
                res.status(409).send({
                  success: false,
                  message: 'Center already exists'
                });
              } else if (!center) {
                Center
                  .create({
                    name: req.body.name,
                    detail: req.body.detail,
                    capacity: req.body.capacity,
                    address: req.body.address,
                    state: req.body.state,
                    userId: req.decoded.id,
                    image: req.body.image,
                    chairs: req.body.chairs,
                    projector: req.body.projector
                  })
                  .then((response) => {
                    res.status(201).send({
                      success: true,
                      message: 'Center created successfully',
                      center: {
                        id: response.id,
                        name: response.name,
                        address: response.address,
                        state: response.state,
                        capacity: response.capacity,
                        detail: response.detail,
                        chairs: response.chairs,
                        projector: response.projector,
                        image: response.image
                      }
                    });
                  })
                  .catch(() => res.status(500).send({
                    success: false,
                    message: 'Center not created'
                  }));
              }
            })
            .catch(() => {
              res.status(500).send({
                success: false,
                message: 'An error occured'
              });
            });
        }
      });
  },
  getSingleCenter(req, res) {
    Center
      .findOne({
        where: { id: parseInt(req.params.centerId, 10) },
      })
      .then((center) => {
        if (!center) {
          res.status(404).send({
            success: false,
            message: 'Center not found'
          });
        } else if (center) {
          res.status(200).send({
            success: true,
            center
          });
        }
      })
      // .catch(() => res.status(400).send({
      //   success: false,
      //   message: 'An error occured'
      // }));
  },
  // getAllCenters(req, res) {
  //   Center
  //     .findAll({})
  //     .then((centers) => {
  //       if (!centers) {
  //         res.status(404).send({
  //           success: false,
  //           message: 'There are no centers yet'
  //         });
  //       } else if (centers) {
  //         res.status(200).send({
  //           success: true,
  //           centers
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       res.status(400).send({
  //         success: false,
  //         message: 'An error occured'
  //       });
  //     });
  // },
  getAllCenters(req, res) {
    const { limit = 9 } = req.query;
    let offset = 0;
    Center.findAndCountAll()
      .then((data) => {
        if (!data) {
          res.status(404).send({
            success: false,
            message: 'There are no centers yet'
          });
        } else if (data) {
          const { page = 1 } = req.query;
          const pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);
          Center.findAll({
            limit,
            offset,
            order: [
              ['id', 'ASC']
            ]
          })
            .then((centers) => {
              const next = parseInt(page, 10) + 1;
              let prev = 1;
              if (page > 1) {
                prev = page - 1;
              }
              res.status(200).send({
                success: true,
                data: {
                  centers,
                },
                meta: {
                  pagination: {
                    limit,
                    offset,
                    page,
                    pages,
                    total: data.count,
                    next: `http://localhost:8000/api/v2/centers?page=${next}`,
                    previous: `http://localhost:8000/api/v2/centers?page=${prev}`
                  }
                }
              });
            });
        }
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
          Center
            .findOne({
              where: { id: parseInt(req.params.centerId, 10) }
            })
            .then((center) => {
              if (!center) {
                res.status(404).send({
                  success: false,
                  message: 'Center not found'
                });
              } else if (center) {
                // console.log(center.dataValues);
                let fetchedCenter = center.dataValues;
                delete fetchedCenter.createdAt;
                delete fetchedCenter.updatedAt;
                delete fetchedCenter.id;
                delete fetchedCenter.userId;
                if (deepEqual(fetchedCenter, req.body) || req.body.name === fetchedCenter.name) {
                  Center
                    .update({
                      name: req.body.name,
                      detail: req.body.detail,
                      address: req.body.address,
                      state: req.body.state,
                      chairs: req.body.chairs,
                      projector: req.body.projector,
                      image: req.body.image,
                      userId: req.decoded.id,
                      capacity: req.body.capacity
                    }, {
                      returning: true,
                      where: { id: parseInt(req.params.centerId, 10) }
                    })
                    .then(([rowsUpdate, [updatedCenter]]) => {
                      res.status(200).send({
                        success: true,
                        message: 'Center updated successfully',
                        center: updatedCenter
                      });
                    })
                    .catch(() => {
                      res.status(500).send({
                        success: false,
                        message: 'An error occured in the centers update'
                      });
                    });
                } else {
                  Center
                    .findOne({
                      where: { name: req.body.name }
                    })
                    .then((exists) => {
                      if (exists) {
                        res.status(409).send({
                          success: false,
                          message: 'Center name exists'
                        });
                      } else if (!exists) {
                        Center
                          .update({
                            name: req.body.name,
                            detail: req.body.detail,
                            address: req.body.address,
                            state: req.body.state,
                            chairs: req.body.chairs,
                            projector: req.body.projector,
                            image: req.body.image,
                            userId: req.decoded.id,
                            capacity: req.body.capacity
                          }, {
                            returning: true,
                            where: { id: parseInt(req.params.centerId, 10) }
                          })
                          .then(([rowsUpdate, [updatedCenter]]) => {
                            res.status(200).send({
                              success: true,
                              message: 'Center updated successfully',
                              center: updatedCenter
                            });
                          })
                          .catch(() => {
                            res.status(500).send({
                              success: false,
                              message: 'An error occured in the centers update'
                            });
                          });
                      }
                    })
                    .catch(() => {
                      res.status(500).send({
                        success: false,
                        message: 'An error occured finding if a center exists'
                      });
                    });
                }
              }
            })
            .catch(() => {
              res.status(500).send({
                success: false,
                message: 'An error occured in finding the center'
              });
            });
        }
      })
      .catch(() => {
        res.status(500).send({
          success: false,
          message: 'An error occured in finding users'
        });
      });
  }
};
