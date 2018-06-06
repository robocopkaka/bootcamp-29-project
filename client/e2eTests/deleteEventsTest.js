require('babel-register');

module.exports = {
  'Users should be able to delete events': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 2000)
      .assert.visible('h3#home-text')
      .assert.containsText('h3#home-text', 'Kachi\'s Event Manager')
      .assert.visible('h2#index-module__home-center-horizontally')
      .assert.containsText('h2#index-module__home-center-horizontally', 'Featured events')
      .assert.visible('div.col.s12.m6.l4.index-module__hvr-grow')
      .click('.index-module__home-button-group button.waves-effect.waves-light.btn.index-module__home-button-right')
      // .click('.nav-wrapper ul#nav-mobile li ul#signup-dropdown li a#signup-button')
      .waitForElementVisible('div.modal', 10000)
      .assert.visible('div.modal')
      .assert.visible('h3.index-module__center-heading')
      .assert.containsText('h3.index-module__center-heading', 'Login')
      .pause(2000)
      .setValue('#email', 'onyekachi@kachi.com')
      .setValue('#password', 'password')
      .click('button.btn.waves-effect.waves-light.index-module__navbar-purple.index-module__round-btn', () => {
        client
          .pause(2000)
          .assert.visible('#toast-container')
          .assert.containsText('div.green.toast', 'Signed in successfully');
      })
      .click('a.waves-effect.waves-light.btn.index-module__home-button-left', () => {
        client
          .pause(4000)
          .assert.visible('div.container.index-module__min-height-hundred-vh');
      })
      .click('a#view-center-1')
      .waitForElementVisible('body', 4000)
      .assert.visible('button.btn-floating.btn-large.red.index-module__white-color')
      .click('button#delete-event-5')
      .pause(10000)
      .assert.elementNotPresent('button#delete-event-5')
      .pause(2000)
      .end();
  }
};
