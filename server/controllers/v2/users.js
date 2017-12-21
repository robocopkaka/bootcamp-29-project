import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/index';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  /**
 * @swagger
 * definitions:
 *   UserV2:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
  /**
* @swagger
* definitions:
*   LoginUserV2:
*     properties:
*       email:
*         type: string
*       password:
*         type: string
*/
/**
* @swagger
* definitions:
*   InvalidLoginUserV2:
*     properties:
*       email:
*         type: undefined
*       password:
*         type: undefined
*/
  /**
* @swagger
* definitions:
*   InvalidUserV2:
*     properties:
*       name:
*         type: undefined
*       email:
*         type: undefined
*       password:
*         type: undefined
*/
  /**
 * @swagger
 * /api/v2/users:
 *   post:
 *     tags:
 *       - V2 Users
 *     description: Create a new user
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: A successful message
 *         schema:
 *           $ref: '#/definitions/UserV2'
 *       400:
 *         description: Bad requests
 *         schema:
 *           $ref: '#definitions/InvalidUserV2'
 */
  /**/
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
          res.status(201).send(user);
        })
        .catch(() => {
          res.status(400).send({
            success: false,
            message: 'Email address has likely been taken. Try again with a new email address'
          });
        });
    });
  },
  /**
 * @swagger
 * /api/v2/users/login:
 *   post:
 *     tags:
 *       - V2 Users
 *     description: Login an existing user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A successful message with a token
 *         schema:
 *           $ref: '#/definitions/LoginUserV2'
 *       400:
 *         description: Bad requests
 *         schema:
 *           $ref: '#definitions/InvalidLoginUserV2'
 */
  /**/
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
