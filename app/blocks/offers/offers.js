import utils from '../../scripts/utils';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // DOM elements
  const navToggleCollection = utils.$$(`[data-js='nav-toggle']`);
  const navListCollection = utils.$$(`[data-js='nav'] > .nav__list`);

  /**
 * Conditionally toggle appropriate nav list
 * @param {MouseEvent} evt
 */
  const toggleNav = evt => {
    navListCollection.forEach(nav => {
      if (nav.classList.contains(`nav__list--visible`)) {
        nav.classList.remove(`nav__list--visible`);
      }
      if (evt.target.checked && evt.target.dataset.mod === nav.dataset.mod) {
        nav.classList.add(`nav__list--visible`);
      }
    });
  };

  navToggleCollection.forEach(item => {
    item.addEventListener(`click`, evt => {
      toggleNav(evt);
    });
  });
});
