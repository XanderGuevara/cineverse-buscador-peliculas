// Tomamos los elementos que necesitamos de la página.
const form = document.querySelector('#search-form');
const input = document.querySelector('#movie-input');
const button = document.querySelector('#search-button');
const results = document.querySelector('#results');
const status = document.querySelector('#status');
const count = document.querySelector('#results-count');
const apiForm = document.querySelector('#api-form');
const apiInput = document.querySelector('#api-key');
const apiSettings = document.querySelector('#api-settings');

document.querySelector('#year').textContent = new Date().getFullYear();

// La clave vive solo en la sesión, nunca en el repositorio.
apiForm.addEventListener('submit', event => {
  event.preventDefault();
  const key = apiInput.value.trim();
  if (!key) return;
  sessionStorage.setItem('cineverse_tmdb_key', key);
  apiInput.value = '';
  apiSettings.open = false;
  showMessage('Clave configurada. ¡Ya puedes buscar películas!');
});

function showMessage(message, error = false) {
  status.textContent = message;
  status.classList.toggle('error', error);
}

// Cada película se convierte en una tarjeta HTML.
function createMovieCard(movie) {
  const card = document.createElement('article');
  card.className = 'movie-card';
  const poster = document.createElement('div');
  poster.className = 'poster-wrap';
  if (movie.poster_path) {
    const image = document.createElement('img');
    image.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    image.alt = 'Póster de ' + movie.title;
    image.loading = 'lazy';
    poster.append(image);
  } else {
    const fallback = document.createElement('span');
    fallback.className = 'poster-placeholder';
    fallback.textContent = '🎬';
    fallback.setAttribute('aria-hidden', 'true');
    poster.append(fallback);
  }
  const info = document.createElement('div');
  info.className = 'movie-info';
  const year = document.createElement('span');
  year.className = 'movie-year';
  year.textContent = movie.release_date ? movie.release_date.slice(0, 4) : 'Año no disponible';
  const title = document.createElement('h3');
  title.textContent = movie.title || 'Sin título';
  const description = document.createElement('p');
  description.textContent = movie.overview || 'Sinopsis no disponible.';
  info.append(year, title, description);
  card.append(poster, info);
  return card;
}

// fetch pide los datos; el DOM muestra los resultados sin recargar.
async function searchMovies(query) {
  const key = sessionStorage.getItem('cineverse_tmdb_key');
  if (!key) {
    apiSettings.open = true;
    showMessage('Primero configura tu API Key (v3) de TMDB en el apartado superior.', true);
    apiInput.focus();
    return;
  }

  button.disabled = true;
  results.replaceChildren();
  count.textContent = '';
  status.classList.remove('error');
  status.replaceChildren();
  const spinner = document.createElement('span');
  spinner.className = 'spinner';
  spinner.setAttribute('aria-hidden', 'true');
  status.append(spinner, document.createTextNode('Buscando películas...'));

  try {
    const url = new URL('https://api.themoviedb.org/3/search/movie');
    url.searchParams.set('api_key', key);
    url.searchParams.set('query', query);
    url.searchParams.set('language', 'es-ES');
    url.searchParams.set('include_adult', 'false');

    const response = await fetch(url);
    if (response.status === 401) throw new Error('Clave de TMDB inválida. Configúrala nuevamente.');
    if (!response.ok) throw new Error('No pudimos consultar TMDB (HTTP ' + response.status + ').');

    const data = await response.json();
    if (!Array.isArray(data.results)) throw new Error('La API devolvió una respuesta inesperada.');
    if (data.results.length === 0) {
      showMessage('Película no encontrada. Prueba con otro título.');
      return;
    }

    const fragment = document.createDocumentFragment();
    data.results.forEach(movie => fragment.append(createMovieCard(movie)));
    results.append(fragment);
    count.textContent = data.results.length + ' resultado(s)';
    showMessage('');
  } catch (error) {
    console.error('Error de búsqueda:', error);
    showMessage(error instanceof TypeError
      ? 'Error de conexión. Revisa tu internet e inténtalo otra vez.'
      : error.message, true);
  } finally {
    button.disabled = false;
  }
}

// Evitamos la recarga al enviar el formulario.
form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();
  if (query.length < 2) {
    showMessage('Escribe al menos dos letras para buscar.', true);
    return;
  }
  searchMovies(query);
});

document.querySelectorAll('.suggestion').forEach(suggestion => {
  suggestion.addEventListener('click', () => {
    input.value = suggestion.dataset.query;
    form.requestSubmit();
  });
});
