"use client";
import "./i18n";
import Header from "@components/common/Navbar";
import NotFoundMessage from "@components/common/NotFoundMessage";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "var(--color-general_body)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header />
            <main
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                <NotFoundMessage />
            </main>
        </div>
    );
}
