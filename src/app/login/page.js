"use client";
import React, { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes poner la lógica de autenticación
    alert(`Usuario: ${usuario}, Contraseña: ${contrasena}`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#e5e5e5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#fff",
        display: "flex",
        width: "900px",
        height: "500px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        overflow: "hidden"
      }}>
        {/* Izquierda: imagen */}
        <div style={{
          flex: 1.2,
          background: "linear-gradient(120deg, #fff 65%, transparent 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <img
            src="/books-login.jpg"
            alt="Libros"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "skewY(-5deg)"
            }}
          />
        </div>
        {/* Derecha: formulario */}
        <div style={{
          flex: 1.6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px"
        }}>
          <img src="/humboldt-logo.png" alt="Logo Humboldt" style={{ width: 270, marginBottom: 12 }} />
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 320 }}>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 700, fontSize: 18, display: "block", marginBottom: 3 }}>Usuario</label>
              <input
                type="text"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "2px solid #222",
                  outline: "none",
                  fontSize: 17,
                  padding: "6px 0",
                  background: "transparent"
                }}
                required
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontWeight: 700, fontSize: 18, display: "block", marginBottom: 3 }}>Contraseña</label>
              <input
                type="password"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "2px solid #222",
                  outline: "none",
                  fontSize: 17,
                  padding: "6px 0",
                  background: "transparent"
                }}
                required
              />
            </div>
            <div style={{ textAlign: "right", marginBottom: 22 }}>
              <a href="#" style={{ color: "#2176ae", fontSize: 15 }}>¿Has olvidado tu contraseña?</a>
            </div>
            <button type="submit" style={{
              width: "100%",
              background: "linear-gradient(90deg, #265092, #1665c1)",
              color: "#fff",
              border: "none",
              borderRadius: 15,
              fontSize: 23,
              fontWeight: 500,
              padding: "10px 0",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(38,80,146,0.12)"
            }}>
              Acceder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}