import utils from '../../scripts/utils';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // DOM elements
  const plansToggleCollection = utils.$$(`[data-js='plans-toggle']`);
  const plansListCollection = utils.$$(`[data-js='plans-item']`);

  /**
 * Conditionally toggle appropriate nav list
 * @param {MouseEvent} evt
 */
  const clickEventHandler = evt => {
    plansListCollection.forEach(nav => {
      if (nav.classList.contains(`plans__item--visible`)) {
        nav.classList.remove(`plans__item--visible`);
      }
      if (evt.target.checked && evt.target.dataset.modifier === nav.dataset.modifier) {
        nav.classList.add(`plans__item--visible`);
      }
    });
  };

  plansToggleCollection.forEach(item => {
    item.addEventListener(`click`, evt => {
      clickEventHandler(evt);
    });
  });
});
