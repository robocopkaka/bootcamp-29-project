import db from '../../models/index';

module.exports = {
  /**
 * @swagger
 * definitions:
 *   CenterV2:
 *     properties:
 *       name:
 *         type: string
 *       detail:
 *         type: string
 *       image:
 *         type: integer
 *       address:
 *         type: string
 *       state:
 *         type: string
 *       projector:
 *         type: number
 *       chairs:
 *         type: number
 *       capacity:
 *         type: number
 */
  /**
* @swagger
* definitions:
*   InvalidCenterV2:
*     properties:
*       name:
*         type: undefined
*       detail:
*         type: undefined
*       image:
*         type: undefined
*       address:
*         type: undefined
*       state:
*         type: undefined
*       projector:
*         type: undefined
*       chairs:
*         type: undefined
*       capacity:
*         type: undefined
*/
  /**
 * @swagger
 * /api/v2/centers:
 *   post:
 *     tags:
 *       - V2 Centers
 *     description: Create a new center
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: A successful message
 *         schema:
 *           $ref: '#/definitions/CenterV2'
 *       400:
 *         description: Bad requests
 *         schema:
 *           $ref: '#definitions/InvalidCenter'
 *       403:
 *         description: User is not an admin
 *         schema:
 *           $ref: '#definitions/ValidCenterV2'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#definitions/ValidCenterV2'
 */
  /**/
  create(req, res) {
    db.User
      .findOne({
        where: { id: req.decoded.id }
      })
      .then((user) => {
        if (!user.isAdmin) {
          res.status(403).send('User is not an admin');
        } else if (user.isAdmin) {
          db.Center
            .create({
              name: req.body.name,
              detail: req.body.detail,
              capacity: req.body.capacity,
              address: req.body.address,
              state: req.body.state,
              userId: user.id
            })
            .then((center) => {
              res.status(201).send({
                status: 201,
                success: true,
                message: 'center created successfully',
                center
              });
            })
            .catch(error => res.status(500).send(error));
        }
      });
  },
  /**
  * @swagger
  * /api/v2/centers/:
  *   get:
  *     tags:
  *       - V2 Centers
  *     description: Get all centers
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An array of centers
  *       404:
  *         description: Resource not found
  */
  /**/
  getSingleCenter(req, res) {
    db.Center
      .findOne({
        where: { id: parseInt(req.params.centerId, 10) }
      })
      .then((center) => {
        if (!center) {
          res.status(404).send('Center not found');
        } else if (center) {
          res.status(200).send(center);
        }
      })
      .catch(error => res.status(400).send(error));
  },
  /**
  * @swagger
  * /api/v2/centers/:id:
  *   get:
  *     tags:
  *       - V2 Centers
  *     description: Get a single center
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An object with a center in it
  *       404:
  *         description: Resource not found
  */
  /**/
  getAllCenters(req, res) {
    db.Center
      .findAll({})
      .then((users) => {
        if (!users) {
          res.status(404).send('There are no users yet');
        } else if (users) {
          res.status(200).send(users);
        }
      });
  }
};
