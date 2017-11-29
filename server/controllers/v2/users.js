import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/index';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  create(req, res) {
    db.User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
      })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch(err => res.status(400).send(err));
  },
  login(req, res) {
    db.user.findOne({
      email: req.body.email
    })
      .then((user) => {
        if (!user) {
          res.status(404).send('User not found');
        } else if (user) {
          console.log(user);
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).send('Authentication failed');
          } else {
            const payload = { email: user.email, name: user.fullName, id: user.id };
            res.json({ token: jwt.sign(payload, process.env.secret) });
          }
        }
      })
      .catch(() => {
        res.status(404).send('Resource not found');
      });
  }
};
