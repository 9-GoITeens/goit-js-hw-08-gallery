import galleryItems from './app.js'; //2) імпорт елментів
console.log(galleryItems);

const refs = {
    //3) ссилки на елемент
    galleryListRef: document.querySelector('.js-gallery'),
    backdropRef: document.querySelector('.js-lightbox'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    modal: document.querySelector('.lightbox__content'),
    lightboxImg: document.querySelector('.lightbox__image'),
    btnModalClose: document.querySelector('[data-action="close-lightbox"]'),
};

function createGallery(gallery) {
    //4) створення елемента
    return gallery
        .map(({ preview, original, description }, index) => {
            return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>`;
        })
        .join('');
}

const imgGallery = createGallery(galleryItems); //5) рендер
refs.galleryListRef.insertAdjacentHTML('beforeend', imgGallery);

// 6) вішаєм слухача
refs.galleryListRef.addEventListener('click', onClickGalleryItem);
refs.btnModalClose.addEventListener('click', onCloseButtonClick);

//7) створюєм колбекфункції
function onClickGalleryItem(event) {
    event.preventDefault(); //якщо подія не обробляється явно, її дія по замовчуванню не повинна виконуватися

    const target = event.target;
    if (target.nodeName !== 'IMG') {
        //8 умова якщо клік не по картинці, тоді код не виконується
        return;
    }

    if (target.nodeName === 'IMG') {
        refs.backdropRef.classList.add('is-open');
        refs.lightboxImg.src = target.dataset.source;
        refs.lightboxImg.alt = target.alt;
        refs.lightboxImg.dataset.index = target.dataset.index;
    }

    console.log(event.target);
}

function onClickCloseModal() {
    //9) щоб зняти клас is-open
    refs.backdropRef.classList.remove('is-open');
}

function onCloseButtonClick(event) {
    event.preventDefault();
    onClickCloseModal(); // виклик функції onClickCloseModal

    refs.lightboxImg.src = '';
    refs.lightboxImg.alt = '';
    console.log(event);
}
