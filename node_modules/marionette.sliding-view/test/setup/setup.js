import _ from 'underscore';
import $ from 'jquery';
import Bb from 'backbone';
Bb.$ = $;
import Mn from 'backbone.marionette';
import '../../src/marionette.sliding-view';

global._ = _;
global.$ = $;
global.Bb = Bb;
global.Mn = Mn;

export default function() {
  global.expect = global.chai.expect;

  beforeEach(function() {
    this.sandbox = global.sinon.sandbox.create();
    global.stub = this.sandbox.stub.bind(this.sandbox);
    global.spy  = this.sandbox.spy.bind(this.sandbox);
  });

  afterEach(function() {
    delete global.stub;
    delete global.spy;
    this.sandbox.restore();
  });
}
