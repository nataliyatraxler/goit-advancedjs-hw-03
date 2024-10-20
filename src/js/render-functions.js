export function displayImages(images) {
  const gallery = document.getElementById('image-gallery');
  gallery.innerHTML = ''; // Очищення попередніх зображень

  images.forEach(image => {
    const imgElement = document.createElement('a');
    imgElement.href = image.largeImageURL; // Для SimpleLightbox
    imgElement.classList.add('gallery-item');

    imgElement.innerHTML = `
      <img src="${image.webformatURL}" alt="${image.tags}">
      <div class="image-info">
        <p><strong>Downloads:</strong> ${image.downloads}</p>
        <p><strong>Likes:</strong> ${image.likes}</p>
        <p><strong>Views:</strong> ${image.views}</p>
        
      </div>
    `;

    gallery.appendChild(imgElement); // Додаємо новий елемент у галерею
  });
}

export function clearGallery() {
  const gallery = document.getElementById('image-gallery');
  gallery.innerHTML = ''; // Очищення вмісту галереї ..
}
