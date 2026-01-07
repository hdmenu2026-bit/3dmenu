export async function onRequest({ env, params }) {
  const key = params.path.join("/");

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
