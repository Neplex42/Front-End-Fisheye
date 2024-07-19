function photographerTemplate(data) {
  const { city, country, id, name, portrait, price, tagline } = data;
  const picture = `assets/images/ID_pic/${portrait}`;

  function getUserCardDOM() {
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
    photographerImg.setAttribute("alt", `Portrait de ${name}`);
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

  return { getUserCardDOM };
}
