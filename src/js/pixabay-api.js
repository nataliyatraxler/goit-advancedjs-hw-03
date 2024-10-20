
const API_KEY = '46595467-38d51347a919535f7c3759bfb';

export function fetchImages(query) {
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(URL)
    .then(response => response.json())
    .then(data => data.hits)
    .catch(error => {
      console.error('Error:', error);
      return [];
    });
}
