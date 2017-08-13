export default window.addEventListener(`DOMContentLoaded`, () => {
  // template element
  const templateElement = document.querySelector(`[data-js='template']`);
  const slideToClone = templateElement.innerHTML;

  // Ajax Call
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // On failure
      if (xhr.status !== 200) {
        throw new Error(xhr.status + `: ` + xhr.statusText);
      // On success
      } else {
        // Convert JSON string response to an Object
        const dataObject = JSON.parse(xhr.responseText);
        document.querySelector(`.carousel--info`).innerHTML = fillCarouselWithContent(dataObject);
      }
    }
  };

  xhr.open(`GET`, `http://localhost:3000/assets/data/news-slides.json`, true);
  xhr.setRequestHeader(`Access-Control-Allow-Origin`, `*`);
  xhr.send();

  /**
   * Generates and returns the HTML
   * @param {Object.<Object>} dataObject
   * @return {HTMLElement}
   */
  const fillCarouselWithContent = dataObject => {
    let carouselContent = ``;
    const dataArray = Object.keys(dataObject).map(item => dataObject[item]);

    dataArray.forEach(item => {
      carouselContent += slideToClone
        .replace(/%modifier%/g, item[`modifier`])
        .replace(/%heading%/g, item[`heading`])
        .replace(/%body%/g, item[`body`])
        .replace(/%date%/g, item[`date`]);
    });

    return carouselContent;
  };
});
