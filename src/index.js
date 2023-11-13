import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectorEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

selectorEl.addEventListener('change', onSelectClick);

let catsArray = [];

function onSelectClick(event) {
  const catId = event.currentTarget.value;
  const catDetails = catsArray.find(cat => cat.id === catId);

  fetchCatByBreed(catId).then(catImages => {
    const catImgUrl = catImages[0].url;

    catInfoEl.innerHTML = renderCatInfo(catImgUrl, catDetails);
  });
}

fetchBreeds()
  .then(breeds => {
    renderOptions(breeds);
    catsArray = breeds;
  })
  .catch(err => {
    console.log(err);
  });

function renderOptions(cats) {
  cats.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.text = cat.name;
    selectorEl.add(option);
  });
}

function renderCatInfo(catImgUrl, catDetails) {
  return `<img src="${catImgUrl}" alt="cat-image" />
      <h2>${catDetails.name}</h2>
      <p>${catDetails.description}</p>
      <p><span>Temperament: </span>${catDetails.temperament}</p>`;
}
