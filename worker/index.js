// Este Worker consulta TMDB sin mostrar la clave al navegador.
const ALLOWED_ORIGIN = 'https://xanderguevara.github.io';
function headers(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  };
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const cors = headers(origin);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'GET') return Response.json({ error: 'Método no permitido' }, { status: 405, headers: cors });
    const url = new URL(request.url);
    if (url.pathname !== '/search') return Response.json({ error: 'Ruta no encontrada' }, { status: 404, headers: cors });
    const query = (url.searchParams.get('query') || '').trim();
    if (query.length < 2 || query.length > 100) return Response.json({ error: 'Escribe entre 2 y 100 caracteres.' }, { status: 400, headers: cors });
    if (!env.TMDB_API_KEY) return Response.json({ error: 'Falta configurar TMDB_API_KEY en Cloudflare.' }, { status: 500, headers: cors });
    try {
      const target = new URL('https://api.themoviedb.org/3/search/movie');
      target.searchParams.set('query', query);
      target.searchParams.set('language', 'es-ES');
      target.searchParams.set('include_adult', 'false');
      target.searchParams.set('api_key', env.TMDB_API_KEY);
      const response = await fetch(target);
      if (!response.ok) return Response.json({ error: 'TMDB no respondió correctamente (' + response.status + ').' }, { status: 502, headers: cors });
      const data = await response.json();
      return Response.json({ results: data.results || [] }, { headers: cors });
    } catch {
      return Response.json({ error: 'No se pudo conectar con TMDB.' }, { status: 502, headers: cors });
    }
  }
};
