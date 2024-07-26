import { getPhotographerHeader, createLikesHTML, createPriceHTML, getPhotographerLikes, getUserCardDOM  } from '../templates/photographer.js';
import { mediaFactory } from '../templates/media.js';

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
    const mediaModel = mediaFactory(media, photographerName)
    const mediaCard = mediaModel.getMediaCard()
    mediaContainer.appendChild(mediaCard)
  })
}

async function displayLikes(mediaFromThePhotographer, photographer) {
  const likes = getPhotographerLikes(mediaFromThePhotographer)
  const likesHTML = createLikesHTML(likes)

  document
    .querySelector('.likes_and_price_container')
    .appendChild(likesHTML)
}

async function displayPrice(photographer) {
  const priceHTML = createPriceHTML(photographer.price)

  document
    .querySelector('.likes_and_price_container')
    .appendChild(priceHTML)
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

  await displayMedia(mediaFromPhotographer, photographer.name)
  await displayLikes(mediaFromPhotographer, photographer)
  await displayPrice(photographer)
}

getPhotographerAndMedia(getParamsId());
