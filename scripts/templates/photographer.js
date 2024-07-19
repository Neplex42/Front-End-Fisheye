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

        // Set link attributes for keyboard accessibility and ARIA roles
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("class", "photographer_link");
        link.setAttribute("tabindex", "0");
        link.setAttribute("aria-labelledby", `photographer-name-${id} photographer-info-${id}`);
        link.setAttribute("role", "link");

        // Set article attributes
        article.setAttribute("class", "photographer_card");
        article.setAttribute("id", `photographer-${id}`);

        // Set image attributes
        photographerImg.setAttribute("src", picture);
        photographerImg.setAttribute("alt", `Portrait de ${name}`);
        photographerImg.setAttribute("class", "photographer_img");

        // Set name attributes
        nameH2.textContent = name;
        nameH2.setAttribute("id", `photographer-name-${id}`);
        nameH2.setAttribute("class", "photographer_name");

        // Set city attributes
        cityH3.textContent = `${city}, ${country}`;
        cityH3.setAttribute("class", "photographer_city");

        // Set tagline attributes
        taglineP.textContent = tagline;
        taglineP.setAttribute("class", "photographer_tagline");

        // Set price attributes
        priceP.textContent = `${price}€/jour`;
        priceP.setAttribute("class", "photographer_price");

        // Create a container for additional information
        const infoContainer = document.createElement('div');
        infoContainer.setAttribute("id", `photographer-info-${id}`);
        infoContainer.setAttribute("class", "photographer_info");
        infoContainer.setAttribute("aria-hidden", "true");

        // Append additional information to the container
        infoContainer.appendChild(cityH3);
        infoContainer.appendChild(taglineP);
        infoContainer.appendChild(priceP);

        // Append elements to the link and article
        link.appendChild(photographerImg);
        link.appendChild(nameH2);
        article.appendChild(link);
        article.appendChild(infoContainer);

        return article;
    }

    return { getUserCardDOM };
}
