"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/aulas", label: "Aulas" },
    { href: "/usuarios", label: "Usuarios" },
    { href: "/automatizacion", label: "Automatización" },
    { href: "/asignaturas", label: "Asignaturas" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header>
            <div style={{
                background: "#2c176c",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 48px 0 32px",
                height: 90,
                boxShadow: "0 2px 10px rgba(44,23,108,0.09)"
            }}>
                <Logo
                    src="/humboldt-logo.png"
                    alt="Logo Humboldt"
                    width={90}
                    height={70}
                    style={{
                        background: "#fff",
                        borderRadius: 14,
                        boxShadow: "0 2px 8px rgba(44,23,108,0.10)",
                        padding: "8px 18px",
                        maxWidth: 120,
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                />
                <nav style={{
                    display: "flex",
                    gap: 48,
                    alignItems: "center",
                    fontSize: 18
                }}>
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            style={{
                                color: "#fff",
                                textDecoration: "none",
                                fontWeight: 500,
                                borderBottom: pathname === link.href ? "3px solid #fff" : "none",
                                paddingBottom: 4
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <span style={{ marginLeft: 18, fontSize: 22, cursor: "pointer" }}>🌙</span>
                </nav>
            </div>
        </header>
    );
}