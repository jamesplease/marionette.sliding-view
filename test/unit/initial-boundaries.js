var SlidingView, slidingView, collection;

describe('Initial boundaries', () => {
  describe('when creating a SlidingView with initialBoundary methods defined as flat values', () => {
    beforeEach(() => {
      collection = new Bb.Collection([{},{},{},{},{}]);
      SlidingView = Mn.SlidingView.extend({

        // Start with the first option from the referenceCollection
        initialLowerBound: 3,
        initialUpperBound: 4,

        pruneCollection() {
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

  describe('when creating a SlidingView with initialBoundary methods defined as methods', () => {
    beforeEach(() => {
      collection = new Bb.Collection([{},{},{},{},{}]);
      SlidingView = Mn.SlidingView.extend({

        // Start with the first option from the referenceCollection
        initialLowerBound() {
          return 3;
        },
        initialUpperBound() {
          return 4;
        },

        pruneCollection() {
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
