import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectorEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderTextEl = document.querySelector('.loader');
const errorTextEl = document.querySelector('.error');

selectorEl.addEventListener('change', onSelectClick);
window.addEventListener(`DOMContentLoaded`, onDOMContentLoaded);

let catsArray = [];

function onSelectClick(event) {
  const catId = event.currentTarget.value;
  const catDetails = catsArray.find(cat => cat.id === catId);

  loaderTextEl.classList.remove('is-hidden');

  catInfoEl.classList.add('is-hidden');

  fetchCatByBreed(catId)
    .then(catImages => {
      const catImgUrl = catImages[0].url;

      catInfoEl.innerHTML = renderCatInfo(catImgUrl, catDetails);
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      errorTextEl.classList.remove('is-hidden');
    })
    .finally(() => {
      loaderTextEl.classList.add('is-hidden');
      catInfoEl.classList.remove('is-hidden');
    });
}

function onDOMContentLoaded() {
  selectorEl.classList.add('is-hidden');
  loaderTextEl.classList.remove('is-hidden');

  fetchBreeds()
    .then(breeds => {
      renderOptions(breeds);
      catsArray = breeds;
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      errorTextEl.classList.remove('is-hidden');
    })
    .finally(() => {
      loaderTextEl.classList.add('is-hidden');
      selectorEl.classList.remove('is-hidden');
    });
}

function renderOptions(cats) {
  cats.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.text = cat.name;
    selectorEl.add(option);
  });
  new SlimSelect({
    select: '#single',
  });
}

function renderCatInfo(catImgUrl, catDetails) {
  return `<img class="cat-img" src="${catImgUrl}" alt="cat-image" "/>
      <h2>${catDetails.name}</h2>
      <p>${catDetails.description}</p>
      <p><span class="accent">Temperament: </span>${catDetails.temperament}</p>`;
}
