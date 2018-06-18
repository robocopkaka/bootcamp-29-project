require('babel-register');

module.exports = {
  'Users should be able to see their profile': (client) => {
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
          .pause(5000)
          .assert.visible('#toast-container')
          .assert.containsText('div.green.toast', 'Signed in successfully');
      })
      .click('a.dropdown-button', () => {
        client
          .waitForElementVisible('a#user-profile', 3000)
          .click('a#user-profile')
          .pause(4000);
      })
      .waitForElementVisible('div#all-events', 10000)
      .assert.visible('div#all-events')
      .click('button#edit-event-11')
      .pause(2000)
      .pause(2000)
      .click('button#add-or-update-event')
      .pause(4000)
      .waitForElementVisible('div.toast.green', 10000)
      .assert.containsText('div.toast.green', 'Event updated successfully')
      .pause(2000)
      .end();
  }
};
