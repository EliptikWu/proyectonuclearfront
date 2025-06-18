"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: t("common.Home") },
        { href: "/aulas/visualizar", label: t("common.Classroom") },
        { href: "/usuarios", label: t("common.Users") },
        { href: "/automatizacion", label: t("common.automation") },
        { href: "/asignaturas", label: t("common.subjects") },
    ];

    return (
        <header>
            <div
                style={{
                    background: "var(--color-principal_purple)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 20px",
                    height: 90,
                    boxShadow: "0 2px 10px rgba(44,23,108,0.09)",
                    position: "relative",
                }}
            >
                <Logo
                    src="/humboldt-logo.png"
                    alt="Logo Humboldt"
                    width={130}
                    height={100}
                    style={{
                        background: "var(--color-principal_container)",
                        borderRadius: 14,
                        boxShadow: "0 2px 8px rgba(44,23,108,0.10)",
                        padding: "6px 12px",
                        maxWidth: 130,
                        height: "auto",
                    }}
                />

                {/* Botón menú hamburguesa */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        display: "none",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: 28,
                        cursor: "pointer",
                    }}
                >
                    ☰
                </button>

                {/* Menú principal */}
                <nav
                    style={{
                        display: "flex",
                        gap: 32,
                        alignItems: "center",
                        fontSize: 16,
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            style={{
                                color: "#fff",
                                textDecoration: "none",
                                fontWeight: 500,
                                borderBottom:
                                    pathname === link.href ? "2px solid #fff" : "none",
                                paddingBottom: 4,
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Menú móvil */}
                {menuOpen && (
                    <div
                        style={{
                            position: "absolute",
                            top: 90,
                            right: 0,
                            background: "var(--color-principal_purple)",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                            padding: 20,
                        }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontSize: 18,
                                    fontWeight: 500,
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

                <style jsx>{`
                    @media (max-width: 768px) {
                        nav {
                            display: none !important;
                        }
                        button {
                            display: block !important;
                        }
                    }
                `}</style>
            </div>
        </header>
    );
}