// This will be our application entry. We'll setup our server here.
import dotenv from 'dotenv';
dotenv.config();

const http = require('http');
const app = require('../server/app'); // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
