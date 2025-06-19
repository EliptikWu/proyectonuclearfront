// src/app/api/recursos/route.js

export async function GET() {
  try {
    const response = await fetch("https://back-aulas-production.up.railway.app/recursos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // 🔁 evita usar caché al consultar recursos
    });

    if (!response.ok) {
      throw new Error("Error al obtener recursos");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error en proxy GET /api/recursos:", error);
    return new Response(
      JSON.stringify({ error: "No se pudieron obtener los recursos" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const recurso = await req.json();

    const response = await fetch("https://back-aulas-production.up.railway.app/recursos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recurso),
    });

    if (!response.ok) {
      throw new Error("Error al crear recurso");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error("❌ Error en proxy POST /api/recursos:", error);
    return new Response(
      JSON.stringify({ error: "No se pudo crear el recurso" }),
      { status: 500 }
    );
  }
}
