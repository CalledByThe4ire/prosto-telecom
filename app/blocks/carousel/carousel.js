// see also carousel.scss:48

import utils from '../../scripts/utils';
import Flickity from 'flickity';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // carousel
  const carouselsCollection = utils.$$(`.carousel`);
  let flkty = new Flickity(`.carousel`, { cellSelector: `.carousel__cell` });
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

  // carousel' toggle
  // const infoToggleCollection = utils.$$(`[data-js='info-toggle']`);

  // template
  const templateElement = document.querySelector(`[data-js='template']`);
  const slideToClone = templateElement.innerHTML;

  /**
   * Generates and returns the HTML
   * @param {Object.<Object>} dataObject
   * @return {String}
   */
  const fillCarouselWithContent = dataObject => {
    let carouselContent = [];
    const dataArray = Object.keys(dataObject).map(item => dataObject[item]);

    dataArray.forEach(item => {
      let cell = document.createElement(`div`);
      cell.classList = `slide slide--info carousel__cell`;
      cell.innerHTML = slideToClone
        .replace(/%heading%/g, item[`heading`])
        .replace(/%body%/g, item[`body`])
        .replace(/%date%/g, item[`date`]);
      carouselContent.push(cell);
    });

    return carouselContent;
  };

  carouselsCollection.forEach(carousel => {
    if (carousel.classList.contains(`carousel--promo`)) {
      // Ajax issues
      flkty.destroy();
      flkty = new Flickity(carousel, promoFlickity);
    }
    if (carousel.classList.contains(`carousel--info`)) {
      flkty = new Flickity(carousel, infoFlickity);
    }
  });

  // Ajax Call
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // On failure
      if (xhr.status !== 200) {
        throw new Error(xhr.status + `: ` + xhr.statusText);
        // On success
      } else {
        // Convert JSON string response to an Object
        const dataObject = JSON.parse(xhr.responseText);
        flkty.append(fillCarouselWithContent(dataObject));
      }
    }
  };

  xhr.open(`GET`, `http://localhost:3000/assets/data/news-slides.json`, true);
  xhr.setRequestHeader(`Access-Control-Allow-Origin`, `*`);
  xhr.send();

  // const toggleCarousel = evt => {
  //   carouselsCollection.forEach(carousel => {
  //     let flkty = new Flickity(carousel, {
  //       cellSelector: `.carousel__cell`,
  //       prevNextButtons: false,
  //       wrapAround: true
  //     });

  //     if (carousel.classList.contains(`carousel--info`)) {
  //       flkty.destroy();

  //       if (evt.target.dataset.modifier === carousel.parentElement.dataset.modifier) {
  //         flkty = new Flickity(carousel, {
  //           cellSelector: `.carousel__cell`,
  //           prevNextButtons: false,
  //           watchCSS: true,
  //           wrapAround: true
  //         });
  //       }

  //     }

  //   });
  // };

  // infoToggleCollection.forEach(element => {
  //   element.addEventListener(`click`, toggleCarousel);
  // });
});

