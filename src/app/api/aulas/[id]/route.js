// src/app/api/aulas/[id]/route.js

export async function GET(req, context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas/${id}`);
    if (!res.ok) throw new Error("Error al obtener aula");

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en GET /api/aulas/[id]:", error);
    return new Response(JSON.stringify({ error: "No se pudo obtener el aula" }), {
      status: 500,
    });
  }
}

export async function PUT(req, context) {
  const { id } = context.params;

  try {
    const aula = await req.json();

    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aula),
    });

    if (!res.ok) throw new Error("Error al actualizar aula");

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en PUT /api/aulas/[id]:", error);
    return new Response(JSON.stringify({ error: "No se pudo actualizar el aula" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar aula");

    return new Response(JSON.stringify({ message: "Aula eliminada" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error en DELETE /api/aulas/[id]:", error);
    return new Response(JSON.stringify({ error: "No se pudo eliminar el aula" }), {
      status: 500,
    });
  }
}
