var SlidingView, MyCollection, slidingView;

describe('A SlidingView with a custom collectionClass', () => {
  beforeEach(() => {
    MyCollection = Bb.Collection.extend();
    SlidingView = Mn.SlidingView.extend({
      collectionClass: MyCollection
    });
    slidingView = new SlidingView({
      referenceCollection: new Bb.Collection()
    });
  });

  it('should create a collection of that Class', () => {
    expect(slidingView.collection).to.be.instanceof(MyCollection);
  });
});
