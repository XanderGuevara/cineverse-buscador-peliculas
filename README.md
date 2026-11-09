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
2. Busca por título, por ejemplo **Batman**. No necesitas introducir ninguna clave: el frontend consulta un Cloudflare Worker que se comunica con TMDB.

**Seguridad:** la clave de TMDB se guarda como secreto `TMDB_API_KEY` en Cloudflare Workers. Nunca se incluye en el repositorio ni en el navegador. El código del intermediario está en `worker/index.js`.

## Estructura
```
index.html
css/styles.css
js/app.js
worker/index.js
README.md
```

## Tecnologías
HTML semántico, CSS, JavaScript, Fetch API, JSON, DOM y TMDB.

## Créditos
Este producto usa la API de TMDB, pero TMDB no lo respalda ni certifica.
