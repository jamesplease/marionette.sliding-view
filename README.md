# marionette.sliding-view
[![Travis build status](http://img.shields.io/travis/jmeas/marionette.sliding-view.svg?style=flat)](https://travis-ci.org/jmeas/marionette.sliding-view)
[![Code Climate](https://codeclimate.com/github/jmeas/marionette.sliding-view/badges/gpa.svg)](https://codeclimate.com/github/jmeas/marionette.sliding-view)
[![Test Coverage](https://codeclimate.com/github/jmeas/marionette.sliding-view/badges/coverage.svg)](https://codeclimate.com/github/jmeas/marionette.sliding-view)
[![Dependency Status](https://david-dm.org/jmeas/marionette.sliding-view.svg)](https://david-dm.org/jmeas/marionette.sliding-view)
[![devDependency Status](https://david-dm.org/jmeas/marionette.sliding-view/dev-status.svg)](https://david-dm.org/jmeas/marionette.sliding-view#info=devDependencies)

A sliding Collection View in Marionette.

### Motivation

Some Collections contain many, many items, and rendering them all at once with a CollectionView
can take a very long time. A 'sliding' CollectionView only displays some of the models at once (typically, only those
visible), giving you fast load times even as the number of items goes into the tens of thousands.

### Getting Started

This is a more complex view class. Accordingly, it may take some time to fully understand the API it provides.
Once you've got it down, though, you should find that it's a really powerful tool.

#### Concepts

Understanding a few core concepts will help you to use the SlidingView.

##### Reference Collection

A SlidingView has two collections: `collection` and `referenceCollection`. The `collection`
represents only the models that are *currently* being displayed. The `referenceCollection` is the
full list of models that the SlidingView represents.

##### Update Event

The SlidingView determines if it needs to change the models that are displayed whenever the "update event"
occurs. By default, the "update event" is the scroll event on the SlidingView's element.

Although in most cases the update event is typically a scroll event, it could be anything.

##### Lower and Upper Boundaries

The SlidingView has two internal properties, called the `lowerBound` and `upperBound`. These
are two properties that can be used to determine which models from the reference collection
should be displayed at any given time.

There are two hooks that are used to set the boundaries, and they are called everytime that
the update event occurs.

In the simplest case, the boundaries will be indices that represent which indices to `slice`
the `referenceCollection` at.

### API

##### `constructor( [options] )`

A `CollectionView` typically receives a `collection` as an option. SlidingView is different in that you
**do not** pass in a `collection`. Instead, pass it in as the option `referenceCollection`. While the
`referenceCollection` represents the full list of models, the `collection` attribute will be created for
you, and will be kept up-to-date with the current models that are displayed in the View.

You can either pass the `referenceCollection` as an option, or specify it on the prototype.

##### `registerUpdateEvent()`

A hook that lets you register when to call the `onUpdateEvent` method. By default,
the SlidingView listens to `scroll` events on its own element. By overriding this,
you could make it update its collection when another element (like a parent) is scrolled,
or any time any event occurs.

When overriding this method, use the `onUpdateEvent` method as your callback for the event.

```js
var MySlidingView = Mn.SlidingView.extend({

  // Update whenever a model changes
  registerUpdateEvent: function() {
    var self = this;
    this.listenTo(someModel, 'change', function() {
      self.onUpdateEvent();
    });
  }
});
```

##### `onUpdateEvent()`

A callback that is executed every time the registered update event happens. The purpose
of this callback is to throttle the *true* callback to the event, which is
`throttledUpdateHandler`.

The default behavior is to throttle the `throttledUpdateHandler` method using the `throttle`
method on the SlidingView.

For a big performance boost, you are highly encouraged to override this method to use
`requestAnimationFrame`.

```js
var MySlidingView = Mn.SlidingView.extend({

  // Use requestAnimationFrame for a big performance boost!
  onUpdateEvent: function() {
    requestAnimationFrame(this.throttledUpdateHandler);
  }
});
```

##### `throttledUpdateHandler()`

This is the method that contains all of the logic for the intelligent SlidingView updates. It is
not recommended that you override this method. You only need to do anything with it when defining
a custom `onUpdateEvent` method.

##### `throttle( fn )`

If you're not using `requestAnimationFrame` (you should be!), then you can specify how
to throttle `fn` here. The default implementation is to use `_.throttle` at 60 fps.

Note that if you **are** using `requestAnimationFrame`, then you can ignore this method
entirely.

##### `pruneCollection(lowerBound, upperBound)`

Use the values of `lowerBound` and `upperBound` to calculate a list of models to be
`set` on the SlidingView's `collection`. By default, all of the models from
`referenceCollection` are returned.

If your upper and lower boundaries reference indices, then you could `slice` your collection
to return just the models within those indices.

```js
var MySlidingView = Mn.SlidingView.extend({
  pruneCollection: function(lowerBound, upperBound) {
    return this.referenceCollection.slice(lowerBound, upperBound)
  }
});
```

##### `initialLowerBound`

The initial lower boundary for the SlidingView. It can be a flat value or a function.

```js
var MySlidingView = Mn.SlidingView.extend({
  initialLowerBound: 3
});
```

##### `initialUpperBound`

The initial upper boundary for the SlidingView. It can be a flat value or a function.

```js
var MySlidingView = Mn.SlidingView.extend({
  initialLowerBound: function() {
    return 5;
  }
});
```

##### `getLowerBound()`

A function that is called each time the update event occurs. Within this method
you should calculate the new value of the `lowerBound` and return it.

##### `getUpperBound( lowerBound )`

Similar to the above, but for the upper boundary. It is passed the `lowerBound` that
was just computed, if you need to use that as a reference.
