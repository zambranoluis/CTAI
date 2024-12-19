"use client";
import { useState, useMemo, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import {
  DisplayVideo,
  DisplayAboutUs,
  DisplayContactUs,
  DisplaySocialNetworks,
} from "./InformationPanels";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Information = () => {
  const router = useRouter();
  const { data: status } = useSession();

  // Memorizar panelesDisplay para evitar que se regenere
  const panelesDisplay = useMemo(
    () => [
      {
        id: 1,
        contenedor: <DisplayVideo />,
        titulo1: "Our",
        titulo2: "Services",
      },
      {
        id: 2,
        contenedor: <DisplayAboutUs />,
        titulo1: "Our",
        titulo2: "Goals",
      },
      {
        id: 3,
        contenedor: <DisplayContactUs />,
        titulo1: "Our",
        titulo2: "Contact",
      },
      {
        id: 4,
        contenedor: <DisplaySocialNetworks />,
        titulo1: "Our",
        titulo2: "Socials",
      },
    ],
    [],
  );

  const [currentDisplay, setCurrentDisplay] = useState(0);

  // Función para cambiar de panel memoizada
  const handleDisplayChange = useCallback(
    (direction) => {
      setCurrentDisplay((prevDisplay) =>
        direction === "right"
          ? (prevDisplay + 1) % panelesDisplay.length
          : (prevDisplay - 1 + panelesDisplay.length) % panelesDisplay.length,
      );
    },
    [panelesDisplay.length],
  );

  const currentPanel = useMemo(
    () => panelesDisplay[currentDisplay],
    [currentDisplay, panelesDisplay],
  );

  return (
    <section
      id='section_information'
      className='flex gap-4 p-8 w-[95%] h-[95%] rounded-md bg-[var(--color-background-shade)] flex-col z-50'>
      <div
        id='changePanel_section'
        className='flex p-4 w-full justify-between items-center'>
        <div
          className='z-[30] hover:cursor-pointer flex justify-center items-center hover:bg-black bg-[--color-background-shade] rounded-lg'
          onClick={() => handleDisplayChange("left")}>
          <IoIosArrowForward className='text-[--color-text] hover:text-red-800 rotate-180 text-6xl md:text-8xl' />
        </div>
        <div className='z-[30]'>
          <h1 className='flex text-3xl font-bold text-center'>
            {currentPanel.titulo1} <br className='md:hidden' />
            {currentPanel.titulo2}
          </h1>
        </div>
        <div
          className='z-[30] hover:cursor-pointer flex justify-center items-center hover:bg-black bg-[--color-background-shade] rounded-lg'
          onClick={() => handleDisplayChange("right")}>
          <IoIosArrowForward className='text-[--color-text] hover:text-red-800 text-6xl md:text-8xl' />
        </div>
      </div>
      <div className='flex w-full h-full justify-center items-center flex-col overflow-y-hidden'>
        {currentPanel.contenedor}
      </div>
    </section>
  );
};

export default Information;
