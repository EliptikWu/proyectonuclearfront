export default function Header() {
  return (
    <header style={{
      background: "#2c176c",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      paddingBottom: 10,
      marginBottom: 40,
      boxShadow: "0 2px 10px rgba(44,23,108,0.09)"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "0 40px"
      }}>
        <img
          src="/humboldt-logo.png"
          alt="Logo Humboldt"
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(44,23,108,0.08)",
            marginTop: 24,
            marginBottom: 10,
            marginRight: 32,
            height: 75
          }}
        />
        <div style={{ flex: 1 }} />
        <nav style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          fontSize: 18,
          marginRight: 12
        }}>
          <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
          <a href="/aulas" style={{ color: "#fff", textDecoration: "none" }}>Aulas</a>
          <a href="/usuarios" style={{ color: "#fff", textDecoration: "none" }}>Usuarios</a>
          <a href="/automatizacion" style={{ color: "#fff", textDecoration: "none" }}>Automatización</a>
          <a href="/asignaturas" style={{ color: "#fff", textDecoration: "none" }}>Asignaturas</a>
          <span style={{ marginLeft: 18, fontSize: 22, cursor: "pointer" }}>🌙</span>
        </nav>
      </div>
    </header>
  );
}
