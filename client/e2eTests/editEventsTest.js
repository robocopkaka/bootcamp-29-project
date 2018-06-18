require('babel-register');

module.exports = {
  'Users should be able to edit events': (client) => {
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
      .click('button.btn.waves-effect.waves-light.index-module__navbar-purple.index-module__round-btn', () => {
        client
          .pause(2000)
          .assert.visible('#toast-container')
          .assert.containsText('div.green.toast', 'Signed in successfully');
      })
      .click('a.waves-light.btn.index-module__home-button-left', () => {
        client
          .pause(4000)
          .assert.visible('div.container.index-module__min-height-hundred-vh');
      })
      .click('a#view-center-1')
      .waitForElementVisible('body', 4000)
      .assert.visible('button.btn-floating.btn-large.red.index-module__white-color')
      .click('button#edit-event-1')
      .pause(5000)
      .clearValue('input#event-name')
      .setValue('input#event-name', 'outragtioppgeous')
      .pause(2000)
      .click('div[data-pick="1529103600000"]')
      .pause(1000)
      .click('button.btn-flat.picker__close.waves-effect')
      .click('button#add-or-update-event')
      .pause(4000)
      .assert.visible('div.toast.green')
      .assert.containsText('div.toast.green', 'Event updated successfully')
      .pause(2000)
      .end();
  },
  'Users should not be able to edit an event if the name has been taken': (client) => {
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
      .click('button.btn.waves-effect.waves-light.index-module__navbar-purple.index-module__round-btn', () => {
        client
          .pause(2000)
          .assert.visible('#toast-container')
          .assert.containsText('div.green.toast', 'Signed in successfully');
      })
      .click('a.waves-light.btn.index-module__home-button-left', () => {
        client
          .pause(4000)
          .assert.visible('div.container.index-module__min-height-hundred-vh');
      })
      .click('a#view-center-1')
      .waitForElementVisible('body', 4000)
      .assert.visible('button.btn-floating.btn-large.red.index-module__white-color')
      .click('button#edit-event-1')
      .pause(5000)
      .clearValue('input#event-name')
      .setValue('input#event-name', 'First event')
      .click('button#add-or-update-event')
      .pause(4000)
      .assert.visible('div.toast.red')
      .assert.containsText('div.toast.red', 'Event name already exists')
      .pause(2000)
      .end();
  },
  'Users should not be able to update an event if the date has been taken': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 2000)
      .assert.visible('h3#home-text')
      .assert.containsText('h3#home-text', 'Kachi\'s Event Manager')
      .assert.visible('h2#index-module__home-center-horizontally')
      .assert.containsText('h2#index-module__home-center-horizontally', 'Featured events')
      .assert.visible('div.col.s12.m6.l4.index-module__hvr-grow')
      .click('button.waves-light.btn.index-module__home-button-right')
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
      .click('a.waves-light.btn.index-module__home-button-left', () => {
        client
          .pause(4000)
          .assert.visible('div.container.index-module__min-height-hundred-vh');
      })
      .click('a#view-center-1')
      .waitForElementVisible('body', 4000)
      .assert.visible('button.btn-floating.btn-large.red.index-module__white-color')
      .click('button#edit-event-1')
      .pause(5000)
      .clearValue('input#event-name')
      .setValue('input#event-name', 'outragtioppgeousio')
      .clearValue('input#event-date')
      .pause(1500)
      .setValue('input#event-date', '29 June, 2018')
      .pause(2000)
      .click('div[data-pick="1529276400000"]')
      .pause(1000)
      .click('button.btn-flat.picker__close.waves-effect')
      .pause(2000)
      .click('button#add-or-update-event')
      .pause(4000)
      .assert.visible('div.toast.red')
      .assert.containsText('div.toast.red', 'Oops. Date has already been taken')
      .pause(2000)
      .end();
  },
  'Users should not be able to update an event if the date entered is in the past': (client) => {
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
      .click('button.btn.waves-effect.waves-light.index-module__navbar-purple.index-module__round-btn', () => {
        client
          .pause(2000)
          .assert.visible('#toast-container')
          .assert.containsText('div.green.toast', 'Signed in successfully');
      })
      .click('a.waves-light.btn.index-module__home-button-left', () => {
        client
          .pause(4000)
          .assert.visible('div.container.index-module__min-height-hundred-vh');
      })
      .click('a#view-center-1')
      .waitForElementVisible('body', 4000)
      .assert.visible('button.btn-floating.btn-large.red.index-module__white-color')
      .click('button#edit-event-1')
      .pause(5000)
      .clearValue('input#event-name')
      .setValue('input#event-name', 'btltlltlt')
      .clearValue('input#event-date')
      .pause(1500)
      .setValue('input#event-date', '29 June, 2018')
      .pause(2000)
      .click('div[data-pick="1528239600000"]')
      .pause(1000)
      .click('button.btn-flat.picker__close.waves-effect')
      .pause(2000)
      .click('button.btn-flat.picker__close.waves-effect')
      .click('button#add-or-update-event')
      .pause(4000)
      .assert.visible('div.toast.red')
      .assert.containsText('div.toast.red', 'You likely entered a date that has already passed. Please enter another')
      .pause(2000)
      .end();
  }
};
