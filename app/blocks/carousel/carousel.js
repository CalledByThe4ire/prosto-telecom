import utils from '../../scripts/utils';
import Flickity from 'flickity';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // media queries
  const mqlMobile = window.matchMedia(`only screen and (max-width: 1071px)`);
  const mqlDesktop = window.matchMedia(`only screen and (min-width: 1072px)`);

  // carousel
  const carouselsCollection = utils.$$(`.carousel`);
  const carouselNews = document.querySelector(`[data-js='info-item'][data-modifier='news'] > .carousel--info`);
  const carouselIssues = document.querySelector(`[data-js='info-item'][data-modifier='issues'] > .carousel--info`);

  // flickities info
  const infoFlickity = {
    cellSelector: `.carousel__cell`,
    prevNextButtons: false,
    wrapAround: true
  };

  /*eslint-disable */
  new Flickity(`.carousel--promo`, {
    cellSelector: `.carousel__cell`,
    selectedAttraction: 0.2,
    friction: 0.8,
    wrapAround: true
  });
  /*eslint-enable */

  let infoFlkties = {
    news: new Flickity(carouselNews, infoFlickity),
    issues: new Flickity(carouselIssues, infoFlickity)
  };

  // carousel' toggle
  const infoToggleCollection = utils.$$(`[data-js='info-toggle']`);

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
   * @param {Array.<Object>} dataObject
   * @return {Array.<HTMLElement>}
   */
  const getContentForMobile = dataObject => {
    let carouselContent = [];

    dataObject.forEach(item => {
      let cell = createCell(item);
      carouselContent.push(cell);
    });
    return carouselContent;
  };

  /**
   * Generates sliders' content for desktop
   * @param {Array.<Object>} dataObject
   * @return {String}
   */
  const getContentForDesktop = dataObject => {
    let carouselContent = ``;

    dataObject.forEach(item => {
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
      if (carousel.classList.contains(`carousel--info`)) {

        if (mqlDesktop.matches) {
          Object.keys(infoFlkties).forEach(key => infoFlkties[key].destroy());
        }

        if (mqlMobile.matches) {
          // Ajax issues
          Object.keys(infoFlkties).forEach(key => infoFlkties[key].destroy());
          infoFlkties[`news`] = new Flickity(carouselNews, infoFlickity);
          infoFlkties[`issues`] = new Flickity(carouselIssues, infoFlickity);

        }
      }
    });
  };

  // Ajax Call
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // On failure
      if (xhr.status !== 200) {
        throw new Error(xhr.status + `: ` + xhr.statusText);
      } else {
        const dataObject = JSON.parse(xhr.responseText);
        const newsData = dataObject[`news`];
        const issuesData = dataObject[`issues`];

        if (mqlMobile.matches) {
          infoFlkties[`news`].append(getContentForMobile(newsData));
          infoFlkties[`issues`].append(getContentForMobile(issuesData));
        }

        if (mqlDesktop.matches) {
          carouselNews.innerHTML = getContentForDesktop(newsData);
          carouselIssues.innerHTML = getContentForDesktop(issuesData);
        }
      }
    }
  };

  matchMedia();

  window.addEventListener(`resize`, () => {
    matchMedia();
  });

  xhr.open(`GET`, `http://localhost:3000/assets/data/slides-list.json`, true);
  xhr.setRequestHeader(`Access-Control-Allow-Origin`, `*`);
  xhr.send();

  /**
   * Re-enables flickity instance after toggling
   * @param {MouseEvent} evt
   */
  const toggleCarousel = evt => {
    carouselsCollection.forEach(carousel => {
      if (evt.target.dataset.modifier && evt.target.dataset.modifier === carousel.parentElement.dataset.modifier) {
        if (mqlMobile.matches) {
          infoFlkties[evt.target.dataset.modifier].destroy();
          infoFlkties[evt.target.dataset.modifier] = new Flickity(carousel, infoFlickity);
        }
      }
    });
  };

  infoToggleCollection.forEach(element => {
    element.addEventListener(`click`, toggleCarousel);
  });
});

