export async function onRequest({ request, env }) {
  const url = new URL(request.url);

  // Only handle /cdn/*
  const key = url.pathname.replace("/cdn/", "");

  if (!key || key === url.pathname) {
    return new Response("Not found", { status: 404 });
  }

  const object = await env.MODELS.get(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": "model/gltf-binary",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Cross-Origin-Resource-Policy": "cross-origin"
    }
  });
}
