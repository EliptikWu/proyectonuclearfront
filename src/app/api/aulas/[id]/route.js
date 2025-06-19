// Obtener un aula por ID
export async function GET(_req, { params }) {
  const { id } = params;
  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas/${id}`);
    if (!res.ok) throw new Error("Error al obtener aula por ID");

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy GET /api/aulas/[id]:", error);
    return new Response(JSON.stringify({ error: "No se pudo cargar el aula" }), { status: 500 });
  }
}

// Eliminar un aula por ID
export async function DELETE(_req, { params }) {
  const { id } = params;
  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el aula");

    return new Response(JSON.stringify({ message: "Aula eliminada" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy DELETE:", error);
    return new Response(JSON.stringify({ error: "No se pudo eliminar el aula" }), { status: 500 });
  }
}

// Actualizar un aula por ID
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const aula = await req.json();

    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aula),
    });

    if (!res.ok) throw new Error("Error al actualizar el aula");
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy PUT:", error);
    return new Response(JSON.stringify({ error: "No se pudo actualizar el aula" }), { status: 500 });
  }
}
