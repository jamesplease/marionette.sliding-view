global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

// Set up JSDom
global.jsdom = require('jsdom').jsdom;
global.document = global.jsdom('<html><head><script></script></head><body></body></html>');
global.window = global.document.parentWindow;

require('babel/register');
require('./setup')();
