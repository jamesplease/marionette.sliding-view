(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(require("underscore"), require("backbone"), require("backbone.marionette")) : typeof define === "function" && define.amd ? define(["underscore", "backbone", "backbone.marionette"], factory) : factory(global._, global.Backbone, global.Mn);
})(this, function (_, Backbone, Mn) {
  "use strict";

  Mn.SlidingView = Mn.CollectionView.extend({
    constructor: function constructor() {
      var options = arguments[0] === undefined ? {} : arguments[0];


      // Throw an error if passed a `collection` option. SlidingView
      // does not follow the same API as CollectionView, so we want
      // to catch errors early on
      if (options.collection) {
        throw new Error("Do not pass a `collection` option to SlidingView.");
      }

      // Store the referenceCollection on the SlidingView
      if (options.referenceCollection) {
        this.referenceCollection = options.referenceCollection;
      }

      // Set the collection to be a new empty collection
      this.collection = new Backbone.Collection();

      Mn.CollectionView.prototype.constructor.apply(this, arguments);

      // Get our initial boundaries, and then update the collection
      this._lowerBound = _.result(this, "initialLowerBound");
      this._upperBound = _.result(this, "initialUpperBound");
      this._updateCollection();

      // If no onUpdateEvent was defined, then we set one
      // using the `throttle` method.
      if (!this.onUpdateEvent) {
        this.onUpdateEvent = this.throttle(this.throttledUpdateHandler);
      }

      // Listen to scroll events to continuously update the collection
      this.registerUpdateEvent();
    },

    // Register the event that calls the onUpdateEvent method. The default
    // is to listen to the view's own scroll event, but it could just
    // as easily listen to any event.
    registerUpdateEvent: function registerUpdateEvent() {
      var _this = this;


      // Execute the throttled callback on scroll
      this.$el.on("scroll", function () {
        _this.onUpdateEvent();
      });
    },

    // What we use to throttle the update event callback. Use
    // requestAnimationFrame in your `onUpdateEvent` callback
    // for better performance
    throttle: function throttle(cb) {
      return _.throttle(cb, 1000 / 60);
    },

    // Called at 60fps whenever the update event occurs
    throttledUpdateHandler: function throttledUpdateHandler() {
      var _this = this;


      // Pass along our arguments to the methods that calculate our boundaries
      var lowerBound = this.getLowerBound();
      var upperBound = this.getUpperBound(lowerBound);

      // We need to render if either of the boundaries have changed. If this is
      // the case, and there's already a render in the queue, then we cancel out
      // that queued render. This prevents users who are scrolling very fast
      // from getting too many renders at once. It won't render until they've
      // slowed down a bit.
      if (lowerBound !== this._lowerBound || upperBound !== this._upperBound) {
        if (this._deferredUpdateId) {
          clearTimeout(this._deferredUpdateId);
        }
      }

      // If the boundaries are unchanged, then we bail out early
      if (lowerBound === this._lowerBound && upperBound === this._upperBound) {
        return;
      }

      // Update our indices
      this._lowerBound = lowerBound;
      this._upperBound = upperBound;

      // Defer an update for 50ms. This prevents many renders when scrolling fast.
      this._deferredUpdateId = setTimeout(function () {
        _this._updateCollection();
      }, 50);
    },

    // The methods that determine our boundaries with each
    // 'update' (typically the scroll event)
    getLowerBound: function getLowerBound() {},
    getUpperBound: function getUpperBound() {},

    // Use the boundaries calculated in `onUpdateEvent` to prune
    // your collection to only the models that you wish to show. Return
    // an array of models to be set on the collection. The default is
    // to just return all of the models
    pruneCollection: function pruneCollection() {
      return this.referenceCollection.models;
    },

    // Update the collection with the results of `pruneCollection`
    // This leverages two important facts:
    // 1. Collection#set performs a 'smart' update at the data layer
    // 2. CollectionView performs a 'smart' update of the view layer
    //    whenever the data layer changes
    _updateCollection: function _updateCollection() {
      this.collection.set(this.pruneCollection(this._lowerBound, this._upperBound));
    }
  });
});
//# sourceMappingURL=./marionette.sliding-view.js.map