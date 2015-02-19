var SlidingView, slidingView, collection, clock;

describe('When boundary methods are specified, and the throttled method is called', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();

    collection = new Bb.Collection([{},{},{},{},{}]);

    SlidingView = Mn.SlidingView.extend({
      getInitialLowerBound() {
        return 0;
      },
      getInitialUpperBound() {
        return 1;
      },
      getLowerBound() {
        return 1;
      },
      getUpperBound() {
        return 2;
      }
    });

    slidingView = new SlidingView({
      referenceCollection: collection
    });

    stub(slidingView, 'getUpperBound');
    spy(slidingView, '_updateCollection');
  });

  afterEach(() => {
    clock.restore();
  });

  describe('and no time has passing', () => {
    beforeEach(() => {
      slidingView.throttledUpdateHandler();
    });

    it('should not update the collection', () => {
      expect(slidingView._updateCollection).to.not.have.been.called;
    });

    it('should pass the lower bound to the upperBound call', () => {
      expect(slidingView.getUpperBound)
        .to.have.been.calledOnce
        .and.calledWith(1);
    });
  });

  describe('and 20ms has passed', () => {
    beforeEach(() => {
      slidingView.throttledUpdateHandler();
      clock.tick(20);
    });

    it('should not update the collection', () => {
      expect(slidingView._updateCollection).to.not.have.been.called;
    });
  });

  describe('and 50ms has passed', () => {
    beforeEach(() => {
      slidingView.throttledUpdateHandler();
      clock.tick(50);
    });

    it('should call the update collection method', () => {
      expect(slidingView._updateCollection).to.have.been.calledOnce;
    });

    it('should set the collection correctly', () => {
      expect(slidingView.collection.at(0)).to.deep.equal(collection.at(0));
    });
  });

  describe('and the callback is called quickly, but the boundaries do not change', () => {
    beforeEach(() => {
      slidingView.throttledUpdateHandler();
      slidingView.throttledUpdateHandler();
      slidingView.throttledUpdateHandler();
      slidingView.throttledUpdateHandler();
      clock.tick(50);
    });

    it('should only update the collection once', () => {
      expect(slidingView._updateCollection).to.have.been.calledOnce;
    });
  });

  describe('and the boundaries change, but the callback is called too quickly', () => {
    beforeEach(() => {
      var count = 0;
      slidingView.getLowerBound = function() {
        return ++count;
      };
      slidingView.getUpperBound = function() {
        return ++count;
      };

      spy(global, 'clearTimeout');
      slidingView.throttledUpdateHandler();
      slidingView.throttledUpdateHandler();
      slidingView.throttledUpdateHandler();
      slidingView.throttledUpdateHandler();
      slidingView.throttledUpdateHandler();
      clock.tick(50);
    });

    it('should clear the timeout on all but one of them (n-1)', () => {
      expect(global.clearTimeout).to.have.callCount(4);
    });

    it('should only update the collection once', () => {
      expect(slidingView._updateCollection).to.have.been.calledOnce;
    });
  });
});
