"use client";
import Header from "./components/common/Header";
import NotFoundMessage from "./components/common/NotFoundMessage";

export default function NotFound() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "#f5f6fa"
        }}>
            <Header />
            <main style={{
                minHeight: "calc(100vh - 146px)", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <NotFoundMessage />
            </main>
        </div>
    );
}