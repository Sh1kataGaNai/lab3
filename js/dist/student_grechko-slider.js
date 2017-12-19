'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function Slider(options) {
  _classCallCheck(this, Slider);

  var container = options.container,
      slider = options.slider;

  var items = slider.childNodes;

  var data = container.dataset;

  var width = 150;
  var count = options.elementsPerPage || data.elementsPerPage;
  var transitionSpeed = options.transitionSpeed || data.transitionSpeed;

  $(container).css('width', width * count + 'px');
  $(slider).css('transition', 'margin-left ' + transitionSpeed + 'ms');

  var position = 0;

  $(container).find('.previous').click(function () {
    position = Math.min(position + width * count, 0);
    $(slider).css('margin-left', position + 'px');
  });

  $(container).find('.next').click(function () {
    position = Math.max(position - width * count, -width * (items.length - count));
    $(slider).css('margin-left', position + 'px');
  });
};