import Flickity from 'flickity';

export default window.addEventListener(`DOMContentLoaded`, () => {
  const flkty = new Flickity(`[data-js='promo-carousel']`, {
    cellSelector: `[data-js='carousel-cell']`
  });
});
