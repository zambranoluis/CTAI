"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { TiArrowDownThick } from "react-icons/ti";
import { GrPowerShutdown } from "react-icons/gr";
import { logoutUser } from "@/services/authService";
import { useDataContext } from "@/context/DataContext";
import { signOut } from "next-auth/react";
import { asideFieldsConfig } from "@/assets/FieldsConfig";
import { getEstablishmentsByUserId } from "@/services/establishmentService";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Link from "next/link";

const Aside = ({ isAsideOpen, toggleAside }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const { theme } = useTheme();
  const { clearData } = useDataContext();
  const [hasEstablishments, setHasEstablishments] = useState(false);
  const [selectedAside, setSelectedAside] = useState(null);

  const { data: session } = useSession();

  // Declarar las secciones restringidas
  const restrictedSections = [
    "shoplifting",
    "people-flow",
    "restricted-area",
    "face-recognition",
    "cashier-alerts",
    // "object-alerts"
  ];

  // Verificar si el usuario tiene establecimientos
  useEffect(() => {
    const fetchEstablishments = async () => {
      if (session?.accessToken && session?.user?.id) {
        try {
          const establishments = await getEstablishmentsByUserId(
            session.accessToken,
            session.user.id,
          );
          setHasEstablishments(establishments.data.length > 0);
        } catch (error) {
          console.error("Error fetching establishments:", error);
          setHasEstablishments(false);
        }
      }
    };
    fetchEstablishments();
  }, [session]);

  const handleLogout = async () => {
    try {
      const token = session?.accessToken;
      await logoutUser(token);

      localStorage.clear();
      sessionStorage.clear();
      clearData();

      signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Failed to log out:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Logout failed. Please try again.",
      });
    }
  };

  const handleSectionChange = (section) => {
    setSelectedAside(section);
    if (restrictedSections.includes(section) && !hasEstablishments) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must have at least one establishment to access this section.",
      });
    }
  };

  const renderSectionLinks = (sectionTitle, fields) => (
    <>
      <p
        className={`text-[--color-text] transition-all duration-300 ease-out ${
          isAsideOpen ? "pl-2" : "text-center"
        } font-bold text-[10px]`}>
        {sectionTitle}
      </p>
      {fields.map((field, index) => (
        <Link
          href={`/dashboard/${field.section}`}
          key={`field-${index}`}
          className={`flex ${field.section === "how-to-use" ? "flex-col" : ""} ${
            isAsideOpen ? "" : "justify-center"
          } text-[--color-text] items-center gap-4 p-4 cursor-pointer  hover:bg-primary ${
            selectedAside === field.section ? "bg-primary" : ""
          } transition-all ${theme === "light" ? "text-[#333333]" : "text-[#d2dee1]"} ${
            restrictedSections.includes(field.section) && !hasEstablishments
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() => handleSectionChange(field.section)}>
          {field.section === "how-to-use" ? (
            <img
              src={theme === "light" ? "https://github.com/BPM94/CDNMD/raw/main/CTM/holdingPhoneDark.png" : "https://github.com/BPM94/CDNMD/raw/main/CTM/holdingPhoneLight.png"}
              alt=''
              className='w-full'
            />
          ) : (
            field.icon
          )}
          <span
            className={`${
              isAsideOpen ? "flex text-[18px]" : "text-[0px] hidden"
            } font-bold transition-all duration-300 ease-out asideText`}>
            {field.label}
          </span>
        </Link>
      ))}
    </>
  );

  return (
    <aside id="asideDashboard"
      className={`select-none  max-md:absolute md:sticky z-[200] top-[60px] flex flex-col justify-center items-center bg-gradient-to-br drop-shadow-md border-r transition-all duration-[100ms] ease-out h-[calc(100vh-61px)] ${
        isAsideOpen ? "w-[220px] " : "w-[100px] max-md:hidden"
      } ${
        theme === "light"
          ? "from-[#f5f5f5] to-[#ffffff] border-[#333333]"
          : "from-[#1c1c1c] to-[#121212] border-[#d2dee1]"
      }`}>
      <div className='h-full flex flex-col'>
        <div className='flex items-start justify-start p-4'>
          <TiArrowDownThick
            className={`text-[30px] text-[--color-text] cursor-pointer hidden md:flex transition-transform duration-600 ${
              isAsideOpen ? "rotate-90" : "-rotate-90"
            }`}
            onClick={toggleAside}
          />
        </div>

        <div className='flex h-full flex-col justify-between items-center'>
          <section className='flex h-[70%] flex-col gap-2 overflow-auto noScrollBar'>
            {renderSectionLinks(
              "Personal:",
              asideFieldsConfig.filter((field) =>
                ["home", "profile", "establishment"].includes(field.section),
              ),
            )}

            {renderSectionLinks(
              "Events:",
              asideFieldsConfig.filter((field) => field.section === "people-flow"),
            )}

            {renderSectionLinks(
              "Reports:",
              asideFieldsConfig.filter((field) =>
                [
                  "shoplifting",
                  "restricted-area",
                  "face-recognition",
                  "cashier-alerts",
                  "object-alerts",
                ].includes(field.section),
              ),
            )}

            {renderSectionLinks(
              "Crimsontide.AI",
              asideFieldsConfig.filter((field) =>
                ["information", "how-to-use"].includes(field.section),
              ),
            )}
          </section>

          <div className='p2 border-t w-[98%] h-[25%] items-center justify-center'>
            <button
              className={`flex mt-[10px] text-[--color-text] hover:bg-[--color-primary] w-full py-4 gap-2 justify-center items-center ${
                isAsideOpen ? "" : ""
              }`}
              onClick={handleLogout}>
              <GrPowerShutdown className='text-[25px]' />
              <span
                className={`${
                  isAsideOpen ? "text-[18px]" : "text-[0px] hidden"
                } font-bold transition-all duration-300 ease-out`}>
                Log Out
              </span>
            </button>
            <div className='flex flex-col justify-center items-center'>
              <p
                className={`${
                  isAsideOpen ? "text-[9px]" : "text-[0px] hidden"
                } font-bold transition-all duration-300 ease-out text-[--color-text]`}>
                CRIMSONTIDE AI LIMITED
              </p>
              <p
                className={`${
                  isAsideOpen ? "text-[9px]" : "text-[0px] hidden"
                } font-bold transition-all duration-300 ease-out text-[--color-text]`}>
                Copyright © 2023. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
