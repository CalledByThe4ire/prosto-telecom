// see also carousel.scss:48

import utils from '../../scripts/utils';
import Flickity from 'flickity';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // DOM elements
  const carouselsCollection = utils.$$(`.carousel`);
  const infoToggleCollection = utils.$$(`[data-js='info-toggle']`);

  // Flickity options
  const promoFlickity = {
    cellSelector: `.carousel__cell`,
    selectedAttraction: 0.2,
    friction: 0.8,
    wrapAround: true
  };
  const infoFlickity = {
    cellSelector: `.carousel__cell`,
    prevNextButtons: false,
    watchCSS: true,
    wrapAround: true
  };

  carouselsCollection.forEach(carousel => {
    let flkty = new Flickity(carousel, {cellSelector: `.carousel__cell`});
    if (carousel.classList.contains(`carousel--promo`)) {
      // Ajax issues
      flkty.destroy();
      flkty = new Flickity(carousel, promoFlickity);
    }
    if (carousel.classList.contains(`carousel--info`)) {
      // Ajax issues
      flkty.destroy();
      flkty = new Flickity(carousel, infoFlickity);
    }
  });

  const toggleCarousel = evt => {
    carouselsCollection.forEach(carousel => {
      let flkty = new Flickity(carousel, {
        cellSelector: `.carousel__cell`,
        prevNextButtons: false,
        wrapAround: true
      });

      if (carousel.classList.contains(`carousel--info`)) {
        flkty.destroy();

        if (evt.target.dataset.modifier === carousel.parentElement.dataset.modifier) {
          flkty = new Flickity(carousel, {
            cellSelector: `.carousel__cell`,
            prevNextButtons: false,
            watchCSS: true,
            wrapAround: true
          });
        }

      }

    });
  };

  infoToggleCollection.forEach(element => {
    element.addEventListener(`click`, toggleCarousel);
  });
});

