import $ from 'jquery';
import localStorage from 'mock-local-storage'
global.$ = global.jQuery = $;
global.Hammer = require('../template/js/hammer.min.js');
global.window = {}
window.localStorage = global.localStorage
