// src/app/api/recursos/[id]/route.js

// PATCH para cambiar estado del recurso
export async function PATCH(_req, { params }) {
  const { id } = params;

  try {
    // Aquí podrías obtener el recurso actual para saber su estado actual y alternarlo
    const getRes = await fetch(`https://back-aulas-production.up.railway.app/recursos/${id}`);
    if (!getRes.ok) throw new Error("Error al obtener el recurso");

    const recursoActual = await getRes.json();
    const estadoActual = recursoActual.estado?.toLowerCase();

    // Ciclo de estados: disponible → no disponible → en mantenimiento → disponible
    let nuevoEstado;
    switch (estadoActual) {
      case "disponible":
        nuevoEstado = "no disponible";
        break;
      case "no disponible":
        nuevoEstado = "en mantenimiento";
        break;
      case "en mantenimiento":
      default:
        nuevoEstado = "disponible";
        break;
    }

    const patchRes = await fetch(`https://back-aulas-production.up.railway.app/recursos/${id}/estado`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    if (!patchRes.ok) {
      const errorText = await patchRes.text();
      throw new Error(`Backend respondió con error: ${errorText}`);
    }

    const data = await patchRes.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (error) {
    console.error("❌ Error en proxy PATCH /api/recursos/[id]/estado:", error);
    return new Response(
      JSON.stringify({ error: "No se pudo cambiar el estado del recurso" }),
      { status: 500 }
    );
  }
}
