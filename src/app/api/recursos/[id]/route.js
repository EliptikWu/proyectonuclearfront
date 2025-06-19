export async function DELETE(req, { params }) {
  const { id } = params;

  const apiUrl = https://back-aulas-production.up.railway.app/recursos/${id};

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el recurso");
    }

    return new Response(JSON.stringify({ message: "Recurso eliminado correctamente" }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error en proxy DELETE:", error);
    return new Response(JSON.stringify({ error: "No se pudo eliminar el recurso" }), {
      status: 500,
    });
  }
} 
