// src/app/layout.js

"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("Service Worker registrado:", registration))
        .catch((error) => console.error("Error al registrar el Service Worker:", error));
    }
  }, []);
  return (
    <html lang='en'>
      <head>
        <title>Crimsontide AI Dashboard v1.0.1</title>
        <link rel='icon' href='https://github.com/BPM94/CDNMD/raw/main/CTM/favicon-32x32-bg-negro.png' />
        <meta name='description' content='Crimsontide AI Dashboard v1.0.1' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>

      <body className='max-h-screen max-w-screen'>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
