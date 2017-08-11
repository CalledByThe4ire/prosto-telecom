import utils from '../../scripts/utils';
import Flickity from 'flickity';

const carouselsCollection = utils.$$(`.carousel`);

carouselsCollection.forEach(carousel => {
  if (carousel.classList.contains(`carousel--promo`)) {
    /*eslint-disable */
    new Flickity(carousel, {
      cellSelector: `.carousel__cell`,
      wrapAround: true
    });
    /*eslint-enable */
  }

  if (carousel.classList.contains(`carousel--info`)) {
    /*eslint-disable */
    new Flickity(carousel, {
      cellSelector: `.carousel__cell`,
      prevNextButtons: false,
      watchCSS: true,
      wrapAround: true
    });
    /*eslint-enable */
  }
});

