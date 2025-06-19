// src/app/api/aulas/[id]/estado/route.js

export async function PATCH(_req, { params }) {
  const { id } = params;

  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas/${id}`);
    if (!res.ok) throw new Error("No se pudo obtener el aula");

    const aula = await res.json();
    const estadoActual = aula.estado?.toLowerCase();

    const nuevoEstado = estadoActual === "libre" ? "inhabilitada" : "libre";

    const patchRes = await fetch(`https://back-aulas-production.up.railway.app/aulas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...aula, estado: nuevoEstado }),
    });

    const data = await patchRes.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en PATCH /api/aulas/[id]/estado:", error);
    return new Response(JSON.stringify({ error: "No se pudo cambiar el estado del aula" }), {
      status: 500,
    });
  }
}
