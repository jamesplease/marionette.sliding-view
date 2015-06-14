var SlidingView, slidingView, collection, clock;

describe('isSmallChange', () => {
  describe('When isSmallChange is set to true, and the throttled method is called', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers();

      collection = new Bb.Collection([{},{},{},{},{}]);

      SlidingView = Mn.SlidingView.extend({
        initialLowerBound() {
          return 0;
        },
        initialUpperBound() {
          return 1;
        },
        getLowerBound() {
          return 1;
        },
        getUpperBound() {
          return 2;
        },
        isSmallChange: true
      });

      slidingView = new SlidingView({
        referenceCollection: collection
      });

      spy(slidingView, '_updateCollection');
    });

    afterEach(() => {
      clock.restore();
    });

    describe('and no time has passed', () => {
      beforeEach(() => {
        slidingView.throttledUpdateHandler();
      });

      it('should update the collection', () => {
        expect(slidingView._updateCollection).to.have.been.calledOnce;
      });
    });
  });

  describe('When isSmallChange is set to a method, and the throttled method is called', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers();

      collection = new Bb.Collection([{},{},{},{},{}]);

      SlidingView = Mn.SlidingView.extend({
        initialLowerBound() {
          return 0;
        },
        initialUpperBound() {
          return 1;
        },
        getLowerBound() {
          return 1;
        },
        getUpperBound() {
          return 2;
        },
        isSmallChange() {
          return true;
        }
      });

      slidingView = new SlidingView({
        referenceCollection: collection
      });

      spy(slidingView, '_updateCollection');
      spy(slidingView, 'isSmallChange');
    });

    afterEach(() => {
      clock.restore();
    });

    describe('and no time has passed', () => {
      beforeEach(() => {
        slidingView.throttledUpdateHandler();
      });

      it('should update the collection', () => {
        expect(slidingView._updateCollection).to.have.been.calledOnce;
      });

      it('should pass the boundaries to `isSmallChange`', () => {
        expect(slidingView.isSmallChange)
          .to.have.been.calledOnce
          .and.to.have.been.calledWith({
            oldLowerBound: 0,
            oldUpperBound: 1,
            lowerBound: 1,
            upperBound: 2
          });
      });
    });
  });
});


