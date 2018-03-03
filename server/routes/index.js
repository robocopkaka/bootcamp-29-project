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

const eventsController = require('../controllers/v1').events;
const centersController = require('../controllers/v1').centers;
const usersController = require('../controllers/v2').users;
const centersDBController = require('../controllers/v2').centers;
const eventsDBController = require('../controllers/v2').events;

const apiRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../client/img');
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

module.exports = (app) => {
  app.use(cors());
  app.options('*', cors());
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager App'
  }));

  app.post('/api/v1/events', upload.single('image'), expressJoi(eventSchema), eventsController.create);
  app.delete('/api/v1/events/:eventId', expressJoi(eventWithParamsSchema), eventsController.delete);
  app.get('/api/v1/events', eventsController.get);
  app.get('/api/v1/events/:eventId', expressJoi(eventWithParamsSchema), eventsController.getSingleEvent);
  app.put('/api/v1/events/:eventId', upload.single('image'), expressJoi(eventWithIdSchema), eventsController.edit);

  app.get('/api/v1/centers', centersController.get);
  app.get('/api/v1/centers/:centerId', expressJoi(centerWithParamsSchema), centersController.getSingleCenter);
  app.post('/api/v1/centers', upload.single('image'), expressJoi(centerSchema), centersController.create);
  app.put('/api/v1/centers/:centerId', upload.single('image'), expressJoi(centerWithIdSchema), centersController.edit);
  app.delete('/api/v1/centers/:centerId', expressJoi(centerWithParamsSchema), centersController.delete);

  // v2 routes
  app.post('/api/v2/users', expressJoi(userSchema), usersController.create);
  app.post('/api/v2/users/login', expressJoi(userLoginSchema), usersController.login);

  app.post('/api/v2/centers', expressJoi(centerDBSchema), apiRoutes, centersDBController.create);
  app.put('/api/v2/centers/:centerId', expressJoi(centerDBSchema), apiRoutes, centersDBController.edit);
  app.get('/api/v2/centers/:centerId', expressJoi(centerWithParamsSchema), centersDBController.getSingleCenter);
  app.get('/api/v2/centers', centersDBController.getAllCenters);
  app.post('/api/v2/events', expressJoi(eventDBSchema), apiRoutes, eventsDBController.create);
  app.put('/api/v2/events/:eventId', expressJoi(eventDBWithParams), apiRoutes, eventsDBController.edit);
  app.get('/api/v2/events', eventsDBController.getAllEvents);
  app.get('/api/v2/events/:eventId', expressJoi(eventDBWithIdSchema), eventsDBController.getSingleEvent);
  app.delete('/api/v2/events/:eventId', expressJoi(eventDBWithIdSchema), apiRoutes, eventsDBController.delete);
  // error handler
  app.use((err, req, res, next) => {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload);
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
