import _ from 'underscore';
import Backbone from 'backbone';
import Mn from 'backbone.marionette';

Mn.SlidingView = Mn.CollectionView.extend({
  constructor(options = {}) {

    // Throw an error if passed a `collection` option. SlidingView
    // does not follow the same API as CollectionView, so we want
    // to catch errors early on
    if (options.collection) {
      throw new Error('Do not pass a `collection` option to SlidingView.');
    }

    // Store the referenceCollection on the SlidingView
    if (options.referenceCollection) {
      this.referenceCollection = options.referenceCollection;
    }

    // Set the collection to be an empty collection,
    // and then delete the collection passed in as an
    // option, if one was
    this.collection = new Backbone.Collection();

    Mn.CollectionView.prototype.constructor.apply(this, arguments);

    // Get our initial boundaries, and then update the collection
    this.lowerBound = _.result(this, 'initialLowerBound');
    this.upperBound = _.result(this, 'initialUpperBound');
    this._updateCollection();

    // If no throttled scroll handler was defined, then we set one
    // using the `throttle` method.
    if (!this.onScroll) {
      this.onScroll = this.throttle(this.throttledScrollHandler);
    }

    // Listen to scroll events to continuously update the collection
    this.registerScrollEvent();
  },

  // Register the event that calls the onScroll method. The default
  // is to listen to the view's own scroll event, but it could just
  // as easily listen to another element's scroll event, too.
  registerScrollEvent() {

    // Execute the throttled callback on scroll
    this.$el.on('scroll', () => {
      this.onScroll();
    });
  },

  // What we use to throttle the scroll event. Use
  // requestAnimationFrame for better performance
  throttle(cb) {
    return _.throttle(cb, 1000/60);
  },

  // Called at 60fps within the scroll handler
  throttledScrollHandler() {

    // Pass along our arguments to the methods that calculate our boundaries
    var lowerBound = this.getLowerBound(...arguments);
    var upperBound = this.getUpperBound(...arguments);

    // We need to render if either of the boundaries have changed. If this is
    // the case, and there's already a render in the queue, then we cancel out
    // that queued render. This prevents users who are scrolling very fast
    // from getting too many renders at once. It won't render until they've
    // slowed down a bit.
    if (lowerBound !== this.lowerBound || upperBound !== this.upperBound) {
      if (this._deferredUpdateId) {
        clearTimeout(this._deferredUpdateId);
      }
    }

    // If the boundaries are unchanged, then we bail out early
    if (lowerBound === this.lowerBound && upperBound === this.upperBound) {
      return;
    }

    // Update our indices
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;

    // Defer an update for 50ms. This prevents many renders when scrolling fast.
    this._deferredUpdateId = setTimeout(() => {
      this._updateCollection();
    }, 50);
  },

  // The methods that determine our boundaries with each
  // 'update' (typically the scroll event)
  getLowerBound() {},
  getUpperBound() {},

  // Use the boundaries calculated in `onScroll` to filter down
  // your collection to only the ones that you wish to show. Return
  // an array of models to be set on the collection. The default is
  // to just return all of the models
  filterCollection() {
    return this.referenceCollection.models;
  },

  // Update the collection with the results of `filterCollection`
  // This leverages two important facts:
  // 1. Collection#set performs a 'smart' update at the data layer
  // 2. CollectionView performs a 'smart' update of the view layer
  //    whenever the data layer changes
  _updateCollection() {
    this.collection.set(this.filterCollection());
  }
});
