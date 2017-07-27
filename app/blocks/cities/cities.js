import utils from '../../scripts/utils';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // DOM elements
  const citiesWrapper = document.querySelector(`[data-js='cities-wrapper']`);
  const citiesSelect = document.querySelector(`[data-js='cities-select']`);
  const citiesItemCollection = utils.$$(`[data-js='cities-item']`);

  /**
 * Get selected option' data and display it in parent container
 */
  const changeEventHandler = () => {
    let selectedItemValue = citiesItemCollection[citiesSelect.selectedIndex].dataset.value;
    citiesWrapper.dataset.value = selectedItemValue;
  };

  citiesSelect.addEventListener(`change`, changeEventHandler);

});
