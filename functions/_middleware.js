export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);

  // ONLY handle /cdn/*
  if (!url.pathname.startsWith("/cdn/")) {
    return next();
  }

  const key = url.pathname.slice(5); // remove "/cdn/"

  if (!key) {
    return new Response("Bad request", { status: 400 });
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
