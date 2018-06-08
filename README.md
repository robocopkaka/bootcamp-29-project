# bootcamp-29-project
[![Build Status](https://travis-ci.org/robocopkaka/bootcamp-29-project.svg?branch=setup-travis)](https://travis-ci.org/robocopkaka/bootcamp-29-project)  [![Coverage Status](https://coveralls.io/repos/github/robocopkaka/bootcamp-29-project/badge.svg?branch=develop)](https://coveralls.io/github/robocopkaka/bootcamp-29-project?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/58eff872125b52f6cd74/maintainability)](https://codeclimate.com/github/robocopkaka/bootcamp-29-project/maintainability)

## DOCS
https://rocky-meadow-55707.herokuapp.com/docs/

## Installation steps
* Install `NodeJS v7.8.0`
* Install and setup `Postgresql`
* Clone this repo
* Run `npm install` to install all dependencies
* Setup your databases on `Postgres`. Info needed can be gotten at `server/config/config.js`
* Go to [Amazon AWS](https://aws.amazon.com/s3/)
  * Sign in to the console
  * Go to `IAM`
  * Generate a pair of developer access keys from the console and save somewhere private
* Create a `.env` file in your root directory and assign values for the following keys
  * DB_USER
  * DB_PASS
  * secret
  * S3_BUCKET
  * PORT
  * AWS_SECRET_ACCESS_KEY
  * AWS_ACCESS_KEY_ID
* Start up the application using `npm run start:all`
* Go to `http:localhost:8000` to use the application


## Tests
* Both client and server side tests can be run using `npm run test`
* Server side tests can be run using `npm run test:express`
* Client side tests can be run using `npm run test:react`
* End to End tests can be run using `npm run test:e2e`
  * To run end to end tests, first run `npm run prep:e2e` in a separate terminal

## Key Features
* Users can signup and login
* Users can view all centers on the system
* Admins can create new centers
* Users can add new events within a center
* Users can view events within a center
* Users can also view all events created on the system
* Admins can edit events and centers
* Users can edit events that they created
* Users can delete events that they created
* Admins can delete events

## Limitations
* Users can't currently search for either events or centers
* Users don't get mails when an admin deletes their events
* Users can't filter centers by facilities
* Admins can't delete centers and their associated events


## Technologies Used
+ [NodeJS](https://nodejs.org/en/) - a JavaScript runtime built on Chrome's V8 JavaScript engine.
+ [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
+ [PostgreSQL](https://www.postgresql.org/) - a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
+ [Sequelize](http://docs.sequelizejs.com/) - a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
+ [MaterializeCSS](https://materializecss.com/) - a modern responsive front-end framework based on Material Design
+ [Amazon S3](https://aws.amazon.com/s3/) -  object storage built to store and retrieve any amount of data from anywhere – web sites and mobile apps, corporate applications, and data from IoT sensors or devices.

## License
This project is licensed under MIT.

## Contribution
When contributing to this repository, please reach out to me or other contributors via email, issue or any other means to discuss the changes you wish to make.

## Author(s)
* Onyekachi Okereke

## Acknowledgement
* NodeJs
* ExpressJS
* PostgreSQL
* MaterializeCSS
* Amazon S3
* Sequelize
