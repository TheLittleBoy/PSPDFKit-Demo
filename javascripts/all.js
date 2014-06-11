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
!function(b){function k(){var a=this,c=setTimeout(function(){a.$element.off(b.support.transition.end);g.call(a)},500);this.$element.one(b.support.transition.end,function(){clearTimeout(c);g.call(a)})}function g(){this.$element.hide().trigger("hidden");h.call(this)}function h(a){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=b.support.transition&&c;this.$backdrop=b('<div class="modal-backdrop '+c+'" />').appendTo(document.body);"static"!=this.options.backdrop&&
this.$backdrop.click(b.proxy(this.hide,this));d&&this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in");d?this.$backdrop.one(b.support.transition.end,a):a()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),b.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(b.support.transition.end,b.proxy(i,this)):i.call(this)):a&&a()}function i(){this.$backdrop.remove();this.$backdrop=null}function j(){var a=this;if(this.isShown&&this.options.keyboard)b(document).on("keyup.dismiss.modal",
function(b){27==b.which&&a.hide()});else this.isShown||b(document).off("keyup.dismiss.modal")}var f=function(a,c){this.options=c;this.$element=b(a).delegate('[data-dismiss="modal"]',"click.dismiss.modal",b.proxy(this.hide,this))};f.prototype={constructor:f,toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var a=this;this.isShown||(b("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),j.call(this),h.call(this,function(){var c=b.support.transition&&
a.$element.hasClass("fade");!a.$element.parent().length&&a.$element.appendTo(document.body);a.$element.show();c&&a.$element[0].offsetWidth;a.$element.addClass("in");c?a.$element.one(b.support.transition.end,function(){a.$element.trigger("shown")}):a.$element.trigger("shown")}))},hide:function(a){a&&a.preventDefault();this.isShown&&(this.isShown=!1,b("body").removeClass("modal-open"),j.call(this),this.$element.trigger("hide").removeClass("in"),b.support.transition&&this.$element.hasClass("fade")?k.call(this):
g.call(this))}};b.fn.modal=function(a){return this.each(function(){var c=b(this),d=c.data("modal"),e=b.extend({},b.fn.modal.defaults,c.data(),"object"==typeof a&&a);d||c.data("modal",d=new f(this,e));if("string"==typeof a)d[a]();else e.show&&d.show()})};b.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0};b.fn.modal.Constructor=f;b(function(){b("body").on("click.modal.data-api",'[data-toggle="modal"]',function(a){var c=b(this),d,e=b(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,
"")),c=e.data("modal")?"toggle":b.extend({},e.data(),c.data());a.preventDefault();e.modal(c)})})}(window.jQuery);
(function() {
  $(window).load(function() {
    window.CaseStudies = new AWPaginated("section.case-studies .aw_paginated", ".project", {
      autostart: false,
      interval: false
    });
    window.HeroTitles = new AWPaginated("section.hero .aw_paginated", "h1", {
      autostart: true,
      interval: 12345,
      pageIndicators: false,
      pageScrollers: false
    });
    return window.WhatOurClientsSay = new AWPaginated("section.clients .aw_paginated", "blockquote", {
      autostart: false,
      interval: false
    });
  });

}).call(this);
