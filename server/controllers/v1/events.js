import events from '../../models/events';

module.exports = {
  /**
 * @swagger
 * definitions:
 *   Event:
 *     properties:
 *       name:
 *         type: string
 *       date:
 *         type: string
 *       time:
 *         type: string
 *       centerId:
 *         type: number
 *       userId:
 *         type: number
 *       category:
 *         type: string
 *       image:
 *         type: string
 */
  /**
  * @swagger
  * definitions:
  *   InvalidEvent:
  *     properties:
  *       name:
  *         type: undefined
  *       date:
  *         type: undefined
  *       time:
  *         type: undefined
  *       centerId:
  *         type: undefined
  *       userId:
  *         type: undefined
  *       category:
  *         type: undefined
  *       image:
  *         type: undefined
  */
  /**
  * @swagger
  * /api/v1/events:
  *   post:
  *     tags:
  *       - Events
  *     description: Create a new event
  *     produces:
  *       - application/json
  *     responses:
  *       201:
  *         description: A successful message
  *         schema:
  *           $ref: '#/definitions/Event'
  *       400:
  *         description: Bad requests
  *         schema:
  *           $ref: '#definitions/InvalidEvent'
  *       409:
  *         description: Resource conflict
  *         schema:
  *           $ref: '#definitions/Event'
  */
  /**/
  create(req, res) {
    const event = events.find(anEvent => anEvent.name === req.body.name);
    if (event === undefined) {
      const last = events.slice(-1);
      req.body.id = last + 1;
      events.push(req.body);
      res.status(201).send({
        message: 'Created successfully'
      });
    } else {
      res.status(409).send('Resource conflict');
    }
  },
  /**
  * @swagger
  * /api/v1/events/:id:
  *   put:
  *     tags:
  *       - Events
  *     description: Edit an event
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: A successful message
  *         schema:
  *           $ref: '#/definitions/Event'
  *       400:
  *         description: Bad request
  *         schema:
  *           $ref: '#definitions/InvalidCenter'
  *       409:
  *         description: Resource conflict
  *         schema:
  *           $ref: '#definitions/Event'
  *       404:
  *         description: Resource not found
  */
  /**/
  edit(req, res) {
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    if (event === undefined) {
      res.status(404).send('Resource not found');
    } else {
      event.name = req.body.name;
      res.status(200).send({
        message: 'Resource updated successfully',
        data: event
      });
    }
  },
  /**
  * @swagger
  * /api/v1/events/:id:
  *   delete:
  *     tags:
  *       - Events
  *     description: Delete an event
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
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    if (event !== undefined) {
      const eventId = parseInt(req.params.centerId, 10);
      const eventIndex = events.findIndex(anEvent => anEvent.id === eventId);
      events.splice(eventIndex, 1);
      res.status(200).send({
        message: 'Resource deleted successfully'
      });
    } else {
      res.status(404).send({
        message: 'Resource not found'
      });
    }
  },
  /**
  * @swagger
  * /api/v1/events/:
  *   get:
  *     tags:
  *       - Events
  *     description: Get all events
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An array of events
  *       404:
  *         description: Resource not found
  */
  /**/
  get(req, res) {
    res.status(200).send(events);
  },
  /**
  * @swagger
  * /api/v1/events/:id:
  *   get:
  *     tags:
  *       - Events
  *     description: Get a single event
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An object with a event in it
  *       404:
  *         description: Resource not found
  */
  /**/
  getSingleEvent(req, res) {
    const event = events.find(aEvent => aEvent.id === parseInt(req.params.eventId, 10));
    if (event === undefined) {
      res.status(404).send({
        message: 'Resource not found'
      });
    } else {
      res.status(200).send(event);
    }
  }
};
