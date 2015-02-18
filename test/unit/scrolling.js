var slidingView, collection, clock;

describe('When scrolling', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    collection = new Bb.Collection([{},{},{},{},{}]);
    stub(Mn.SlidingView.prototype, 'throttledScrollHandler');

    slidingView = new Mn.SlidingView({
      referenceCollection: collection
    });

    spy(slidingView, 'onScroll');
  });

  afterEach(() => {
    clock.restore();
  });

  describe('once', () => {
    beforeEach(() => {
      slidingView.$el.scroll();
    });

    it('should call the throttled callback once', () => {
      expect(slidingView.onScroll).to.have.been.calledOnce;
    });

    it('should call the scroll callback once', () => {
      expect(slidingView.throttledScrollHandler).to.have.been.calledOnce;
    });
  });

  describe('very fast', () => {
    beforeEach(() => {
      slidingView.$el.scroll().scroll().scroll().scroll().scroll().scroll();
    });

    it('should call the throttled callback 6 times', () => {
      expect(slidingView.onScroll).to.have.callCount(6);
    });

    it('should call the scroll callback once', () => {
      expect(slidingView.throttledScrollHandler).to.have.been.calledOnce;
    });
  });

  describe('at a rate of 60fps', () => {
    beforeEach(() => {
      slidingView.$el.scroll();
      clock.tick(17);
      slidingView.$el.scroll();
      clock.tick(17);
      slidingView.$el.scroll();
      clock.tick(17);
    });

    it('should call the throttled callback 3 times', () => {
      expect(slidingView.onScroll).to.have.been.calledThrice;
    });

    it('should call the scroll callback thrice', () => {
      expect(slidingView.throttledScrollHandler).to.have.been.calledThrice;
    });
  });

  describe('batches of scrolls; each batch at 60fps', () => {
    beforeEach(() => {
      slidingView.$el.scroll().scroll().scroll();
      clock.tick(17);
      slidingView.$el.scroll().scroll();
      clock.tick(17);
      slidingView.$el.scroll().scroll().scroll().scroll();
      clock.tick(17);
    });

    it('should call the throttled callback 9 times', () => {
      expect(slidingView.onScroll).to.have.callCount(9);
    });

    // The fourth time is because Underscore queues up an extra
    // call during the third batch of scrolls
    it('should call the scroll callback four time', () => {
      expect(slidingView.throttledScrollHandler).to.have.callCount(4);
    });
  });
});
