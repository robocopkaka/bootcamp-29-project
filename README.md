# bootcamp-29-project
[![Build Status](https://travis-ci.org/robocopkaka/bootcamp-29-project.svg?branch=setup-travis)](https://travis-ci.org/robocopkaka/bootcamp-29-project)  [![Coverage Status](https://coveralls.io/repos/github/robocopkaka/bootcamp-29-project/badge.svg?branch=setup-coveralls)](https://coveralls.io/github/robocopkaka/bootcamp-29-project?branch=setup-coveralls)

## Installation steps
* cd into the server folder
* Run npm install to install all dependencies
* Run npm run start:dev to start the server

## Testing with POSTMAN
* Send a PUT request to 127.0.0.1:8000/events/1 with this in the body `{name: "anything", date: "2017-11-11", time: "08:00", centerId: 1}`
* Send a POST request to 127.0.0.1:8000/events with this in the body `{name: "anything", date: "2017-11-11", time: "08:00", centerId: 1}`
* Send a DELETE request to `127.0.0.1:8000/events/1`
* Send a POST request to 127.0.0.1:8000/centers with this in the body `{name: "newish center", detail: "they do stuff", image: "you.jpg", address: "somewhere", state: "somewhere"}`
* Send a PUT request to 127.0.0.1:8000/centers/1 with this in the body `{name: "newishest center", detail: "they do stuff", image: "you.jpg", address: "somewhere", state: "somewhere"}`
* Send a DELETE request to 127.0.0.1:8000/centers/1
* Send a GET request to 127.0.0.1:8000/centers
* Send a GET request to 127.0.0.1:8000/centers/1
* Send a GET request to 127.0.0.1:8000/events
* Send a GET request to 127.0.0.1:8000/events/1

## Tests
> To run tests, use `npm test`

## UI Pages Done
+ Signup Page - template/signup.html
+ Login Page - template/login.html
+ Page for all events - template/all-events.html
+ Page for all centers - template/all-centers.html
+ Page for adding new events - template/new-event.html
+ Page for adding new centers - template/new-center.html
+ Page for showing a center - template/show-center.html
+ Page for editing an event - template/edit-event.html
+ Page for editing a center - template/edit-center.html
+ Index page - template/index.html

## Frameworks Used
+ MaterializeCSS
