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
    const el = evt.target.parentElement;

    if (el.classList.contains(`list__item--top-level`)) {
      if (el.classList.contains(`list__item--` + collapsedMod)) {
        el.classList.remove(`list__item--` + collapsedMod);
        el.classList.add(`list__item--` + expandedMod);
        el.lastElementChild.classList.add(`list--` + visibleMod);
      } else {
        el.classList.add(`list__item--` + collapsedMod);
        el.classList.remove(`list__item--` + expandedMod);
        el.lastElementChild.classList.remove(`list--` + visibleMod);
      }
    }
  };

  listToggle.forEach(item => {
    item.addEventListener(`click`, evt => {
      clickEventHandler(evt);
    });
  });

});
