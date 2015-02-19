(function() {
  var cellHeight = 35;

  var viewportHeight = $('.container').height();
  var viewport = $('.container')[0];

  var EmployeeView = Mn.ItemView.extend({
    template: _.template('Some employee'),
    className: function() {
      return 'employee-view ' + this.model.get('name');
    },
    onRender: function() {
      var index = this.model.collection.indexOf(this.model);
      this.$el.css({
        top: index * cellHeight
      });
    }
  });

  var EmployeesView = Mn.SlidingView.extend({
    childView: EmployeeView,

    // Use this offset to 
    indexOffset: 20,

    registerUpdateEvent: function() {
      var self = this;
      $('.container').on('scroll', function() {
        self.onUpdateEvent();
      });
    },

    onUpdateEvent: function() {
      var self = this;
      requestAnimationFrame(function() {
        self.throttledUpdateHandler();
      });
    },

    initialLowerBound: 0,

    initialUpperBound: function() {
      return Math.floor(viewportHeight / cellHeight) + this.indexOffset;
    },

    getLowerBound: function() {
      var start = Math.floor(viewport.scrollTop / cellHeight);
      start = start - this.indexOffset;
      if (start < 0) { start = 0; }
      return start;
    },

    getUpperBound: function(lowerBound) {
      var contained = Math.floor(viewportHeight / cellHeight);

      // Multiply the offset by 2 to account for the start index
      end = lowerBound + contained + 2 * this.indexOffset;
      
      return end;
    },

    pruneCollection: function(lowerBound, upperBound) {
      return this.referenceCollection.slice(lowerBound, upperBound)
    }
  });

  var employeesView = new EmployeesView({
    el: '.data-container',
    referenceCollection: employeesCollection
  });

  window.employeesView = employeesView;

  employeesView.render();
})();
