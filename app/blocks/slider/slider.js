import utils from '../../scripts/utils';
import { lory } from 'lory.js';

export default window.addEventListener(`DOMContentLoaded`, () => {
  const slider = document.querySelector(`.js_slider`);
  const dotCount = slider.querySelectorAll(`.js_slide`).length;
  const dotContainer = slider.querySelector(`.js_slider-dots`);
  const dotListItem = document.createElement(`li`);

  const handleDotEvent = e => {
    if (e.type === `before.lory.init`) {
      for (let i = 0, len = dotCount; i < len; i++) {
        const clone = dotListItem.cloneNode();
        dotContainer.appendChild(clone);
      }
      dotContainer.childNodes[0].classList.add(`active`);
    }
    if (e.type === `after.lory.init`) {
      for (let i = 0, len = dotCount; i < len; i++) {
        dotContainer.childNodes[i].addEventListener(`click`, evt => {
          dotNavigationSlider.slideTo(Array.prototype.indexOf.call(dotContainer.childNodes, evt.target));
        });
      }
    }
    if (e.type === `after.lory.slide`) {
      for (let i = 0, len = dotContainer.childNodes.length; i < len; i++) {
        dotContainer.childNodes[i].classList.remove(`active`);
      }
      dotContainer.childNodes[e.detail.currentSlide - 1].classList.add(`active`);
    }
    if (e.type === `on.lory.resize`) {
      for (let i = 0, len = dotContainer.childNodes.length; i < len; i++) {
        dotContainer.childNodes[i].classList.remove(`active`);
      }
      dotContainer.childNodes[0].classList.add(`active`);
    }
  };

  utils.addListenerMulti(slider, `before.lory.init after.lory.init after.lory.slide on.lory.resize`, handleDotEvent);

  const dotNavigationSlider = lory(slider, {
    infinite: 1,
    enableMouseEvents: true
  });
});
