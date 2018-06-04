// import $ from 'jquery';
import localStorage from 'mock-local-storage';
import chai from 'chai';
// // var jsdom = require('jsdom');
// // const { JSDOM } = jsdom;
// //
// // const {document} = (new JSDOM('<!doctype html><html><body><div id="app" /></body></html>')).window;
// // global.document = document;
// global.$ = global.jQuery = $;
// // global.Hammer = require('../template/js/hammer.min.js');
// // global.window = document.defaultView;
window.localStorage = global.localStorage
// // // global.document = jsdom('<html><head></head><body><div id="app" /></body></html>');
//
//
//
// if (!global.document) {
//   try {
//     const jsdom = require('jsdom').jsdom; // could throw
//
//     const exposedProperties = ['window', 'navigator', 'document', '$'];
//
//     global.document = jsdom('<html><head></head><body><div id="app" /></body></html>');
//     global.window = document.defaultView;
//     Object.keys(document.defaultView).forEach((property) => {
//       if (typeof global[property] === 'undefined') {
//         exposedProperties.push(property);
//         global[property] = document.defaultView[property];
//       }
//     });
//
//     global.navigator = {
//       userAgent: 'node.js',
//     };
//   } catch (e) {
//     // jsdom is not supported...
//   }
// }
const Materialize = () => {
  const params = {};
  return {
    toast: (a, b, c, d) => {}
  };
};

const jQueryMock = {
  // modal(action) {
  //   return action;
  // },
  // tooltip(action) {
  //   return action;
  // },
  // on(event, cb) {
  //   return cb(event);
  // },
  // css(props) {
  //   return props;
  // },
  // toDateString() {
  //   return jest.fn();
  // },
  // parallax() {},
  // addClass() {},
  // scroll(cb) {
  //   return cb();
  // },
  on() {},
  sideNav() {},
  pickadate() {},
  // offset() {
  //   let top = () => {};
  //   return top;
  // },
  // scrollTop() {},
  // top: {}
};

global.jestExpect = global.expect;
global.expect = chai.expect;
global.$ = () => jQueryMock;
