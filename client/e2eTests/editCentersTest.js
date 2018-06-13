require('babel-register');
const path = require('path');

module.exports = {
  'Admins can edit centers': (client) => {
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
          .assert.visible('button#center-1')
          .click('button#center-1')
          .pause(3000)
          .assert.visible('h3.index-module__center-heading')
          .assert.containsText('h3.index-module__center-heading', 'Edit a Center')
          .clearValue('input#center-name')
          .setValue('input#center-name', 'outrageous')
          .click('button#add-or-update-button')
          .waitForElementVisible('#toast-container', 20000)
          .assert.visible('div.toast.green')
          .assert.containsText('div.toast.green', 'Center updated successfully');
      })
      .end();
  },
  'Regular users should not see edit button': (client) => {
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
      .setValue('#email', 'wilson@kachi.com')
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
          .assert.elementNotPresent('button#center-1');
      })
      .end();
  }
};
