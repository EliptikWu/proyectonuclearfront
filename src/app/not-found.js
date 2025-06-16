"use client";
import Header from "@/components/Header";
import NotFoundIllustration from "@/components/NotFoundIllustration";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#ededed",
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <Header />
      <main style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 2px 10px rgba(44,23,108,0.09)",
          maxWidth: 480,
          width: "100%",
          padding: 48,
          textAlign: "center"
        }}>
          <div style={{ marginBottom: 30 }}>
            <NotFoundIllustration />
          </div>
          <h1 style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#2c176c",
            marginBottom: 13,
            letterSpacing: "-1px"
          }}>
            ¡Vaya! Página no encontrada
          </h1>
          <p style={{
            fontSize: 18,
            color: "#444",
            marginBottom: 28,
            fontWeight: 500
          }}>
            No pudimos encontrar la página que buscas.<br />
            Es posible que la dirección haya cambiado o no exista.
          </p>
          <Button href="/">Volver al inicio</Button>
        </div>
      </main>
    </div>
  );
}
