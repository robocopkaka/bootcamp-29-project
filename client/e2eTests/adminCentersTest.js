require('babel-register');
const path = require('path');

module.exports = {
  'Admin can create a center': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 2000)
      .assert.visible('h3#home-text')
      .assert.containsText('h3#home-text', 'Kachi\'s Event Manager')
      .assert.visible('h2#index-module__home-center-horizontally')
      .assert.containsText('h2#index-module__home-center-horizontally', 'Featured events')
      .assert.visible('div.col.s12.m6.l4.index-module__hvr-grow')
      .click('button.waves-light.btn.index-module__home-button-right')
      // .click('.nav-wrapper ul#nav-mobile li ul#signup-dropdown li a#signup-button')
      .waitForElementVisible('div.modal', 10000)
      .assert.visible('div.modal')
      .assert.visible('h3.index-module__center-heading')
      .assert.containsText('h3.index-module__center-heading', 'Login')
      .pause(2000)
      .setValue('#email', 'onyekachi@kachi.com')
      .setValue('#password', 'password')
      // .pause(4000)
      .click('button.btn.waves-effect.waves-light.index-module__navbar-purple.index-module__round-btn', () => {
        client
          .pause(2000)
          .assert.visible('#toast-container')
          .assert.containsText('div.green.toast', 'Signed in successfully');
      })
      .click('a.waves-light.btn.index-module__home-button-left', () => {
        client
          .pause(4000)
          .assert.visible('div.container.index-module__min-height-hundred-vh')
          .assert.visible('button.btn-floating.btn-large.red.index-module__white-color')
          .click('button.btn-floating.btn-large.red.index-module__white-color', () => {
            client
              .setValue('input#center-name', 'original')
              .setValue('input#center-address', 'original')
              .pause(2000)
              .setValue('input#center-state', 'original')
              .setValue('input#center-capacity', 10)
              .setValue('input#center-chairs', 10)
              .setValue('input#center-projector', 10)
              .pause(2000)
              .setValue('textarea#center-detail', 'original')
              .pause(2000)
              .setValue('input#imageUpload', path.resolve(`${__dirname}/images/ramsey.jpg`))
              .click('button#add-or-update-button')
              .waitForElementVisible('#toast-container', 20000)
              .assert.visible('#toast-container')
              .assert.containsText('div.green.toast', 'Center created successfully');
          });
      })
      .end();
  },
  'Admins can\'t create duplicate centers': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 2000)
      .assert.visible('h3#home-text')
      .assert.containsText('h3#home-text', 'Kachi\'s Event Manager')
      .assert.visible('h2#index-module__home-center-horizontally')
      .assert.containsText('h2#index-module__home-center-horizontally', 'Featured events')
      .assert.visible('div.col.s12.m6.l4.index-module__hvr-grow')
      .click('button.waves-light.btn.index-module__home-button-right')
      // .click('.nav-wrapper ul#nav-mobile li ul#signup-dropdown li a#signup-button')
      .waitForElementVisible('div.modal', 10000)
      .assert.visible('div.modal')
      .assert.visible('h3.index-module__center-heading')
      .assert.containsText('h3.index-module__center-heading', 'Login')
      .pause(2000)
      .setValue('#email', 'onyekachi@kachi.com')
      .setValue('#password', 'password')
      // .pause(4000)
      .click('button.btn.waves-effect.waves-light.index-module__navbar-purple.index-module__round-btn', () => {
        client
          .pause(2000)
          .assert.visible('#toast-container')
          .assert.containsText('div.green.toast', 'Signed in successfully');
      })
      .click('a.waves-light.btn.index-module__home-button-left', () => {
        client
          .pause(4000)
          .assert.visible('div.container.index-module__min-height-hundred-vh')
          .assert.visible('button.btn-floating.btn-large.red.index-module__white-color')
          .click('button.btn-floating.btn-large.red.index-module__white-color', () => {
            client
              .setValue('input#center-name', 'original')
              .setValue('input#center-address', 'original')
              .pause(2000)
              .setValue('input#center-state', 'original')
              .setValue('input#center-capacity', 10)
              .setValue('input#center-chairs', 10)
              .setValue('input#center-projector', 10)
              .pause(2000)
              .setValue('textarea#center-detail', 'original')
              .pause(2000)
              .setValue('input#imageUpload', path.resolve(`${__dirname}/images/ramsey.jpg`))
              .click('button#add-or-update-button')
              .waitForElementVisible('#toast-container', 20000)
              .assert.visible('#toast-container')
              .assert.containsText('div.red.toast', 'Center already exists');
          });
      })
      .end();
  }
};
