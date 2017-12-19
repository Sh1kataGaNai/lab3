class Slider {
  constructor(options) {
    const { container, slider } = options;
    const items = slider.childNodes;

    const data = container.dataset;

    const width = 150;
    const count = options.elementsPerPage || data.elementsPerPage;
    const transitionSpeed = options.transitionSpeed || data.transitionSpeed;

    $(container).css('width', `${width * count}px`);
    $(slider).css('transition', `margin-left ${transitionSpeed}ms`);

    let position = 0;

    $(container).find('.previous').click(() => {
      position = Math.min(position + (width * count), 0);
      $(slider).css('margin-left', `${position}px`);
    });

    $(container).find('.next').click(() => {
      position = Math.max(position - (width * count), -width * (items.length - count));
      $(slider).css('margin-left', `${position}px`);
    });
  }
}
