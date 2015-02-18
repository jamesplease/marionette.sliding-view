var SlidingView, slidingView, collection;

describe('SlidingView options', () => {
  describe('when passing a `collection` option', () => {
    it('should throw an error', () => {
      expect(() => {
        slidingView = new Mn.SlidingView({
          collection: new Bb.Collection()
        });
      }).to.throw('Do not pass a `collection` option to SlidingView.');
    });
  });

  describe('when passing in a `referenceCollection`', () => {
    beforeEach(() => {
      collection = new Bb.Collection();
      slidingView = new Mn.SlidingView({
        referenceCollection: collection
      });
    });

    it('should accept the option', () => {
      expect(slidingView.referenceCollection).to.deep.equal(collection);
    });
  });

  describe('when not passing a `referenceCollection`, but defining it on the prototype', () => {
    beforeEach(() => {
      collection = new Bb.Collection();
      SlidingView = Mn.SlidingView.extend({
        referenceCollection: collection
      });
      slidingView = new SlidingView();
    });

    it('should use the one on the prototype', () => {
      expect(slidingView.referenceCollection).to.deep.equal(collection);
    });
  });
});
