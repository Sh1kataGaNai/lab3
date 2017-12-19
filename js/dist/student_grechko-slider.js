'use strict';

function Slider(options) {
  var container = options.container,
      slider = options.slider;

  var items = slider.childNodes;

  var data = container.dataset;

  var width = 150;
  var count = options.elementsPerPage || data.elementsPerPage;
  var transitionSpeed = options.transitionSpeed || data.transitionSpeed;
  container.style.width = width * count + 'px';
  slider.style.transition = 'margin-left ' + transitionSpeed + 'ms';

  var position = 0;

  container.querySelector('.previous').onclick = function () {
    position = Math.min(position + width * count, 0);
    slider.style.marginLeft = position + 'px';
  };

  container.querySelector('.next').onclick = function () {
    position = Math.max(position - width * count, -width * (items.length - count));
    slider.style.marginLeft = position + 'px';
  };
}