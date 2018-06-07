require('babel-register');

module.exports = {
  'Users can edd events': (client) => {
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
      // .pause(4000)
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
      .click('button.btn-floating.btn-large.red.index-module__white-color')
      .pause(2000)
      .assert.visible('h3.center-heading')
      .assert.containsText('h3.center-heading', 'Add an Event')
      .setValue('input#event-name', 'jollbmbmbmbystuff')
      .setValue('textarea#event-detail', 'jollystuff')
      .setValue('input#event-guests', 10)
      .setValue('input#event-date', '29 June, 2018')
      .pause(2000)
      .click('div[data-pick="1529276400000"]')
      .pause(1000)
      .click('button.btn-flat.picker__close.waves-effect')
      .pause(2000)
      .click('button#add-or-update-event')
      .pause(4000)
      .assert.visible('div.toast.green')
      .assert.containsText('div.toast.green', 'Event created successfully')
      .pause(2000)
      .end();
  },
  'Users cannot add events with the same name': (client) => {
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
      // .pause(4000)
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
      .click('button.btn-floating.btn-large.red.index-module__white-color')
      .pause(2000)
      .assert.visible('h3.center-heading')
      .assert.containsText('h3.center-heading', 'Add an Event')
      .setValue('input#event-name', 'jollbmbmbmbystuff')
      .setValue('textarea#event-detail', 'jollystuff')
      .setValue('input#event-guests', 10)
      .setValue('input#event-date', '29 June, 2018')
      .pause(2000)
      .click('div[data-pick="1529449200000"]')
      .pause(1000)
      .click('button.btn-flat.picker__close.waves-effect')
      .pause(2000)
      .click('button#add-or-update-event')
      .pause(4000)
      .assert.visible('div.toast.red')
      .assert.containsText('div.toast.red', 'Event name already exists')
      .pause(2000)
      .end();
  },
  'Users should not be able to create event if date is in the past': (client) => {
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
      // .pause(4000)
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
      .click('button.btn-floating.btn-large.red.index-module__white-color')
      .pause(2000)
      .assert.visible('h3.center-heading')
      .assert.containsText('h3.center-heading', 'Add an Event')
      .setValue('input#event-name', 'vkefmkdsfnccbubfbc')
      .setValue('textarea#event-detail', 'jollystuff')
      .setValue('input#event-guests', 10)
      .setValue('input#event-date', '29 June, 2018')
      .pause(2000)
      .click('div[data-pick="1528153200000"]')
      .pause(1000)
      .click('button.btn-flat.picker__close.waves-effect')
      .pause(2000)
      .click('button#add-or-update-event')
      .pause(4000)
      .assert.visible('div.toast.red')
      .assert.containsText('div.toast.red', 'You likely entered a date that has already passed. Please enter another')
      .pause(2000)
      .end();
  },
  'Users should not be able to create events if date has been taken': (client) => {
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
      // .pause(4000)
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
      .click('button.btn-floating.btn-large.red.index-module__white-color')
      .pause(2000)
      .assert.visible('h3.center-heading')
      .assert.containsText('h3.center-heading', 'Add an Event')
      .setValue('input#event-name', 'tuyonbbmiopmiwiwi')
      .setValue('textarea#event-detail', 'jollystuff')
      .setValue('input#event-guests', 10)
      .setValue('input#event-date', '29 June, 2018')
      .pause(2000)
      .click('div[data-pick="1529276400000"]')
      .pause(1000)
      .click('button.btn-flat.picker__close.waves-effect')
      .pause(2000)
      .click('button#add-or-update-event')
      .pause(4000)
      .assert.visible('div.toast.red')
      .assert.containsText('div.toast.red', 'Oops, date already taken. Try another')
      .pause(2000)
      .end();
  }
};
