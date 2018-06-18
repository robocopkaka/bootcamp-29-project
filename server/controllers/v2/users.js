import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/index';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  create(req, res) {
    // Generate hash with bcrypt's async
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      db.User
        .findOne({
          where: { email: req.body.email }
        })
        .then((user) => {
          if (user) {
            res.status(409).send({
              success: false,
              message: 'Email address has likely been taken. Try again with a new email address'
            });
          } else {
            db.User
              .create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              })
              .then((response) => {
                delete response.dataValues.password;
                const aUser = {
                  id: response.dataValues.id,
                  name: response.dataValues.name,
                  email: response.dataValues.email,
                  isAdmin: response.dataValues.isAdmin,
                  createdAt: response.dataValues.createdAt,
                  updatedAt: response.dataValues.updatedAt

                };
                const payload = {
                  email: response.dataValues.email,
                  name: response.dataValues.name,
                  id: response.dataValues.id,
                  isAdmin: response.dataValues.isAdmin
                };
                const token = jwt.sign(payload, process.env.secret, { expiresIn: '1440m' });
                res.status(201).send({
                  success: true,
                  message: `Account created for ${aUser.name}`,
                  user: aUser,
                  token
                });
              })
              .catch(() => {
                res.status(500).send({
                  success: false,
                  message: 'Internal server error'
                });
              });
          }
        })
        .catch(() => {
          res.status(500).send({
            success: false,
            message: 'Internal server error'
          });
        });
    });
  },
  login(req, res) {
    db.User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (!user) {
          res.status(401).send({
            success: false,
            message: 'Invalid email/password'
          });
        } else if (user) {
          bcrypt.compare(req.body.password, user.password, (err, hash) => {
            if (!hash) {
              res.status(401).send({
                success: false,
                message: 'Invalid email/password'
              });
            } else if (hash) {
              const payload = {
                email: user.email,
                name: user.name,
                id: user.id,
                isAdmin: user.isAdmin
              };
              const token = jwt.sign(payload, process.env.secret, { expiresIn: '1440m' });
              res.status(200).send({
                success: true,
                message: 'Signed in successfully',
                token,
              });
            }
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          error
        });
      });
  }
};
