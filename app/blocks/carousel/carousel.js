import utils from '../../scripts/utils';
import Flickity from 'flickity';

const carouselsCollection = utils.$$(`.carousel`);

carouselsCollection.forEach(carousel => {
  /*eslint-disable */
  new Flickity(carousel, {
    cellSelector: `.carousel__cell`,
    wrapAround: true
  });
  /*eslint-enable */
});

