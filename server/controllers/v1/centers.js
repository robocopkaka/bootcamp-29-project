import centers from '../../schemas/centers';

module.exports = {
  /**
 * @swagger
 * definitions:
 *   Center:
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
 *       facilities:
 *         type: array
 */
  /**
  * @swagger
  * definitions:
  *   InvalidCenter:
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
  *       facilities:
  *         type: undefined
  */
  /**
 * @swagger
 * /api/v1/centers:
 *   post:
 *     tags:
 *       - Centers
 *     description: Create a new center
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: A successful message
 *         schema:
 *           $ref: '#/definitions/Center'
 *       400:
 *         description: Bad requests
 *         schema:
 *           $ref: '#definitions/InvalidCenter'
 *       409:
 *         description: Resource conflict
 *         schema:
 *           $ref: '#definitions/Center'
 */
  /**/
  create(req, res) {
    const center = centers.find(aCenter => aCenter.name === req.body.name);
    if (center === undefined) {
      // add an ID to the request body before pushing it to the database
      const last = centers.slice(-1);
      req.body.id = last[0].id + 1;
      centers.push(req.body);
      res.status(201).send('Center created');
    } else {
      res.status(409).send('Resource conflict');
    }
  },
  /**
  * @swagger
  * /api/v1/centers/:id:
  *   put:
  *     tags:
  *       - Centers
  *     description: Edit a center
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: A successful message
  *         schema:
  *           $ref: '#/definitions/Center'
  *       400:
  *         description: Bad request
  *         schema:
  *           $ref: '#definitions/InvalidCenter'
  *       409:
  *         description: Resource conflict
  *         schema:
  *           $ref: '#definitions/Center'
  *       404:
  *         description: Resource not found
  */
  /**/
  edit(req, res) {
    const centerIndex = centers.findIndex(aCenter => aCenter.id === req.params.centerId);
    const center = centers.find(aCenter => aCenter.id === req.params.centerId);
    const exist = centers.find(aCenter => aCenter.name === req.body.name);
    if (center === undefined) {
      res.status(404).send('Resource not found');
    } else if (exist !== undefined && center !== undefined) {
      res.status(409).send('Resource conflict');
    } else if (exist === undefined && center !== undefined) {
      centers[centerIndex].name = req.body.name;
      res.status(200).send({
        message: 'Resource updated',
        data: centers[centerIndex]
      });
    }
  },
  /**
  * @swagger
  * /api/v1/centers/:id:
  *   delete:
  *     tags:
  *       - Centers
  *     description: Delete a center
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: A successful message
  *       404:
  *         description: Resource not found
  */
  /**/
  delete(req, res) {
    // centerId = parseInt(req.params.id, 10);
    const center = centers.find(aCenter => aCenter.id === parseInt(req.params.centerId, 10));
    if (center === undefined) {
      res.status(404).send('Resource not found');
    } else {
      const centerIndex = centers.findIndex(aCenter => aCenter.id ===
        parseInt(req.params.centerId, 10));
      centers.splice(centerIndex, 1);
      res.status(200).send({
        message: 'Resource deleted successfully'
      });
    }
  },
  /**
  * @swagger
  * /api/v1/centers/:
  *   get:
  *     tags:
  *       - Centers
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
  get(req, res) {
    res.status(200).send(centers);
  },
  /**
  * @swagger
  * /api/v1/centers/:id:
  *   get:
  *     tags:
  *       - Centers
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
  getSingleCenter(req, res) {
    const center = centers.find(aCenter => aCenter.id === parseInt(req.params.centerId, 10));
    if (center === undefined) {
      res.status(404).send('Resource not found');
    } else {
      res.status(200).send({
        message: 'Found',
        data: center
      });
    }
  }
};
