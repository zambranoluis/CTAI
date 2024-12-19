"use client";
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { IoMenu } from "react-icons/io5";
import { TiWeatherSunny, TiWeatherNight, TiArrowSortedDown } from "react-icons/ti";
import { IoSettingsSharp } from "react-icons/io5";
import NotificationDropdown from "./NotificationDropdown";
import { useRouter } from "next/navigation";

import { HiUserAdd } from "react-icons/hi";

import { FaUserEdit } from "react-icons/fa";

import { TbHomeEdit } from "react-icons/tb";

const settingsNav = [
  {
    id: 0,
    name: "Edit User",
    icon: <FaUserEdit className='text-4xl' />,
  },
  {
    id: 1,
    name: "Edit Establishment",
    icon: <TbHomeEdit className='text-4xl' />,
  },
  {
    id: 2,
    name: "Register User",
    icon: <HiUserAdd className='text-4xl' />,
  },
];

import { languagesNav } from "@/app/languages/languages";

const Navbar = ({ toggleAside }) => {
  const { theme, toggleTheme } = useTheme();
  const [showLanguages, setShowLanguages] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const router = useRouter();

  const toggleLanguages = () => {
    setShowLanguages(!showLanguages);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowLanguages(false);
  };

  return (
    <nav
      className={`select-none z-[300] w-full h-[60px] flex justifycenter justify-between drop-shadow-md sticky top-0 px-4 md:px-8 ${
        theme === "light"
          ? "bg-gradient-to-br from-[#ffffff] to-[#f5f5f5] border-b border-[#333333]"
          : "bg-gradient-to-br from-[#1c1c1c] to-[#121212] border-b border-[#d2dee1]"
      }`}>
      <div className='flex md:hidden w[20%] justify-center items-center'>
        <IoMenu
          className={`text-[40px] ${
            theme === "light" ? "text-[#333333]" : "text-[#d2dee1]"
          } hover:cursor-pointer`}
          onClick={(e) => {
            e.preventDefault();
            toggleAside(); // Alternar el aside cuando se hace clic en el menú hamburguesa
          }}
        />
      </div>
      <div className='w[50%] md:w[30%] flex  justify-start items-center'>
        <img
          id='logo-dark'
          className='w-full max-w-[300px] object-cover drop-shadow-[1px_1px_1.5px_var(--color-primary)] hover:cursor-pointer'
          src={theme === "light" ? "https://github.com/BPM94/CDNMD/raw/main/CTM/crimson_white.png" : "https://github.com/BPM94/CDNMD/raw/main/CTM/crimson_black.png"}
          alt='logo-crimsontide'
          onClick={(e) => {
            e.preventDefault();
            router.push("/dashboard/home");
          }}
        />
      </div>
      <div className='w[30%] md:w[70%] flex justify-center md:justify-end items-center gap-2'>
        <div
          className='relative flex flex-col justify-center items-center hover:cursor-pointer  gap-1 py-1 px-1 '
          onClick={(e) => {
            e.preventDefault();
            toggleLanguages();
          }}>
          <div className='flex justify-center items-center  md:w-[80px] '>
            <div className='md:w-[20%]   flex justify-center items-center max-sm:hidden'>
              <TiArrowSortedDown className='text-sm hover:text-[--color-primary]  text-[--color-text] place-self-center flex' />
            </div>
            <div className='md:w-[80%] flex  justify-center items-center gap-1 text-[--color-text]'>
              <h1 className='max-sm:hidden  font-medium '>
                {selectedLanguage.toUpperCase()}
              </h1>
              <img
                src={
                  languagesNav.find((language) => language.id === selectedLanguage).flag
                }
                className='w-[25px] h-[15px] '
                alt=''
              />
            </div>
          </div>
          <div
            className={`absolute ${
              showLanguages ? "block" : "hidden"
            }  bg-[--color-background-shade] left[-100px] top-[35px] max-h-[200px] overflow-auto`}>
            {languagesNav.map((language) => (
              <div
                key={language.id}
                className={`flex justify-center items-center gap-2 px-4 py-2 bg[--color-background-shade] border-b border-b-[--color-primary] hover:bg-[--color-primary] text-[--color-text] hover:text-[--color-background]  hover:cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedLanguage(language.id);
                  toggleLanguages();
                }}>
                <h1 className='font-medium  '>{`${language.name}`}</h1>
                <img src={language.flag} className='w-[25px] h-[15px] ' alt='' />
              </div>
            ))}
          </div>
        </div>

        <div className='relative'>
          <button
            onClick={toggleTheme}
            className='relative text-[30px] hover:cursor-pointer'>
            {theme === "light" ? (
              <TiWeatherNight className='text-[--color-text] text-[30px] hover:text-[--color-primary] transition-all ease-in' />
            ) : (
              <TiWeatherSunny className='text-[--color-text] text-[30px] hover:text-[--color-primary] transition-all ease-in' />
            )}
          </button>
        </div>

        {/* Componente de Notificaciones */}
        <NotificationDropdown theme={theme} />

        <div id='settings' className='relative'>
          <button
            className=''
            onClick={(e) => {
              e.preventDefault();
              toggleSettings();
            }}>
            <IoSettingsSharp
              className={`text-[30px] hover:text-[--color-primary] transition-all ease-in ${
                theme === "light" ? "text-[#333333]" : "text-[#d2dee1]"
              } p-1 hover:cursor-pointer`}
            />
          </button>
          <div
            className={`absolute ${
              showSettings ? "block" : "hidden"
            }  left-[-230px] md:left-[-200px] top-[35px]`}>
            <div className='w-[250px] p-2 bg-[--color-background-shade] rounded-md '>
              {settingsNav.map((item) => (
                <div
                  className={`   flex justify-start items-center p-4  border-b border-b-[--color-primary] gap-4 hover:cursor-pointer hover:bg-[--color-primary] text-[--color-text] hover:text-[--color-background]`}
                  key={item.id}>
                  <div className=' flex justify-center items-center'>{item.icon}</div>
                  <div className=' flex justify-center items-center '>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
