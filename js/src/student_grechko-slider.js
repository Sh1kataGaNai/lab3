function Slider(options) {
  const { container, slider } = options;
  const items = slider.childNodes;

  const data = container.dataset;

  const width = 150;
  const count = options.elementsPerPage || data.elementsPerPage;
  const transitionSpeed = options.transitionSpeed || data.transitionSpeed;
  container.style.width = `${width * count}px`;
  slider.style.transition = `margin-left ${transitionSpeed}ms`;

  let position = 0;

  container.querySelector('.previous').onclick = () => {
    position = Math.min(position + (width * count), 0);
    slider.style.marginLeft = `${position}px`;
  };

  container.querySelector('.next').onclick = () => {
    position = Math.max(position - (width * count), -width * (items.length - count));
    slider.style.marginLeft = `${position}px`;
  };
}
