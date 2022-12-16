import { galleryItems } from './gallery-items.js';
// Change code below this line


function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) =>
    `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`).join('');  
}

function onGalleryClick(evt) {

  evt.preventDefault();
  
  const isGalleryImg = evt.target.classList.contains('gallery__image');
  if (!isGalleryImg) {
    return;
  }

  const galleryImg = evt.target;

  showModalOriginalImage(galleryImg.dataset.source);
}

function showModalOriginalImage(source) {

  const onKeyDown = (evt) => {
    if (evt.code === 'Escape') {
      instance.close();
    }
  }

  const opts = {
  	closable: true,
    onShow:  (instance) => { document.addEventListener('keydown',    onKeyDown); },
  	onClose: (instance) => { document.removeEventListener('keydown', onKeyDown); },
  };

  const instance = basicLightbox.create(`<img src="${source}" width="800" height="600">`, opts);

  instance.show();  
}

function doTask01() {

  const gallery = document.querySelector('.gallery');
 
  if (!gallery) {
    console.log('Error: invalid markup!');
    return;
  }

  gallery.innerHTML = createGalleryMarkup(galleryItems); 

  gallery.addEventListener('click', onGalleryClick);
}

doTask01();
