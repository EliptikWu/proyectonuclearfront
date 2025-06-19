// src/app/api/recursos/[id]/route.js

// Obtener un recurso por ID
export async function GET(_req, { params }) {
  const { id } = params;
  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/recursos/${id}`);
    if (!res.ok) throw new Error("Error al obtener recurso por ID");

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy GET /api/recursos/[id]:", error);
    return new Response(JSON.stringify({ error: "No se pudo cargar el recurso" }), {
      status: 500,
    });
  }
}

// Eliminar un recurso por ID
export async function DELETE(_req, { params }) {
  const { id } = params;
  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/recursos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar el recurso");
    return new Response(JSON.stringify({ message: "Recurso eliminado" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy DELETE:", error);
    return new Response(JSON.stringify({ error: "No se pudo eliminar el recurso" }), {
      status: 500,
    });
  }
}

// Actualizar un recurso por ID
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const recurso = await req.json();

    const res = await fetch(`https://back-aulas-production.up.railway.app/recursos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recurso),
    });

    if (!res.ok) throw new Error("Error al actualizar el recurso");
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy PUT:", error);
    return new Response(JSON.stringify({ error: "No se pudo actualizar el recurso" }), {
      status: 500,
    });
  }
}
