import { getUserCardDOM } from '../templates/photographer.js';

async function getPhotographers() {
  const response = await fetch("data/photographers.json");

  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }

  return await response.json();
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const userCardDOM = getUserCardDOM(photographer);
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  await displayData(photographers);
}

init();
