"use client";
import { ThemeProvider } from "@/context/ThemeContext";
import { DataProvider } from "@/context/DataContext";
import Navbar from "@/components/Navbar";
import Aside from "@/components/Aside";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "../../globals.css";

export default function DashboardLayout({ children }) {
  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  // Redirige al inicio si el usuario no está autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Cambia la ruta si necesitas redirigir a otra página
    }
  }, [status, router]);

  // Muestra un indicador de carga mientras verifica la sesión
  if (status === "loading") return <div className="w-full h-[100dvh] bg-[--color-background] text-[--color-text] p-8 gap-8 text-4xl font-bold text-center flex flex-col justify-center items-center"><img className="w-[50%] lg:w-[30%] 2xl:w-[20%]" src="https://github.com/BPM94/CDNMD/raw/main/CTM/logo_bordes.png" /><p>Loading Dashboard...</p></div>;

  return (
    <DataProvider>
      <ThemeProvider>
        <div className='w-full relative flex flex-col h-screen overflow-hidden'>
          <Navbar toggleAside={toggleAside} />
          <div className='flex'>
            <Aside toggleAside={toggleAside} isAsideOpen={isAsideOpen} />
            <section className='w-full h-[calc(100dvh-60px)] flex justify-center items-center text-[var(--color-text)] bg-background'>
              {children}
            </section>
          </div>
        </div>
      </ThemeProvider>
    </DataProvider>
  );
}
