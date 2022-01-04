const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let photoCount = 0;
let totalImages = 0;

const count = 30;
const api_key = 'idW8bl4BY6hbcySNFZ10ij7KP5rtrTb9Z6T8jVxKr-w';
const url = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${count}`;

function loadImg() {
  photoCount++;
  if (photoCount === totalImages) {
    ready = true;
    photoCount = 0;
    loader.hidden = true;
  }
}

// Creating elements for links and photos, Add to DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photosArray.forEach(photo => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
    });
    img.addEventListener('load', loadImg);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash
async function getPhotos() {
  try {
    const response = await fetch(url);
    photosArray = await response.json();
    totalImages = photosArray.length;
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

getPhotos();
