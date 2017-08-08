import utils from '../../scripts/utils';
import { lory } from 'lory.js';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // variables
  let slidersStore = {};
  const slidersCollection = utils.$$(`.js_slider`);

  // media queries
  const mqlMobile = window.matchMedia(`only screen and (max-width: 1071px)`);
  const mqlDesktop = window.matchMedia(`only screen and (min-width: 1072px)`);

  /**
   * Initializes slider
   * @param {HTMLElement} element
   * @return {Object<Object>}
   */
  const initDotSlider = (element) => {
    let randNumber = Math.random().toString(36).slice(2);

    const slider = element;
    const dotCount = slider.querySelectorAll(`.js_slide`).length;
    const dotContainer = slider.querySelector(`.js_slider-dots`);
    const dotListItem = document.createElement(`li`);

    /**
     * Handles slider events
     * @param {MouseEvent} e
     */
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
            slidersStore[randNumber].slideTo(Array.prototype.indexOf.call(dotContainer.childNodes, evt.target));
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

    /**
    * Destroy / reset slider conditionally for different breakpoints
    * @param {MouseEvent} e
    */
    const matchMedia = (e) => {
      if (slider.dataset.js === `info-slider`) {

        if (e.type === `on.lory.resize`) {
          if (mqlDesktop.matches) {
            slidersStore[randNumber].destroy();
          }
          if (e.type === `after.lory.destroy`) {
            // if (mqlMobile.matches) {
            console.log(`1`);
          }
          // }
        }
      }
    };

    utils.addListenerMulti(slider, `before.lory.init after.lory.init after.lory.slide on.lory.resize`, handleDotEvent);

    utils.addListenerMulti(slider, `on.lory.resize after.lory.destroy`, matchMedia);

    slidersStore[randNumber] = lory(slider, {
      infinite: 1,
      enableMouseEvents: true
    });

    return slidersStore[randNumber];
  };

  slidersCollection.forEach(item => {
    initDotSlider(item);
  });

});
