// Listar todas las aulas
export async function GET() {
  try {
    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas`);
    if (!res.ok) throw new Error("Error al obtener las aulas");

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy GET aulas:", error);
    return new Response(JSON.stringify({ error: "No se pudieron cargar las aulas" }), { status: 500 });
  }
}

// Crear un aula nueva
export async function POST(req) {
  try {
    const aula = await req.json();

    const res = await fetch(`https://back-aulas-production.up.railway.app/aulas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aula),
    });

    if (!res.ok) throw new Error("Error al crear el aula");
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error("❌ Error en proxy POST aula:", error);
    return new Response(JSON.stringify({ error: "No se pudo crear el aula" }), { status: 500 });
  }
}
