import utils from '../../scripts/utils';

export default window.addEventListener(`DOMContentLoaded`, () => {

  // DOM elements
  const listToggle = utils.$$(`[data-js='list-item']`);

  // modifiers
  const visibleMod = `visible`;
  const expandedMod = `expanded`;
  const collapsedMod = `collapsed`;

  /**
   * Toggle 'offers' block for mobile
   * @param {MouseEvent} evt
   */
  const clickEventHandler = evt => {
    if (evt.target.parentElement.classList.contains(`list__item--` + collapsedMod)) {
      evt.target.parentElement.classList.remove(`list__item--` + collapsedMod);
      evt.target.parentElement.classList.add(`list__item--` + expandedMod);
      evt.target.parentElement.lastElementChild.classList.add(`list--` + visibleMod);
    } else {
      evt.target.parentElement.classList.add(`list__item--` + collapsedMod);
      evt.target.parentElement.classList.remove(`list__item--` + expandedMod);
      evt.target.parentElement.lastElementChild.classList.remove(`list--` + visibleMod);
    }
  };

  listToggle.forEach(item => {
    item.addEventListener(`click`, evt => {
      clickEventHandler(evt);
    });
  });

});
