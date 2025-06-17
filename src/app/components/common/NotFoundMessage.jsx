import React from "react";

export default function NotFoundMessage() {
    return (
        <div style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 2px 10px rgba(44,23,108,0.09)",
            maxWidth: 480,
            width: "100%",
            padding: 48,
            textAlign: "center"
        }}>
            {/* SVG 404 estilo institucional */}
            <div style={{ marginBottom: 30 }}>
                <svg width={180} height={80} viewBox="0 0 180 80" fill="none" style={{ display: "block", margin: "0 auto" }}>
                    {/* Primer 4 */}
                    <g>
                        <rect x="8" y="16" width="48" height="48" rx="8" fill="#edeafd" stroke="#2c176c" strokeWidth="2" />
                        <text x="32" y="50" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#2c176c" fontFamily="monospace">4</text>
                    </g>
                    {/* 0 */}
                    <g>
                        <circle cx="92" cy="40" r="24" fill="#fff" stroke="#2c176c" strokeWidth="2" />
                        <text x="92" y="54" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#2c176c" fontFamily="monospace">0</text>
                    </g>
                    {/* Segundo 4 */}
                    <g>
                        <rect x="124" y="16" width="48" height="48" rx="8" fill="#edeafd" stroke="#2c176c" strokeWidth="2" />
                        <text x="148" y="50" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#2c176c" fontFamily="monospace">4</text>
                    </g>
                    {/* Rayitas y detalles estilo "error divertido" */}
                    <g stroke="#b5a3e8" strokeWidth="2">
                        <path d="M25 12 l-10 -7" />
                        <path d="M30 70 l-7 8" />
                        <path d="M155 12 l10 -7" />
                        <path d="M150 70 l7 8" />
                        <path d="M92 6 l0 -10" />
                        <path d="M92 74 l0 10" />
                    </g>
                </svg>
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
            <a
                href="/"
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
                Volver al inicio
            </a>
        </div>
    );
}