(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.AWFadeCycle = (function() {
    function AWFadeCycle(cycleContainer, intervalLength) {
      this.fader = __bind(this.fader, this);
      this.container = $(cycleContainer);
      this.items = this.container.children();
      this.interval = intervalLength;
      this.state = {
        currentItem: 1,
        totalItems: this.items.length
      };
      this.kickoff();
    }

    AWFadeCycle.prototype.kickoff = function() {
      return setInterval(this.fader, this.interval);
    };

    AWFadeCycle.prototype.fader = function() {
      $(this.items).addClass("hide_this");
      $(this.items[this.state.currentItem]).removeClass("hide_this");
      if (this.state.currentItem === this.state.totalItems - 1) {
        return this.state.currentItem = 0;
      } else {
        return this.state.currentItem = this.state.currentItem + 1;
      }
    };

    return AWFadeCycle;

  })();

}).call(this);
