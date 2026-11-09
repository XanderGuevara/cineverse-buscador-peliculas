# 🎬 CineVerse — Buscador de películas

Proyecto individual para Kodigo. Aplicación web semántica, adaptable a móviles y con animaciones, hecha con **HTML5, CSS3 y JavaScript puro**.

## Funciones
- Buscar películas por título usando **fetch()** y **async/await**.
- Leer JSON de la API pública de **TMDB**.
- Mostrar título, año, sinopsis y póster.
- Actualizar el DOM sin recargar la página.
- Informar cuando no hay resultados, cuando la clave no es válida y cuando hay errores de conexión.
- Diseño responsive con animaciones y soporte para movimiento reducido.

## Cómo usar
1. Abre `index.html` con Live Server en VS Code o visita GitHub Pages cuando esté habilitado.
2. Abre **Configurar mi clave gratuita de TMDB**.
3. Introduce tu **API Key (v3)** de https://www.themoviedb.org/settings/api.
4. Busca por título, por ejemplo **Batman**.

**Seguridad:** no hay ninguna API Key incluida en el repositorio. Se solicita al usuario y se conserva solo en `sessionStorage` de su pestaña; se elimina al terminar la sesión. En una aplicación de producción conviene usar un backend que proteja las credenciales. El tráfico a TMDB debe hacerse mediante HTTPS.

## Estructura
```
index.html
css/styles.css
js/app.js
README.md
```

## Tecnologías
HTML semántico, CSS, JavaScript, Fetch API, JSON, DOM y TMDB.

## Créditos
Este producto usa la API de TMDB, pero TMDB no lo respalda ni certifica.
