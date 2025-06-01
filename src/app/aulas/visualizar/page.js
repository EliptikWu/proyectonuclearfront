"use client";
import React from "react";

export default function EditarCurso() {
  // Datos fijos (puedes pasarlos por props o fetch en el futuro)
  const curso = {
    nombre: "SOF Tendencias de la ingeniería de Software",
    codigo: "SOF8359 (25-1)#1",
    cerrado: "Indefinido",
    docente: "Daniel Felipe Arias Garcia",
    sede: "Humboldt - Diurna",
    programa: "Ingeniería de software",
    pensum: "SOF00",
    asignatura: "5 SOF804-00 Tendencias de la ingeniería de software",
    cupo: "9(40)",
    periodo: "2025-1",
    fecha_inicio: "7/04/2025",
    fecha_fin: "7/07/2025",
    horario: `01 - 305-P/LABORATORIO INGENIERIA (C15)ju 10-11am /
01 - 305-P/LABORATORIO INGENIERIA (C15)ju 11 am-12pm/
01 - 305-P/LABORATORIO INGENIERIA (C15)ju 12-1pm`
  };

  const cursosLaterales = [
    "SOF Tendencias de la Ingeniería de software",
    "SOF Ingeniería de software II",
    "SOF Ingeniería de software I",
    "SOF Gestión de Proyectos de Software",
    "SOF Formulación de proyectos de Ingeniería de Software",
    "SOF Bases de datos II",
    "SOF Aseguramiento de la Calidad Del Software",
    "SOF Arquitectura de Software I",
    "SOF Arquitectura de Software II",
    "Semillero Vocacion Software"
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#ededed", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "#2c176c", color: "#fff", display: "flex", flexDirection: "column",
        paddingBottom: 10, marginBottom: 30, boxShadow: "0 2px 10px rgba(44,23,108,0.12)"
      }}>
        <div style={{ display: "flex", alignItems: "center", padding: "0 40px" }}>
          <img src="/humboldt-logo.png" alt="Logo Humboldt"
            style={{
              background: "#fff", borderRadius: 8, boxShadow: "0 2px 6px rgba(44,23,108,0.08)",
              marginTop: 24, marginBottom: 10, marginRight: 32, height: 75
            }} />
          <div style={{ flex: 1 }} />
          <nav style={{
            display: "flex", gap: 40, alignItems: "center", fontSize: 18, marginRight: 12
          }}>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
            <a href="#" style={{ color: "#fff", borderBottom: "3px solid #fff", paddingBottom: 3, fontWeight: 700 }}>Aulas</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Usuarios</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Automatización</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Asignaturas</a>
            <span style={{ marginLeft: 18, fontSize: 22, cursor: "pointer" }}>🌙</span>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1250, margin: "0 auto", display: "flex", gap: 32, alignItems: "flex-start" }}>
        {/* Sección principal */}
        <section style={{
          background: "#fff", borderRadius: 12, padding: "32px 32px 28px 32px", flex: 2.3,
          boxShadow: "0 2px 8px rgba(44,23,108,0.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
            <button onClick={() => window.history.back()} style={{
              border: "none", background: "none", fontSize: 26, cursor: "pointer", color: "#2c176c", marginRight: 10
            }} title="Volver">
              <span style={{ fontWeight: 600, fontSize: 32, marginRight: 4 }}>←</span>
            </button>
            <h1 style={{
              fontSize: 36, fontWeight: 700, margin: 0, letterSpacing: "-1px", flex: 1
            }}>Editar cursos</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#2c176c", fontWeight: 600, fontSize: 18, display: "flex", alignItems: "center", cursor: "pointer" }}>
                <svg width={22} height={22} style={{ marginRight: 4 }} fill="none" stroke="#2c176c" strokeWidth={2}><path d="M13.5 4.5l4 4-9 9h-4v-4z" /><path d="M12 6l4 4" /></svg>
                Editar
              </span>
              <span style={{ color: "#000", fontWeight: 600, fontSize: 18, display: "flex", alignItems: "center", cursor: "pointer" }}>
                <svg width={28} height={28} style={{ marginRight: 4 }} fill="none" stroke="#222" strokeWidth={2}><line x1="6" y1="6" x2="22" y2="22" /><line x1="22" y1="6" x2="6" y2="22" /></svg>
                Eliminar
              </span>
            </div>
          </div>
          <hr style={{ border: 0, borderTop: "2px solid #e4e4e4", margin: "10px 0 18px 0" }} />

          <div style={{
            fontWeight: 600, color: "#707070",
            fontSize: 27, marginBottom: 23, marginLeft: 6
          }}>{curso.nombre}</div>

          {/* Grid de campos */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 8
          }}>
            {/* Columna 1 */}
            <div>
              <label style={labelStyle}>Código</label>
              <div style={inputReadOnly}>{curso.codigo}</div>
            </div>
            <div>
              <label style={labelStyle}>Cerrado</label>
              <div style={{ ...inputReadOnly, color: "#b13d3d" }}>{curso.cerrado} <span style={{ color: "#ff6161" }}>*</span></div>
            </div>
            <div>
              <label style={labelStyle}>Docente</label>
              <div style={inputReadOnly}>{curso.docente}</div>
            </div>
            <div>
              <label style={labelStyle}>Sede – jornada</label>
              <div style={inputReadOnly}>{curso.sede}</div>
            </div>
            <div>
              <label style={labelStyle}>Programa</label>
              <div style={inputReadOnly}>{curso.programa}</div>
            </div>
            <div>
              <label style={labelStyle}>Pénsum</label>
              <div style={inputReadOnly}>{curso.pensum}</div>
            </div>
            <div>
              <label style={labelStyle}>Asignatura</label>
              <div style={inputReadOnly}>{curso.asignatura}</div>
            </div>
            <div>
              <label style={labelStyle}>Cupo (Max)</label>
              <div style={inputReadOnly}>{curso.cupo}</div>
            </div>
            <div>
              <label style={labelStyle}>Período</label>
              <div style={inputReadOnly}>{curso.periodo}</div>
            </div>
            <div>
              <label style={labelStyle}>Fecha inicio</label>
              <div style={inputReadOnly}>{curso.fecha_inicio}</div>
            </div>
            <div>
              <label style={labelStyle}>Fecha inicio</label>
              <div style={inputReadOnly}>{curso.fecha_fin}</div>
            </div>
            <div>
              <label style={labelStyle}>Horario</label>
              <div style={{ ...inputReadOnly, whiteSpace: "pre-line", fontSize: 15 }}>{curso.horario}</div>
            </div>
          </div>
        </section>

        {/* LATERAL */}
        <aside style={{
          background: "#fff", borderRadius: 12, padding: 24, minWidth: 320, maxWidth: 340,
          boxShadow: "0 2px 8px rgba(44,23,108,0.08)"
        }}>
          <form
            style={{
              display: "flex", alignItems: "center", marginBottom: 21, borderBottom: "1px solid #c5c5c5", paddingBottom: 10
            }}>
            <input
              type="text"
              placeholder="Buscar Cursos..."
              style={{
                width: "100%", border: "none", borderRadius: 7, padding: "9px 14px",
                fontSize: 16, background: "#edeafd", color: "#2c176c", outline: "none", marginRight: 7
              }}
              disabled
            />
            <button type="button" style={{
              background: "#2c176c", color: "#fff", border: "none", borderRadius: 7, padding: "8px 13px", fontSize: 17, cursor: "pointer"
            }} tabIndex={-1} disabled>
              <svg width={18} height={18} fill="none" stroke="#fff" strokeWidth={2}><circle cx={8} cy={8} r={7} /><line x1={13} y1={13} x2={17} y2={17} /></svg>
            </button>
          </form>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cursosLaterales.map((c, i) => (
              <li key={i} style={{ marginBottom: 9 }}>
                <a href="#" style={{
                  color: "#2176ae", fontSize: 15, textDecoration: "none", borderBottom: "1px solid #b9e0fd",
                  display: "block", paddingBottom: 3
                }}>{c}</a>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}

// --- estilos reutilizables ---
const labelStyle = {
  color: "#888", fontWeight: 700, fontSize: 15, marginBottom: 3, display: "block"
};
const inputReadOnly = {
  width: "100%", background: "#edeafd", border: "none", borderRadius: 7,
  padding: "8px 12px", fontSize: 16, color: "#444", marginBottom: 3, marginTop: 1,
  outline: "none", fontWeight: 500, pointerEvents: "none"
};