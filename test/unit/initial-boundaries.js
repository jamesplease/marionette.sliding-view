/* jshint debug: true */

var SlidingView, slidingView, collection;

describe('Initial boundaries', () => {
  describe('when creating a SlidingView with initialBoundary methods defined', () => {
    beforeEach(() => {
      collection = new Bb.Collection([{},{},{},{},{}]);
      SlidingView = Mn.SlidingView.extend({

        // Start with the first option from the referenceCollection
        getInitialLowerBound() {
          return 3;
        },
        getInitialUpperBound() {
          return 4;
        },
        filterCollection() {
          return this.referenceCollection.slice(this.lowerBound, this.upperBound);
        }
      });

      slidingView = new SlidingView({
        referenceCollection: collection
      });
    });

    it('should set the collection of the slidingView to be of length 1', () => {
      expect(slidingView.collection.length).to.equal(1);
    });

    it('should equal the correct item in the referenceCollection', () => {
      expect(slidingView.collection.at(0)).to.deep.equal(collection.at(3));
    });
  });
});
