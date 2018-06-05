require('babel-register');

module.exports = {
  'Login tests': (client) => {
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
      .setValue('#email', 'gmail.com')
      .setValue('#password', '')
      .pause(4000)
      .click('button.btn.waves-effect.waves-light.index-module__navbar-purple.index-module__round-btn')
      .end();
  }
};
