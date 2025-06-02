"use client";
import React, { useState } from "react";

// ICONOS SVG
const IconCalendar = () => (
  <svg height={20} width={20} fill="none" stroke="#222" strokeWidth="1.5"><rect x="2" y="5" width="16" height="13" rx="2" fill="#fff" stroke="#222" strokeWidth="1.5"/><rect x="2" y="8" width="16" height="2" fill="#222"/><circle cx="6" cy="12" r="1.2"/><circle cx="10" cy="12" r="1.2"/><circle cx="14" cy="12" r="1.2"/></svg>
);
const IconUser = () => (
  <svg height={20} width={20} fill="none" stroke="#222" strokeWidth="1.5"><circle cx="10" cy="7" r="4"/><path d="M2 18c0-3 3.58-5 8-5s8 2 8 5" /></svg>
);
const IconLocation = () => (
  <svg height={20} width={20} fill="none" stroke="#222" strokeWidth="1.5"><path d="M10 18c5-5.2 7-8.2 7-11A7 7 0 1 0 3 7c0 2.8 2 5.8 7 11z"/><circle cx="10" cy="7" r="2"/></svg>
);
const IconRoom = () => (
  <svg height={20} width={20} fill="#fff" stroke="#222" strokeWidth="1.5"><rect x="4" y="7" width="12" height="9" rx="2"/><rect x="8" y="12" width="4" height="4" rx="1"/></svg>
);
const IconBook = () => (
  <svg height={20} width={20} fill="none" stroke="#222" strokeWidth="1.5"><rect x="3" y="5" width="14" height="10" rx="2"/><path d="M7 8h6M7 12h4"/></svg>
);
const IconCapacity = () => (
  <svg width="20" height="20" fill="none" stroke="#222" strokeWidth="1.5"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M8 7V5a2 2 0 1 1 4 0v2"/><path d="M10 10v2"/></svg>
);
const IconStandard = () => (
  <svg width="20" height="20" fill="none" stroke="#222" strokeWidth="1.5"><rect x="3" y="6" width="14" height="8" rx="2"/><path d="M3 10h14"/></svg>
);
const IconMaterial = () => (
  <svg width="20" height="20" fill="none" stroke="#222" strokeWidth="1.5"><circle cx="10" cy="10" r="8"/><rect x="7" y="7" width="6" height="6" rx="1.5" /></svg>
);
const IconVideoBeam = () => (
  <svg width="20" height="20" fill="none" stroke="#222" strokeWidth="1.5"><rect x="3" y="7" width="14" height="6" rx="2"/><circle cx="10" cy="10" r="1.5" /></svg>
);

// CALENDARIO SIMULADO (puedes cambiar por uno real)
const Calendar = ({ selected }) => (
  <div style={{
    background: "#fff",
    borderRadius: 10,
    padding: 18,
    minWidth: 210,
    marginRight: 10,
    boxShadow: "0 2px 10px rgba(44,23,108,0.08)"
  }}>
    <div style={{ fontWeight: 600, color: "#2c176c", marginBottom: 8 }}>February 2021</div>
    <table style={{ width: "100%", fontSize: 14, textAlign: "center", color: "#2c176c" }}>
      <thead>
        <tr>
          <td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su</td>
        </tr>
      </thead>
      <tbody>
        <tr><td></td><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>
        <tr><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr>
        <tr><td>19</td><td>20</td><td>21</td><td>22</td>
          <td style={{ background: "#9a89e4", color: "#fff", borderRadius: 6 }}>{selected || 23}</td>
          <td>24</td><td>25</td></tr>
        <tr><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td></td><td></td></tr>
      </tbody>
    </table>
  </div>
);

