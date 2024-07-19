import { getPhotographerHeader, mediaFactory } from '../templates/photographer.js';

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

async function displayMedia(media, photographerName) {
  const mainSection = document.querySelector('main')
  const mediaContainer = document.createElement('section')
  mediaContainer.setAttribute('class', 'media_container')
  mainSection.appendChild(mediaContainer)

  media.forEach((media) => {
    const mediaCard = mediaFactory(media, photographerName)
    mediaContainer.appendChild(mediaCard)
  })
}

async function getPhotographerAndMedia(paramsId) {
  const { photographers, media } = await fetchPhotographerAndMedia();

  // get photographer from the id in the url
  const photographer = photographers.find(
    (photographer) => photographer.id === paramsId
  );

  // display photographer header
  if (photographer) {
    await displayPhotographer(photographer);
  } else {
    console.error('Photographer not found');
  }

  const mediaFromPhotographer = media.filter(
    (media) => media.photographerId === paramsId
  );

  // display media from the photographer
  await displayMedia(mediaFromPhotographer, photographer.name)
}

getPhotographerAndMedia(getParamsId());
