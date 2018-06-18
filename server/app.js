import express from 'express';
import 'babel-polyfill';
import dotenv from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import AWS from 'aws-sdk';
import swaggerJson from './docs/swagger.json'

// Set up the express app
const app = express();
const auth = express.Router();
const swaggerPath = path.join(__dirname, './controllers/v1/*.js');
const swaggerPathV2 = path.join(__dirname, './controllers/v2/*.js');
// const swaggerJson = path.resolve('./docs/swagger.json');

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Event Manager Documentation',
    version: '1.0.0',
    description: 'Event Manager App',
  },
  host: process.env.BASE_URL,
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  // apis: [swaggerPath, swaggerPathV2],
  apis: [swaggerJson]
};

// initialize swagger-jsdoc
// const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerJson);
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

// AWS Config
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-east-2',
});


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client/public')));

app.set('views', path.join(__dirname, '..', 'client', 'public'));


require('./routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/v2/*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'client/public/index.html'));
});

module.exports = app;
