// src/context/ThemeContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

// const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    document.documentElement.setAttribute("data-language", savedLanguage);
  }, []);

  const toggleLanguage = () => {
    // const newLanguage = ;
    // setLanguage(newLanguage);
    // document.documentElement.setAttribute("data-theme", newLanguage);
    // localStorage.setItem("theme", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  // return useContext(LanguageContext);
};