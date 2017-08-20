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
  const infoToggleCollection = utils.$$(`[data-js='info-toggle']`);
  const infoToggleChecked = document.querySelector(`[data-js='info-toggle'][checked='checked']`);

  // template
  const templateElement = document.querySelector(`[data-js='template']`);
  const slideToClone = templateElement.innerHTML;

  // xhr
  let xhrList = {};

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

  /**
  * Enable / disable carousel for different viewports
  */
  const matchMedia = () => {
    carouselsCollection.forEach(carousel => {
      if (carousel.parentElement.dataset.modifier === infoToggleChecked.dataset.modifier) {
        if (mqlDesktop.matches) {
          flkty.destroy();
        }

        if (mqlMobile.matches) {
          // Ajax issues
          flkty.destroy();
          flkty = new Flickity(carousel, infoFlickity);
        }
      }
    });
  };

  const makeXhr = () => {
    // Ajax Call
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // On failure
        if (xhr.status !== 200) {
          throw new Error(xhr.status + `: ` + xhr.statusText);
        } else {
          const dataObject = JSON.parse(xhr.responseText);
          console.log(dataObject);
        }
      }
    };
    return xhr;
  };

  xhrList[`news`] = makeXhr();
  xhrList[`issues`] = makeXhr();

  Object.keys(xhrList).forEach(xhr => {
    xhrList[xhr].open(`GET`, `http://localhost:3000/assets/data/${xhr}-slides.json`, true);
    xhrList[xhr].setRequestHeader(`Access-Control-Allow-Origin`, `*`);
    xhrList[xhr].send();
  });

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

  matchMedia();

  window.addEventListener(`resize`, () => {
    matchMedia();
  });

  const toggleCarousel = evt => {
    carouselsCollection.forEach(carousel => {

      if (carousel.classList.contains(`carousel--info`)) {
        if (evt.target.dataset.modifier === carousel.parentElement.dataset.modifier) {
          flkty.destroy();
          flkty = new Flickity(carousel, infoFlickity);
        }
      }

    });
  };

  infoToggleCollection.forEach(element => {
    element.addEventListener(`click`, toggleCarousel);
  });
});

