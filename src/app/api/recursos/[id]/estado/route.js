// PATCH para cambiar estado del recurso
export async function PATCH(_req, { params }) {
  const { id } = params;

  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/recursos/${id}/estado`, {
      method: "PATCH",
    });

    if (!res.ok) throw new Error("Error al cambiar estado");
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy PATCH estado:", error);
    return new Response(JSON.stringify({ error: "No se pudo cambiar el estado" }), {
      status: 500,
    });
  }
}
