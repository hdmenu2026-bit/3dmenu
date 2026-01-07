export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Expected: /cdn/filename.glb
  if (!url.pathname.startsWith("/cdn/")) {
    return new Response("Not found", { status: 404 });
  }

  const key = url.pathname.substring(5); // remove "/cdn/"

  if (!key || key.includes("..")) {
    return new Response("Bad request", { status: 400 });
  }

  if (!env.MODELS) {
    return new Response("R2 binding missing", { status: 500 });
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
