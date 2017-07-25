import utils from '../../scripts/utils';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // media queries
  const mqlMobile = window.matchMedia(`only screen and (max-width: 1071px)`);
  const mqlDesktop = window.matchMedia(`only screen and (min-width: 1072px)`);

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
  const toggleList = evt => {
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

  /**
* Toggle 'offers' block conditionally for different breakpoints
*/
  // const matchMedia = () => {
  //   if (mqlDesktop.matches) {
  //     if (!offers.classList.contains(`offers--` + visibleMod)) {
  //       offers.classList.add(`offers--` + visibleMod);
  //     }
  //   }

  //   if (mqlMobile.matches) {
  //     if (offers.classList.contains(`offers--` + visibleMod)) {
  //       pageHeaderDesign(`mobile`);
  //     }
  //   }
  // };

  listToggle.forEach(item => {
    item.addEventListener(`click`, evt => {
      toggleList(evt);
    });
  });

  // matchMedia();

  // window.addEventListener(`resize`, () => {
  //   matchMedia();
  // });

});
