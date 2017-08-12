import utils from '../../scripts/utils';
import Flickity from 'flickity';

const carouselsCollection = utils.$$(`.carousel`);
const infoToggleCollection = utils.$$(`[data-js='info-toggle']`);

carouselsCollection.forEach(carousel => {
  if (carousel.classList.contains(`carousel--promo`)) {
    /*eslint-disable */
    new Flickity(carousel, {
      cellSelector: `.carousel__cell`,
      wrapAround: true
    });
    /*eslint-enable */
  }
});

const toggleCarousel = evt => {
  carouselsCollection.forEach(carousel => {
    let flkty = new Flickity(carousel, {
      cellSelector: `.carousel__cell`,
      prevNextButtons: false,
      watchCSS: true,
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

