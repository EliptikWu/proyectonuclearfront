import React from "react";
import { useTranslation } from "react-i18next";

export default function NotFoundMessage() {
    const { t } = useTranslation();

    return (
        <div
            style={{
                background: "var(--color-principal_container)",
                borderRadius: 24,
                boxShadow: "0 2px 10px rgba(44,23,108,0.09)",
                maxWidth: 480,
                width: "100%",
                padding: 32,
                textAlign: "center",
            }}
        >
            <div style={{ marginBottom: 20 }}>
                <svg
                    width={140}
                    height={60}
                    viewBox="0 0 180 80"
                    fill="none"
                    style={{ display: "block", margin: "0 auto" }}
                >
                    {/* SVG contenido */}
                    <g>
                        <rect x="8" y="16" width="48" height="48" rx="8" fill="#edeafd" stroke="var(--color-principal_purple)" strokeWidth="2" />
                        <text x="32" y="50" textAnchor="middle" fontWeight="bold" fontSize="38" fill="var(--color-principal_purple)" fontFamily="monospace">4</text>
                    </g>
                    <g>
                        <circle cx="92" cy="40" r="24" fill="var(--color-principal_container)" stroke="var(--color-principal_purple)" strokeWidth="2" />
                        <text x="92" y="54" textAnchor="middle" fontWeight="bold" fontSize="38" fill="var(--color-principal_purple)" fontFamily="monospace">0</text>
                    </g>
                    <g>
                        <rect x="124" y="16" width="48" height="48" rx="8" fill="#edeafd" stroke="var(--color-principal_purple)" strokeWidth="2" />
                        <text x="148" y="50" textAnchor="middle" fontWeight="bold" fontSize="38" fill="var(--color-principal_purple)" fontFamily="monospace">4</text>
                    </g>
                </svg>
            </div>

            <h1
                style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: "var(--color-principal_purple)",
                    marginBottom: 12,
                }}
            >
                {t("errors.notFound")}
            </h1>

            <p
                style={{
                    fontSize: 16,
                    color: "var(--color-black_text)",
                    marginBottom: 22,
                    fontWeight: 500,
                }}
            >
                {t("errors.404")}
            </p>

            <a
                href="/"
                style={{
                    display: "inline-block",
                    background: "var(--color-blue_button_login)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: 10,
                    padding: "10px 28px",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(44,23,108,0.10)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "var(--color-blue_button_login_hover)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "var(--color-blue_button_login)")}
            >
                {t("common.backHome")}
            </a>

            <style jsx>{`
                @media (max-width: 480px) {
                    div {
                        padding: 20px !important;
                    }
                    h1 {
                        font-size: 24px !important;
                    }
                    p {
                        font-size: 14px !important;
                    }
                }
            `}</style>
        </div>
    );
}
