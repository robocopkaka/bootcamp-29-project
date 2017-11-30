// This will be our application entry. We'll setup our server here.
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from '/server/app'
// const app = require('../app'); // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
