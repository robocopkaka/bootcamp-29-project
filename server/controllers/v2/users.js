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
        .create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isAdmin: req.body.isAdmin
        })
        .then((user) => {
          res.status(200).send(user);
        })
        .catch(err => res.status(400).send(err));
    });
  },
  login(req, res) {
    db.User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            success: false,
            message: 'User not found'
          });
        } else if (user) {
          bcrypt.compare(req.body.password, user.password, (err, hash) => {
            if (!hash) {
              res.status(400).send({
                success: false,
                message: 'Password mismatch'
              });
            } else if (hash) {
              const payload = {
                email: user.email,
                name: user.fullName,
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
        res.status(400).send({
          success: false,
          error
        });
      });
  }
};
