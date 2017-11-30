// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import db from '../../models/index';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  create(req, res) {
    db.User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        isAdmin: req.body.isAdmin
      })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch(err => res.status(400).send(err));
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
          // if (!bcrypt.compareSync(req.body.password, user.password)) {
          //   res.status(401).send({
          //     success: false,
          //     message: 'Authentication failed'
          //   });
          // } else {
          //   const payload = {
          //     email: user.email,
          //     name: user.fullName,
          //     id: user.id,
          //     isAdmin: user.isAdmin
          //   };
          //   const token = jwt.sign(payload, process.env.secret, { expiresIn: '1440m' });
          //   res.status(200).send({
          //     success: true,
          //     message: 'Signed in successfully',
          //     token,
          //   });
          // }
          res.status(200).send('token')
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
};
