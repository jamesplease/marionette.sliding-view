var SlidingView, slidingView, collection, clock;

describe('When boundary methods are specified, and a scroll event is fired', () => {
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
      },
    });

    slidingView = new SlidingView({
      referenceCollection: collection
    });

    spy(slidingView, '_updateCollection');

    slidingView.$el.scroll();
  });

  afterEach(() => {
    clock.restore();
  });

  describe('and no time has passing', () => {
    it('should not update the collection', () => {
      expect(slidingView._updateCollection).to.not.have.been.called;
    });
  });

  describe('and 20ms has passed', () => {
    beforeEach(() => {
      clock.tick(20);
    });

    it('should not update the collection', () => {
      expect(slidingView._updateCollection).to.not.have.been.called;
    });
  });

  describe('and 51ms has passed', () => {
    beforeEach(() => {
      clock.tick(67);
    });

    it('should update the collection', () => {
      expect(slidingView._updateCollection).to.have.been.calledOnce;
    });
  });
});
