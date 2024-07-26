import { displayModal } from '../utils/contactForm.js'

export function getUserCardDOM(data) {
  const { city, country, id, name, portrait, price, tagline } = data;
  const picture = `assets/images/ID_pic/${portrait}`;

  const article = document.createElement('article');
  const photographerImg = document.createElement('img');
  const nameH2 = document.createElement('h2');
  const cityH3 = document.createElement('h3');
  const taglineP = document.createElement('p');
  const priceP = document.createElement('p');
  const link = document.createElement('a');

  link.setAttribute("href", `photographer.html?id=${id}`);
  link.setAttribute("class", "photographer_link");
  link.setAttribute("tabindex", "0");
  link.setAttribute("aria-label", `${name}`);
  link.setAttribute("role", "link");

  article.setAttribute("class", "photographer_card");
  article.setAttribute("id", id);

  photographerImg.setAttribute("src", picture);
  photographerImg.setAttribute("alt", name);
  photographerImg.setAttribute("class", "photographer_img");

  nameH2.textContent = name;
  nameH2.setAttribute("class", "photographer_name");

  cityH3.textContent = `${city}, ${country}`;
  cityH3.setAttribute("class", "photographer_city");

  taglineP.textContent = tagline;
  taglineP.setAttribute("class", "photographer_tagline");

  priceP.textContent = `${price}€/jour`;
  priceP.setAttribute("class", "photographer_price");

  const infoContainer = document.createElement('div');
  infoContainer.setAttribute("class", "photographer_info");
  infoContainer.setAttribute("aria-hidden", "true");

  infoContainer.appendChild(cityH3);
  infoContainer.appendChild(taglineP);
  infoContainer.appendChild(priceP);

  link.appendChild(photographerImg);
  link.appendChild(nameH2);
  article.appendChild(link);
  article.appendChild(infoContainer);

  return article;
}

export function getPhotographerLikes(mediaFromPhotographer) {
  let likeCount = 0

  mediaFromPhotographer.forEach((media) => (likeCount += media.likes))

  return likeCount
}

export function convertToHTML(string) {
  const parser = new DOMParser()
  const html = parser.parseFromString(string, 'text/html')
  return html.body.firstChild
}

export function createLikesHTML(likes) {
  const likesContainer = `
        <div class='likes_container'>
          <p class='total_photographer_likes'>${likes}</p>
        </div>   
    `
  return convertToHTML(likesContainer)
}

export function createPriceHTML(price) {
  const priceContainer = `
      <div class='price_container'>
        <p>${price}€ / jour</p>
      </div>
    `

  return convertToHTML(priceContainer)
}

export function getPhotographerHeader(data) {
  const { city, country, name, portrait, tagline } = data;
  const picture = `assets/images/ID_pic/${portrait}`;

  const photographerContainer = document.createElement('section')
  const containerColInfo = document.createElement('div')
  const containerColBtn = document.createElement('div')
  const containerColImg = document.createElement('div')
  const nameH1 = document.createElement('h1')
  const cityH2 = document.createElement('h2')
  const taglineP = document.createElement('p')
  const contactBtn = document.createElement('button')
  const photographerImg = document.createElement('img')

  // Container
  photographerContainer.setAttribute('class', 'photographer_container')

  // Container col
  containerColInfo.setAttribute('class', 'photographer_container_col-info')
  containerColBtn.setAttribute('class', 'photographer_container_col-btn')
  containerColImg.setAttribute('class', 'photographer_container_col-img')

  nameH1.textContent = name
  nameH1.setAttribute('class', 'photographer_name')

  cityH2.textContent = `${city}, ${country}`
  cityH2.setAttribute('class', 'photographer_city')

  taglineP.textContent = tagline
  taglineP.setAttribute('class', 'photographer_tagline')

  contactBtn.textContent = 'Contactez-moi'
  contactBtn.setAttribute('class', 'contact_button')
  contactBtn.setAttribute('tabindex', '0')
  contactBtn.setAttribute('aria-label', `Contactez-moi`)
  contactBtn.setAttribute('role', 'button')
  contactBtn.addEventListener('click', () => displayModal(name))

  photographerImg.setAttribute('src', picture)
  photographerImg.setAttribute('alt', name)
  photographerImg.setAttribute('class', 'photographer_img')
  photographerImg.setAttribute('tabindex', '0')

  // Append elements
  containerColInfo.appendChild(nameH1)
  containerColInfo.appendChild(cityH2)
  containerColInfo.appendChild(taglineP)

  containerColBtn.appendChild(contactBtn)

  containerColImg.appendChild(photographerImg)

  photographerContainer.appendChild(containerColInfo)
  photographerContainer.appendChild(containerColBtn)
  photographerContainer.appendChild(containerColImg)

  return photographerContainer
}
