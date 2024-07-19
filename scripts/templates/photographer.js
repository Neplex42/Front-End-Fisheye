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
  link.setAttribute("aria-label", `Voir la page de ${name}`);
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

export function getPhotographerHeader(data) {
  const { city, country, id, name, portrait, price, tagline } = data;
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

export function mediaFactory(data, photographerName) {
  const { date, id, image, video, likes, photographerId, price, title } = data

  // Define media type
  const mediaType = video ? video : image

  // Format media path name to match folder name
  const mediaPathNameFormatted = photographerName.split(' ')[0]

  // Create media url
  const mediaUrl = `assets/images/${mediaPathNameFormatted}/${mediaType}`

  // Create DOM elements
  const mediaCard = document.createElement('article')
  const mediaTitle = document.createElement('h2')
  const mediaLikes = document.createElement('p')
  const likeIcon = document.createElement('img')
  const likeContainer = document.createElement('div')
  const descriptionContainer = document.createElement('div')

  // check if media is a video
  let media
  if (video) {
    media = document.createElement('video')
    media.setAttribute('class', 'media_video')
    media.setAttribute('controls', '')
  } else {
    media = document.createElement('img')
    media.setAttribute('class', 'media_img')
  }

  // Img or video
  media.setAttribute('tabindex', '0')
  media.setAttribute('src', mediaUrl)
  media.setAttribute('alt', title)
  media.setAttribute('aria-label', title)
  media.setAttribute('role', 'link')

  // Article
  mediaCard.setAttribute('class', 'media_card')

  // Title
  mediaTitle.textContent = title
  mediaTitle.setAttribute('class', 'media_title')

  // Likes
  mediaLikes.textContent = likes
  mediaLikes.setAttribute('class', 'media_likes')

  // Like icon
  likeIcon.setAttribute('src', 'assets/icons/like.svg')
  likeIcon.setAttribute('alt', 'likes')
  likeIcon.setAttribute('class', 'media_like_icon')

  // Like container
  likeContainer.setAttribute('class', 'media_like_container')

  // Description container
  descriptionContainer.setAttribute('class', 'media_description_container')

  // Append elements
  likeContainer.appendChild(mediaLikes)
  likeContainer.appendChild(likeIcon)
  descriptionContainer.appendChild(mediaTitle)
  descriptionContainer.appendChild(likeContainer)
  mediaCard.appendChild(media)
  mediaCard.appendChild(descriptionContainer)

  return mediaCard
}