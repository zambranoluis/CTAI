// src/context/DataContext.js
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [establishmentsData, setEstablishmentsData] = useState(null);
  const [reportsData, setReportsData] = useState(null);
  const [restrictedAreaData, setRestrictedAreaData] = useState(null);
  const [faceRecognitionData, setFaceRecognitionData] = useState(null);
  const [peopleFlowData, setPeopleFlowData] = useState(null);

  const clearData = () => {
    setProfileData(null);
    setEstablishmentsData(null);
    setReportsData(null);
    setPeopleFlowData(null);
    setRestrictedAreaData(null);
    setFaceRecognitionData(null);
  };

  return (
    <DataContext.Provider
      value={{
        profileData,
        setProfileData,
        establishmentsData,
        setEstablishmentsData,
        reportsData,
        setReportsData,
        restrictedAreaData,
        setRestrictedAreaData,
        faceRecognitionData,
        setFaceRecognitionData,
        peopleFlowData,
        setPeopleFlowData,
        clearData,
      }}>
      {children}
    </DataContext.Provider>
  );
};
