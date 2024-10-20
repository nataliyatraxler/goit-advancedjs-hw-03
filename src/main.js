import { fetchImages } from './js/pixabay-api.js'; // Import function for fetching images
import { displayImages, clearGallery } from './js/render-functions.js'; // Import functions for rendering and clearing gallery
import iziToast from 'izitoast'; // Import iziToast for notifications
import 'izitoast/dist/css/iziToast.min.css'; // Import styles for iziToast
import SimpleLightbox from 'simplelightbox';

// Create a loading indicator
const loader = document.createElement('div');
loader.classList.add('loader');
loader.innerHTML = '<div class="lds-dual-ring"></div>';
document.body.appendChild(loader);
loader.style.display = 'none';

document.addEventListener('DOMContentLoaded', function () {
  let lightbox;

  // Handle the submit event instead of click
  const form = document.querySelector('.search-container form');
  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const queryInput = document.getElementById('search-input');
    const query = queryInput.value.trim(); // Trim leading and trailing spaces

    if (query === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid search query!',
      });
      return;
    }

    clearGallery(); // Clear the gallery before the new search
    loader.style.display = 'block'; // Show the loading indicator

    try {
      const images = await fetchImages(query);

      if (images.length > 0) {
        displayImages(images); // Display images

        // Initialize or refresh SimpleLightbox
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
      loader.style.display = 'none'; // Hide the loading indicator after completion
      queryInput.value = ''; // Clear the search input field
    }
  });
});
