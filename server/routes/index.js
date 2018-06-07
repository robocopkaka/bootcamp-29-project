import expressJoi from 'express-joi-validator';
import jwt from 'jsonwebtoken';
import express from 'express';
import path from 'path';
import multer from 'multer';
import uuidv4 from 'uuid/v4';
import cors from 'cors';
import centerSchema from '../validators/centerValidator';
import centerWithIdSchema from '../validators/centerWithIdValidator';
import centerWithParamsSchema from '../validators/centerWithParamsValidator';
import eventSchema from '../validators/eventValidator';
import eventWithIdSchema from '../validators/eventWithIdValidator';
import eventWithParamsSchema from '../validators/eventWithParamsValidator';
import userSchema from '../validators/userSchema';
import userLoginSchema from '../validators/userLogin';
import centerDBSchema from '../validators/centerDBSchema';
import eventDBSchema from '../validators/eventDBSchema';
import eventDBWithParams from '../validators/eventDBWithParams';
import eventDBWithIdSchema from '../validators/eventsDBWithId';
import eventsInCenterSchema from '../validators/eventsInCenterValidators';
import centerDBWithIdSchema from '../validators/centerDBWithIdSchema';
import eventsForUserSchema from '../validators/eventsForUserValidator';
import pagination from '../validators/pagination';

import * as v2 from '../controllers/v2';
import * as v1 from '../controllers/v1';


const eventsController = v1.events;
const centersController = v1.centers;

const usersController = v2.users;
const eventsDBController = v2.events;
const centersDBController = v2.centers;
const utilitiesController = v2.utilities;

const apiRoutes = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../../client/img');
//   },
//   filename: (req, file, cb) => {
//     const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
//     cb(null, newFilename);
//   },
// });
//
// const upload = multer({ storage });

module.exports = (app) => {
  app.use(cors());
  app.options('*', cors());
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager App'
  }));

  app.post('/api/v1/events', expressJoi(eventSchema), eventsController.create);
  app.delete('/api/v1/events/:eventId', expressJoi(eventWithParamsSchema), eventsController.delete);
  app.get('/api/v1/events', eventsController.get);
  app.get('/api/v1/events/:eventId', expressJoi(eventWithParamsSchema), eventsController.getSingleEvent);
  app.put('/api/v1/events/:eventId', expressJoi(eventWithIdSchema), eventsController.edit);

  app.get('/api/v1/centers', centersController.get);
  app.get('/api/v1/centers/:centerId', expressJoi(centerWithParamsSchema), centersController.getSingleCenter);
  app.post('/api/v1/centers', expressJoi(centerSchema), centersController.create);
  app.put('/api/v1/centers/:centerId', expressJoi(centerWithIdSchema), centersController.edit);
  app.delete('/api/v1/centers/:centerId', expressJoi(centerWithParamsSchema), centersController.delete);

  // v2 routes
  app.post('/api/v2/users', expressJoi(userSchema), usersController.create);
  app.post('/api/v2/users/login', expressJoi(userLoginSchema), usersController.login);
  app.get('/api/v2/users/:userId/events', expressJoi(eventsForUserSchema), eventsDBController.getEventsForUser);

  app.post('/api/v2/centers', expressJoi(centerDBSchema), apiRoutes, centersDBController.create);
  app.put('/api/v2/centers/:centerId', expressJoi(centerDBWithIdSchema), apiRoutes, centersDBController.edit);
  app.get('/api/v2/centers/:centerId', expressJoi(centerWithParamsSchema), centersDBController.getSingleCenter);
  app.get('/api/v2/centers', expressJoi(pagination), centersDBController.getAllCenters);
  app.post('/api/v2/events', expressJoi(eventDBSchema), apiRoutes, eventsDBController.create);
  app.put('/api/v2/events/:eventId', expressJoi(eventDBWithParams), apiRoutes, eventsDBController.edit);
  app.get('/api/v2/events', expressJoi(pagination), eventsDBController.getAllEvents);
  app.get('/api/v2/centers/:centerId/events', expressJoi(eventsInCenterSchema), eventsDBController.getEventsInCenter);
  app.get('/api/v2/events/:eventId', expressJoi(eventDBWithIdSchema), eventsDBController.getSingleEvent);
  app.delete('/api/v2/events/:eventId', expressJoi(eventDBWithIdSchema), apiRoutes, eventsDBController.delete);
  app.get('/sign-s3', utilitiesController.signS3);


  /**
  * @param {String} key
  * @param {String} value
  * @return {String} string without quotes
  */
  function replacer(key, value) {
    return value.replace(/[^\w\s]/gi, '');
  }
  // error handler
  app.use((err, req, res, next) => {
    if (err.isBoom) {
      const message1 = err.output.payload.message;
      const message = JSON.stringify(message1, replacer);
      return res.status(err.output.statusCode).send({
        statusCode: err.output.payload.statusCode,
        error: err.output.payload.error,
        message
      });
    }
  });


  // Authentication
  apiRoutes.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
  });
};
