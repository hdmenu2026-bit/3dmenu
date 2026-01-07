export async function onRequest({ request, env }) {
  const url = new URL(request.url);

  // Only proxy model files
  if (!url.pathname.startsWith("/cdn/")) {
    return fetch(request);
  }

  const key = url.pathname.replace("/cdn/", "");

  const object = await env.MODELS.get(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": "model/gltf-binary",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
