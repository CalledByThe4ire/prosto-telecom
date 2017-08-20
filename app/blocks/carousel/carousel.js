import utils from '../../scripts/utils';
import Flickity from 'flickity';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // media queries
  const mqlMobile = window.matchMedia(`only screen and (max-width: 1071px)`);
  const mqlDesktop = window.matchMedia(`only screen and (min-width: 1072px)`);

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
    wrapAround: true
  };

  // carousel' toggle
  // const infoToggleCollection = utils.$$(`[data-js='info-toggle']`);

  // template
  const templateElement = document.querySelector(`[data-js='template']`);
  const slideToClone = templateElement.innerHTML;

  /**
   * Creates carousel's cell
   * @param {HTMLElement} template
   * @return {HTMLElement}
   */
  const createCell = (template) => {
    let element = document.createElement(`div`);
    element.classList = `slide slide--info carousel__cell`;
    element.innerHTML = slideToClone
      .replace(/%heading%/g, template[`heading`])
      .replace(/%body%/g, template[`body`])
      .replace(/%date%/g, template[`date`]);
    return element;
  };

  /**
   * Generates sliders' content for mobile
   * @param {Object.<Object>} dataObject
   * @return {Array.<HTMLElement>}
   */
  const getContentForMobile = dataObject => {
    let carouselContent = [];
    const dataArray = Object.keys(dataObject).map(item => dataObject[item]);

    dataArray.forEach(item => {
      let cell = createCell(item);
      carouselContent.push(cell);
    });

    return carouselContent;
  };

  /**
   * Generates sliders' content for desktop
   * @param {Object.<Object>} dataObject
   * @return {String}
   */
  const getContentForDesktop = dataObject => {
    let carouselContent = ``;
    const dataArray = Object.keys(dataObject).map(item => dataObject[item]);

    dataArray.forEach(item => {
      let cell = createCell(item);
      carouselContent += cell.outerHTML;
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

  /**
  * Enable / disable carousel for different viewports
  */
  const matchMedia = () => {
    if (mqlDesktop.matches) {
      flkty.destroy();
    }

    if (mqlMobile.matches) {
      flkty = new Flickity(`.carousel--info`, infoFlickity);
    }
  };

  matchMedia();

  window.addEventListener(`resize`, () => {
    matchMedia();
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
        if (mqlMobile.matches) {
          flkty.append(getContentForMobile(dataObject));
        }
        if (mqlDesktop.matches) {
          document.querySelector(`.carousel--info`).innerHTML = getContentForDesktop(dataObject);
        }
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

