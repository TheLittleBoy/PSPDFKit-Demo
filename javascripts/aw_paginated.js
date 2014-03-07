(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.AWPaginated = (function() {
    function AWPaginated(paginatedContainer, paginatedItems, configuration) {
      this.showPageByNumber = __bind(this.showPageByNumber, this);
      this.preparePagesForTransitionTo = __bind(this.preparePagesForTransitionTo, this);
      this.showPageThroughIndicator = __bind(this.showPageThroughIndicator, this);
      this.showPreviousPage = __bind(this.showPreviousPage, this);
      this.showNextPage = __bind(this.showNextPage, this);
      this.cyclePages = __bind(this.cyclePages, this);
      this.container = $(paginatedContainer);
      this.pages = this.container.find(paginatedItems);
      this.state = {
        currentItem: null,
        totalItems: this.pages.length,
        intervalObject: false
      };
      this.configuration = {
        startingItem: 0,
        autostart: false,
        interval: false,
        pageIndicators: true,
        pageScrollers: true
      };
      $.extend(true, this.configuration, configuration);
      if (this.configuration.pageIndicators) {
        this.container.append('<div class="aw_paginated__indicators"></div>');
        this.pages.each((function(_this) {
          return function(index, element) {
            return _this.container.find(".aw_paginated__indicators").append('<div class="aw_paginated__indicator" data-indicate-page="' + index + '"></div>');
          };
        })(this));
        this.container.on("click", ".aw_paginated__indicator", (function(_this) {
          return function(event) {
            return _this.showPageThroughIndicator(event);
          };
        })(this));
        this.adjustPaginationIndicators();
      }
      if (this.configuration.pageScrollers) {
        this.container.append('<div class="aw_paginated__show_previous"></div>');
        this.container.find('.aw_paginated__show_previous').on("click", this.showPreviousPage);
        this.container.append('<div class="aw_paginated__show_next"></div>');
        this.container.find('.aw_paginated__show_next').on("click", this.showNextPage);
      }
      if (this.container.length !== 0) {
        this.kickoff();
      }
    }

    AWPaginated.prototype.kickoff = function() {
      this.showPageByNumber(this.configuration.startingItem);
      if (this.configuration.autostart && this.configuration.interval) {
        return this.state.intervalObject = setInterval(this.cyclePages, this.configuration.interval);
      }
    };

    AWPaginated.prototype.cyclePages = function() {
      if (this.state.currentItem === this.state.totalItems - 1) {
        return this.showPageByNumber(0);
      } else {
        return this.showPageByNumber(this.state.currentItem + 1);
      }
    };

    AWPaginated.prototype.showNextPage = function(event) {
      if (this.state.currentItem < this.pages.length - 1) {
        return this.showPageByNumber(this.state.currentItem + 1);
      }
    };

    AWPaginated.prototype.showPreviousPage = function(event) {
      if (this.state.currentItem > 0) {
        return this.showPageByNumber(this.state.currentItem - 1);
      }
    };

    AWPaginated.prototype.showPageThroughIndicator = function(event) {
      var requestedPage;
      requestedPage = $(event.target).data("indicate-page");
      return this.showPageByNumber(requestedPage);
    };

    AWPaginated.prototype.preparePagesForTransitionTo = function(pageNumber) {
      return this.pages.each((function(_this) {
        return function(index, element) {
          if (pageNumber < index) {
            $(element).removeClass("aw_is_animated");
            $(element).removeClass("aw_is_previous");
            $(element).addClass("aw_is_next");
          }
          if (pageNumber > index) {
            $(element).removeClass("aw_is_animated");
            $(element).removeClass("aw_is_next");
            return $(element).addClass("aw_is_previous");
          }
        };
      })(this));
    };

    AWPaginated.prototype.showPageByNumber = function(pageNumber) {
      this.preparePagesForTransitionTo(pageNumber);
      console.log("@state.currentItem: " + this.state.currentItem);
      console.log("pageNumber: " + pageNumber);
      if (pageNumber >= 0 && pageNumber < this.pages.length && pageNumber !== this.state.currentItem) {
        $(this.pages[this.state.currentItem]).addClass("aw_is_animated");
        $(this.pages[this.state.currentItem]).addClass("aw_is_hidden");
        $(this.pages[this.state.currentItem]).removeClass("aw_is_current");
        if (pageNumber !== this.state.currentItem) {
          this.state.currentItem = pageNumber;
        }
        $(this.pages[this.state.currentItem]).addClass("aw_is_animated");
        $(this.pages[this.state.currentItem]).removeClass("aw_is_hidden");
        $(this.pages[this.state.currentItem]).removeClass("aw_is_previous");
        $(this.pages[this.state.currentItem]).removeClass("aw_is_next");
        $(this.pages[this.state.currentItem]).addClass("aw_is_current");
      }
      return this.adjustPaginationIndicators();
    };

    AWPaginated.prototype.adjustPaginationIndicators = function() {
      return this.container.find(".aw_paginated__indicator").each((function(_this) {
        return function(index, element) {
          if (index === _this.state.currentItem) {
            return $(element).addClass("aw_paginated__indicator_active");
          } else {
            return $(element).removeClass("aw_paginated__indicator_active");
          }
        };
      })(this));
    };

    return AWPaginated;

  })();

}).call(this);
