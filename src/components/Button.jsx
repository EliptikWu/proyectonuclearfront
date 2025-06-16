export default function Button({ href, children }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        background: "linear-gradient(90deg, #265092, #1665c1)",
        color: "#fff",
        fontWeight: 600,
        fontSize: 18,
        borderRadius: 12,
        padding: "11px 34px",
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(44,23,108,0.10)"
      }}
    >
      {children}
    </a>
  );
}
