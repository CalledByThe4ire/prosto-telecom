import utils from '../../scripts/utils';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // DOM elements
  const infoToggleCollection = utils.$$(`[data-js='info-toggle']`);
  const infoListCollection = utils.$$(`[data-js='info-item']`);

  /**
 * Conditionally toggle appropriate nav list
 * @param {MouseEvent} evt
 */
  const clickEventHandler = evt => {
    infoListCollection.forEach(item => {
      if (item.classList.contains(`info__item--visible`)) {
        item.classList.remove(`info__item--visible`);
      }
      if (evt.target.checked && evt.target.dataset.modifier === item.dataset.modifier) {
        item.classList.add(`info__item--visible`);
      }
    });
  };

  infoToggleCollection.forEach(item => {
    item.addEventListener(`click`, evt => {
      clickEventHandler(evt);
    });
  });
});
