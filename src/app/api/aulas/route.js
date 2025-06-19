// src/app/api/aulas/route.js

// ✅ Obtener todas las aulas
export async function GET() {
  try {
    const res = await fetch("https://back-aulas-production.up.railway.app/aulas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Evita que Next.js use caché
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Backend respondió con error: ${errorText}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy GET /api/aulas:", error);
    return new Response(
      JSON.stringify({ error: "No se pudieron obtener las aulas" }),
      { status: 500 }
    );
  }
}

// ✅ Crear nueva aula
export async function POST(req) {
  try {
    const aula = await req.json();

    const res = await fetch("https://back-aulas-production.up.railway.app/aulas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aula),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Backend respondió con error: ${errorText}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error("❌ Error en proxy POST /api/aulas:", error);
    return new Response(
      JSON.stringify({ error: "No se pudo crear el aula" }),
      { status: 500 }
    );
  }
}