export default function CrearAula() {
  // ESTADO DEL FORMULARIO
  const [form, setForm] = useState({
    profesor: "",
    sede: "",
    salon: "302",
    capacidad: "",
    tipo: "",
    materia: "Ingenieria de Software IV",
    horario: "",
    fecha: "",
  });
  const [material, setMaterial] = useState([
    { value: "Videobeam", checked: false },
    { value: "Aire acondicionado", checked: false }
  ]);
  const [newMaterial, setNewMaterial] = useState("");
  const [horarios, setHorarios] = useState([
    "7:00 a.m - 10:00 a.m",
    "10:00 a.m - 12:00 p.m",
    "2:00 p.m - 4:00 p.m",
    "4:00 p.m - 6:00 p.m",
    "6:00 p.m - 9:00 p.m"
  ]);
  const [horarioDropdown, setHorarioDropdown] = useState(false);

  // HANDLERS
  const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleMaterialCheck = (i) => setMaterial(material.map((m, idx) => idx === i ? { ...m, checked: !m.checked } : m));
  const handleMaterialDel = (i) => setMaterial(material.filter((_, idx) => idx !== i));
  const handleMaterialAdd = (e) => {
    e.preventDefault();
    if (newMaterial.trim()) {
      setMaterial([...material, { value: newMaterial, checked: false }]);
      setNewMaterial("");
    }
  };
  const handleHorarioSelect = (h) => {
    setForm({ ...form, horario: h });
    setHorarioDropdown(false);
  };

  // LABELS Y INPUTS
  const labelStyle = { color: "#edeafd", fontWeight: 600, fontSize: 16, marginBottom: 2, display: "block" };
  const inputStyle = { width: "100%", background: "#edeafd", border: "none", borderRadius: 7, padding: "8px 12px", fontSize: 16, marginBottom: 2, marginTop: 1, color: "#2c176c", outline: "none" };

  return (
    <div style={{ minHeight: "100vh", background: "#ededed", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* HEADER */}
      <header style={{ background: "#2c176c", color: "#fff", display: "flex", flexDirection: "column", paddingBottom: 10, marginBottom: 30, boxShadow: "0 2px 10px rgba(44,23,108,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "0 40px" }}>
          <img src="/humboldt-logo.png" alt="Logo Humboldt" style={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 6px rgba(44,23,108,0.08)", marginTop: 24, marginBottom: 10, marginRight: 32, height: 75 }} />
          <div style={{ flex: 1 }} />
          <nav style={{ display: "flex", gap: 40, alignItems: "center", fontSize: 18, marginRight: 12 }}>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
            <a href="#" style={{ color: "#fff", borderBottom: "3px solid #fff", paddingBottom: 3, fontWeight: 700 }}>Aulas</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Usuarios</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Automatización</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Asignaturas</a>
            <span style={{ marginLeft: 18, fontSize: 22, cursor: "pointer" }}>🌙</span>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 36, alignItems: "flex-start" }}>
        {/* FORMULARIO */}
        <section style={{ background: "#fff", borderRadius: 12, padding: 32, flex: 2.3, boxShadow: "0 2px 8px rgba(44,23,108,0.08)" }}>
          <button onClick={() => window.history.back()} style={{ border: "none", background: "none", fontSize: 26, cursor: "pointer", color: "#2c176c", marginBottom: 16 }} title="Volver">
            <span style={{ fontWeight: 600, fontSize: 32, marginRight: 4 }}>←</span>
          </button>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 28 }}>Crear nueva asignación de aula</h1>
          <div style={{ background: "#2c176c", borderRadius: 16, padding: 32, display: "flex", gap: 32, boxShadow: "0 4px 16px rgba(44,23,108,0.09)" }}>
            {/* CALENDARIO */}
            <Calendar selected={23} />
            {/* CAMPOS */}
            <div style={{ flex: 1 }}>
              {/* Primera fila */}
              <div style={{ display: "flex", gap: 18, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Profesor<span style={{color:'#ffb2b2'}}> *</span></label>
                  <input style={inputStyle} name="profesor" value={form.profesor} onChange={handleForm} placeholder="Ingrese el nombre del profesor" required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Capacidad de aula<span style={{color:'#ffb2b2'}}> *</span></label>
                  <input style={inputStyle} type="number" name="capacidad" value={form.capacidad} onChange={handleForm} placeholder="Ingrese la capacidad del aula" required />
                </div>
              </div>
              <div style={{ display: "flex", gap: 18, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Sede<span style={{color:'#ffb2b2'}}> *</span></label>
                  <input style={inputStyle} name="sede" value={form.sede} onChange={handleForm} placeholder="Ingrese la sede" required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Tipo de aula<span style={{color:'#ffb2b2'}}> *</span></label>
                  <input style={inputStyle} name="tipo" value={form.tipo} onChange={handleForm} placeholder="Ingrese el tipo de aula" required />
                </div>
              </div>
              <div style={{ display: "flex", gap: 18, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Salón<span style={{color:'#ffb2b2'}}> *</span></label>
                  <input style={inputStyle} name="salon" value={form.salon} onChange={handleForm} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Material TIC</label>
                  <div style={{ background: "#edeafd", borderRadius: 8, padding: 10, marginTop: 2 }}>
                    <div style={{ marginBottom: 4, fontWeight: 500, color: "#2c176c" }}>
                      <span>View</span>
                    </div>
                    {material.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                        <input type="checkbox" checked={item.checked} onChange={() => handleMaterialCheck(i)} style={{ marginRight: 7 }} />
                        <span style={{ flex: 1 }}>{item.value}</span>
                        <button onClick={() => handleMaterialDel(i)} style={{
                          background: "#fff", border: "1px solid #d3c5f3", borderRadius: 5, color: "#2c176c", marginLeft: 7, fontSize: 12, cursor: "pointer", padding: "2px 7px"
                        }} type="button">del</button>
                      </div>
                    ))}
                    <form onSubmit={handleMaterialAdd} style={{ display: "flex", gap: 5, marginTop: 8 }}>
                      <input value={newMaterial} onChange={e => setNewMaterial(e.target.value)} style={{
                        flex: 1, border: "1px solid #b5a3e8", borderRadius: 5, padding: "3px 8px", fontSize: 14
                      }} placeholder="Enter new task" />
                      <button type="submit" style={{
                        background: "#2c176c", color: "#fff", border: "none", borderRadius: 5, fontWeight: 600, fontSize: 13, padding: "2px 12px", cursor: "pointer"
                      }}>Add item</button>
                    </form>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <label style={labelStyle}>Hora de ingreso y salida</label>
                  <input
                    type="text"
                    style={inputStyle}
                    readOnly
                    name="horario"
                    value={form.horario}
                    placeholder="Ingrese el horario"
                    onClick={() => setHorarioDropdown(v => !v)}
                  />
                  {/* Dropdown horario */}
                  {horarioDropdown && (
                    <div style={{
                      position: "absolute", top: 44, left: 0, width: "100%", background: "#fff", borderRadius: 10,
                      boxShadow: "0 4px 16px rgba(44,23,108,0.15)", padding: 14, zIndex: 10
                    }}>
                      <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8, color: "#2c176c" }}>Seleccione un horario</div>
                      {horarios.map(h => (
                        <label key={h} style={{ display: "flex", alignItems: "center", marginBottom: 8, cursor: "pointer" }}>
                          <input type="checkbox" checked={form.horario === h} onChange={() => handleHorarioSelect(h)} style={{ marginRight: 8 }} />
                          {h}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Materia<span style={{color:'#ffb2b2'}}> *</span></label>
                  <input style={inputStyle} name="materia" value={form.materia} onChange={handleForm} required />
                </div>
              </div>
              <button style={{
                marginTop: 24, width: "100%", background: "#2c176c", color: "#fff", border: "none", borderRadius: 15,
                fontSize: 20, fontWeight: 600, padding: "13px 0", cursor: "pointer", boxShadow: "0 2px 10px rgba(44,23,108,0.10)"
              }}>
                Asignar nueva sala
              </button>
            </div>
          </div>
        </section>
        {/* PREVISUALIZACION */}
        <aside style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 18 }}>
          <button style={{
            background: "#2c176c", color: "#fff", border: "none", borderRadius: 9, fontWeight: 600,
            fontSize: 16, padding: "10px 0", marginBottom: 8, cursor: "pointer", boxShadow: "0 2px 10px rgba(44,23,108,0.12)"
          }}>
            PREVISUALIZACIÓN DE LA CLASE
          </button>
          <div style={{
            background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px 2px #b5a3e8",
            padding: 22, minWidth: 310, maxWidth: 350
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#6dd400", marginRight: 7 }} />
              <span style={{ fontWeight: 700, fontSize: 18, color: "#2c176c" }}>Clase Sede Principal</span>
            </div>
            <div style={{ color: "#2c176c", fontWeight: 500, fontSize: 15, marginBottom: 6 }}>{form.horario || "8:00 - 10:00"}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#594f7e", marginBottom: 3 }}>
              <IconCalendar />
              23 Abril 2025
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#594f7e", marginBottom: 3 }}>
              <IconUser />
              {form.profesor || "Arle Morales"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#594f7e", marginBottom: 3 }}>
              <IconLocation />
              {form.sede || "Sede Principal"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#594f7e", marginBottom: 3 }}>
              <IconRoom />
              {form.salon || "Aula 202"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#594f7e", marginBottom: 3 }}>
              <IconBook />
              {form.materia || "Ingenieria de Software IV"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#594f7e", marginBottom: 3 }}>
              <IconCapacity />
              Capacidad {form.capacidad || "40"} estudiantes
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#594f7e", marginBottom: 3 }}>
              <IconStandard />
              Aula estándar
            </div>
            <hr style={{ margin: "10px 0", border: "1px solid #edeafd" }} />
            <div style={{ fontWeight: 700, color: "#2c176c", marginBottom: 5, display: "flex", alignItems: "center" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#6dd400", marginRight: 7 }} />
              Material TIC
            </div>
            {material.filter(m => m.checked).map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#594f7e" }}>
                <IconVideoBeam />
                {m.value}
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}