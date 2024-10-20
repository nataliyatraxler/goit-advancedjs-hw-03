import { fetchImages } from './js/pixabay-api.js'; // Імпорт функції для запиту
import { displayImages, clearGallery } from './js/render-functions.js'; // Імпорт функцій для рендерингу та очищення галереї
import iziToast from 'izitoast'; // Імпорт iziToast для повідомлень
import 'izitoast/dist/css/iziToast.min.css'; // Підключення стилів iziToast
import SimpleLightbox from 'simplelightbox';

// Індикатор завантаження
const loader = document.createElement('div');
loader.classList.add('loader');
loader.innerHTML = '<div class="lds-dual-ring"></div>';
document.body.appendChild(loader);
loader.style.display = 'none';

document.addEventListener('DOMContentLoaded', function () {
  let lightbox;

  document.getElementById('search-button').addEventListener('click', async function () {
    const queryInput = document.getElementById('search-input');
    const query = queryInput.value;

    if (query === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query!',
      });
      return;
    }

    clearGallery(); // Очищаємо галерею перед новим пошуком
    loader.style.display = 'block'; // Показуємо індикатор завантаження

    try {
      const images = await fetchImages(query);

      if (images.length > 0) {
        displayImages(images); // Відображаємо картинки

        // Ініціалізуємо або оновлюємо SimpleLightbox
        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
          });
        }
      } else {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, no images matching your search query. Please try again!',
        });
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
      console.error('Error:', error);
    } finally {
      loader.style.display = 'none'; // Приховуємо індикатор після завершення завантаження
      queryInput.value = ''; // Очищаємо рядок пошуку
    }
  });
});
