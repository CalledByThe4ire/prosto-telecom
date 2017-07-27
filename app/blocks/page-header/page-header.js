// import utils from '../../scripts/utils';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // media queries
  const mqlMobile = window.matchMedia(`only screen and (max-width: 1071px)`);
  const mqlDesktop = window.matchMedia(`only screen and (min-width: 1072px)`);

  // DOM elements
  const containerFluid = document.querySelector(`[data-js='container-fluid']`);
  const pageHeader = document.querySelector(`[data-js='page-header']`);
  const logoLink = document.querySelector(`[data-js='logo-link']`);
  const offers = document.querySelector(`[data-js='offers']`);
  const toggle = document.querySelector(`[data-js='offers-toggle']`);

  // modifiers
  const closeMod = `close`;
  const visibleMod = `visible`;
  const colorizedMod = `colorized`;

  /**
   * Transform 'page-header' block appearance via classes
   * for different viewport' modes
   * @param  {String} viewPortMode
   */
  const pageHeaderDesign = viewPortMode => {
    switch (viewPortMode) {
      case `mobile`:
        containerFluid.classList.add(`page-header__container-fluid--` + colorizedMod);
        pageHeader.classList.add(`page-header--` + colorizedMod);
        logoLink.classList.remove(`page-header__link--` + visibleMod);
        toggle.classList.add(`page-header__toggle--` + closeMod);
        break;
      case `desktop`:
        containerFluid.classList.remove(`page-header__container-fluid--` + colorizedMod);
        pageHeader.classList.remove(`page-header--` + colorizedMod);
        logoLink.classList.add(`page-header__link--` + visibleMod);
        toggle.classList.remove(`page-header__toggle--` + closeMod);
        break;
    }
  };

	/**
	 * Toggle 'offers' block for mobile
	 * @param {MouseEvent} evt
	 */
  const clickEventHandler = evt => {
    evt.target.classList.toggle(`page-header__toggle--` + closeMod);
    offers.classList.toggle(`offers--` + visibleMod);

    if (!offers.classList.contains(`offers--` + visibleMod)) {
      pageHeaderDesign(`desktop`);
    } else {
      pageHeaderDesign(`mobile`);
    }
  };

  /**
 * Toggle 'offers' block conditionally for different breakpoints
 */
  const matchMedia = () => {
    if (mqlDesktop.matches) {
      if (!offers.classList.contains(`offers--` + visibleMod)) {
        offers.classList.add(`offers--` + visibleMod);
      }
    }

    if (mqlMobile.matches) {
      if (offers.classList.contains(`offers--` + visibleMod)) {
        pageHeaderDesign(`mobile`);
      }
    }
  };

  toggle.addEventListener(`click`, evt => {
    clickEventHandler(evt);
  });

  matchMedia();

  window.addEventListener(`resize`, () => {
    matchMedia();
  });

});
