import utils from '../../scripts/utils';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // DOM elements
  const citiesWrapper = document.querySelector(`[data-js='cities-wrapper']`);
  const citiesSelect = document.querySelector(`[data-js='cities'] select`);
  const citiesOptionCollection = utils.$$(`[data-js='cities'] option`);

  /**
 * Get selected option' data and display it in parent container
 */
  const changeEventHandler = () => {
    let selectedItemValue = citiesOptionCollection[citiesSelect.selectedIndex].dataset.value;
    citiesWrapper.dataset.value = selectedItemValue;
  };

  citiesSelect.addEventListener(`change`, changeEventHandler);

});
