import { getPhotographerHeader } from '../templates/photographer.js';

async function fetchPhotographerAndMedia() {
  const response = await fetch('data/photographers.json');

  if (!response.ok) {
    throw new Error('HTTP error ' + response.status);
  }

  return await response.json();
}

const getParamsId = () => {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('id'));
}

async function displayPhotographer(photographer) {
  const photographerHeaderSection = document.querySelector('.photograph-header');

  const photographerHeader = getPhotographerHeader(photographer);
  photographerHeaderSection.appendChild(photographerHeader);
}

async function getPhotographerAndMedia(paramsId) {
  const { photographers, media } = await fetchPhotographerAndMedia();

  const photographer = photographers.find(
    (photographer) => photographer.id === paramsId
  );

  if (photographer) {
    await displayPhotographer(photographer);
  } else {
    console.error('Photographer not found');
  }

  const mediaFromPhotographer = media.filter(
    (media) => media.photographerId === paramsId
  );

  // Handle media display here if needed
}

getPhotographerAndMedia(getParamsId());
