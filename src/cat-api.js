import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_H9zjuBtgDPBOqNG7j2YEvvObe347ExaA3pBaeGtfSYMweKU4e6uFgDOTsgB2Rs6o';

export function fetchBreeds(breeds) {
  const url = 'https://api.thecatapi.com/v1/breeds';
  return fetch(url).then(res => res.json());
}

export function fetchCatByBreed(breedId) {
  const IMG_URL = 'https://api.thecatapi.com/v1/images/search';
  const PARAMS = `?breed_ids=${breedId}`;

  const infoUrl = `${IMG_URL}${PARAMS}`;

  return fetch(infoUrl).then(res => res.json());
}
