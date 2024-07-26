import { focusTrapHandler } from '../utils/contactForm.js'

export function mediaFactory(data, photographerName) {
  const { image, video, likes, title } = data

  // Define media type
  const mediaType = video ? video : image

  // Format media path name to match folder name
  const mediaPathNameFormatted = photographerName.split(' ')[0]

  // Create media url
  let mediaUrl = `assets/images/${mediaPathNameFormatted}/${mediaType}`

  function getMediaCard() {
    // Create DOM elements
    const mediaCard = document.createElement('article')
    const mediaTitle = document.createElement('h2')
    const mediaLikes = document.createElement('p')
    const likeIcon = document.createElement('img')
    const likeContainer = document.createElement('div')
    const descriptionContainer = document.createElement('div')
    const mediaContainer = document.createElement('div')

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

    // Add event listener to open lightbox
    media.addEventListener('click', () => openLightbox(mediaUrl, title))
    media.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') openLightbox(mediaUrl, title)
    })

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
    likeIcon.setAttribute('tabindex', '0')
    likeIcon.setAttribute('aria-label', 'Ajouter un like')

    // Like container
    likeContainer.setAttribute('class', 'media_like_container')

    // Description container
    descriptionContainer.setAttribute('class', 'media_description_container')

    // Media container
    mediaContainer.setAttribute('class', 'media_card_container')

    // Append elements
    likeContainer.appendChild(mediaLikes)
    likeContainer.appendChild(likeIcon)
    descriptionContainer.appendChild(mediaTitle)
    descriptionContainer.appendChild(likeContainer)
    mediaContainer.appendChild(media)
    mediaCard.appendChild(mediaContainer)
    mediaCard.appendChild(descriptionContainer)

    return mediaCard
  }

  function closeWithEscapeKey(e) {
    if (e.key === 'Escape') closeLightbox(e)
  }

  function closeLightbox() {
    // remove lightbox
    const lightbox = document.querySelector('.lightbox')

    //animate lightbox before removing
    lightbox.classList.add('lightbox_close')

    setTimeout(() => {
      // remove event listeners
      document.removeEventListener('keyup', closeWithEscapeKey)
      lightbox.remove()
    }, 300)

    // make body scrollable
    document.body.style.overflow = 'visible'

    // body aria-hidden false
    document.body.setAttribute('aria-hidden', 'false')
  }

  function createLightboxHTML(title, mediaUrl) {
    // Create DOM elements
    const lightbox = document.createElement('div')
    lightbox.setAttribute('class', 'lightbox')
    lightbox.setAttribute('role', 'dialog')
    lightbox.setAttribute('aria-label', 'image gros plan')
    lightbox.setAttribute('aria-hidden', 'false')

    const lightboxContainer = document.createElement('div')
    lightboxContainer.setAttribute('class', 'lightbox_container')

    const btnClose = document.createElement('button')
    btnClose.setAttribute('role', 'button')
    btnClose.setAttribute('class', 'lightbox_btn_close')
    btnClose.setAttribute('aria-label', 'Fermer la popup')
    btnClose.setAttribute('tabindex', '0')
    const closeIcon = document.createElement('img')
    closeIcon.setAttribute('src', 'assets/icons/close-red.svg')
    closeIcon.setAttribute('alt', '')
    btnClose.appendChild(closeIcon)

    const btnPrev = document.createElement('button')
    btnPrev.setAttribute('role', 'link')
    btnPrev.setAttribute('class', 'lightbox_btn lightbox_btn_prev')
    btnPrev.setAttribute('aria-label', 'Image précédente')
    btnPrev.setAttribute('tabindex', '0')
    btnPrev.textContent = 'Précédent'

    const btnNext = document.createElement('button')
    btnNext.setAttribute('role', 'link')
    btnNext.setAttribute('class', 'lightbox_btn lightbox_btn_next')
    btnNext.setAttribute('aria-label', 'Image suivante')
    btnNext.setAttribute('tabindex', '0')
    btnNext.textContent = 'Suivant'

    let media
    if (video) {
      media = document.createElement('video')
      media.setAttribute('class', 'lightbox_media')
      media.setAttribute('controls', '')
      media.setAttribute('autoplay', '')
      media.setAttribute('muted', '')
      media.setAttribute('title', title)
      media.src = mediaUrl
    } else {
      media = document.createElement('img')
      media.setAttribute('class', 'lightbox_media')
      media.setAttribute('role', 'img')
      media.setAttribute('src', mediaUrl)
      media.setAttribute('alt', title)
    }

    const mediaTitle = document.createElement('h2')
    mediaTitle.setAttribute('role', 'heading')
    mediaTitle.setAttribute('class', 'lightbox_title')
    mediaTitle.textContent = title

    // Append elements
    lightboxContainer.appendChild(btnPrev)
    lightboxContainer.appendChild(btnNext)
    lightboxContainer.appendChild(media)
    lightboxContainer.appendChild(mediaTitle)
    lightboxContainer.appendChild(btnClose)
    lightbox.appendChild(lightboxContainer)

    return lightbox
  }

  function prevNextMedia(direction) {
    const mediaContainer = document.querySelector('.media_container');
    const lightbox = document.querySelector('.lightbox');
    const lightboxMedia = lightbox.querySelector('.lightbox_media');
    const lightboxTitle = lightbox.querySelector('.lightbox_title');
    const mediaList = mediaContainer.querySelectorAll(
        '.media_card .media_card_container img,.media_card .media_card_container video'
    );

    // Get current media index
    const currentMediaIndex = Array.from(mediaList).findIndex(
        (media) => media.src === lightboxMedia.src
    );

    let selectedDirectionMedia;

    switch (direction) {
      case 'prev':
        // Get previous media, if first media, get last media
        selectedDirectionMedia =
            currentMediaIndex === 0
                ? mediaList[mediaList.length - 1]
                : mediaList[currentMediaIndex - 1];
        break;
      case 'next':
        // Get next media, if last media, get first media
        selectedDirectionMedia =
            currentMediaIndex === mediaList.length - 1
                ? mediaList[0]
                : mediaList[currentMediaIndex + 1];
        break;
    }

    // get media title from alt or aria-label
    const mediaTitle =
        selectedDirectionMedia.getAttribute('aria-label') ||
        selectedDirectionMedia.alt;

    // Check if media is a video
    const isVideo = selectedDirectionMedia.classList.contains('media_video');

    // Remove the current media element
    lightboxMedia.remove();

    // Create the new media element
    let newMediaElement;
    if (isVideo) {
      newMediaElement = document.createElement('video');
      newMediaElement.classList.add('lightbox_media');
      newMediaElement.setAttribute('controls', '');
      newMediaElement.setAttribute('autoplay', '');
      newMediaElement.setAttribute('muted', '');
      newMediaElement.src = selectedDirectionMedia.src;
      newMediaElement.title = mediaTitle;
    } else {
      newMediaElement = document.createElement('img');
      newMediaElement.classList.add('lightbox_media');
      newMediaElement.setAttribute('role', 'img');
      newMediaElement.src = selectedDirectionMedia.src;
      newMediaElement.alt = selectedDirectionMedia.alt;
    }

    // Add fade-in class
    newMediaElement.classList.add('fadeIn');

    // Append the new media element to the lightbox container
    const lightboxContainer = lightbox.querySelector('.lightbox_container');
    lightboxContainer.prepend(newMediaElement);

    // Update lightbox title
    lightboxTitle.textContent = mediaTitle;

    // Append the title to the container if it's not already there
    if (!lightboxContainer.contains(lightboxTitle)) {
      lightboxContainer.appendChild(lightboxTitle);
    }
  }

  function openLightbox(mediaUrl, title) {
    const lightbox = createLightboxHTML(title, mediaUrl)

    // make body not scrollable
    document.body.style.overflow = 'hidden'

    // body aria-hidden true
    document.body.setAttribute('aria-hidden', 'true')

    // insert lightbox to body
    document.body.appendChild(lightbox)

    // Get Lightbox elements
    const lightboxModal = document.querySelector('.lightbox')
    const btnClose = document.querySelector('.lightbox_btn_close')
    const btnPrev = document.querySelector('.lightbox_btn_prev')
    const btnNext = document.querySelector('.lightbox_btn_next')

    // Add event listeners
    btnPrev.addEventListener('click', () => prevNextMedia('prev'))
    btnNext.addEventListener('click', () => prevNextMedia('next'))
    btnClose.addEventListener('click', () => closeLightbox())

    // close modal on escape key
    document.addEventListener('keyup', closeWithEscapeKey)

    // handle media change with arrow keys
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevNextMedia('prev')
      if (e.key === 'ArrowRight') prevNextMedia('next')
    })

    // Lightbox focus trap
    const focusableElementsString = 'button, video'
    const focusableElements = lightboxModal.querySelectorAll(focusableElementsString)
    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement = focusableElements[focusableElements.length - 1]
    btnNext.focus()

    lightboxModal.addEventListener('keydown', (e) =>
        focusTrapHandler(e, firstFocusableElement, lastFocusableElement)
    )
  }

  return { getMediaCard }
}
