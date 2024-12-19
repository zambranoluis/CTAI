import { imageBase64 } from "./ImageBase64";
import { format } from "date-fns";

export const generateRandomReport = (commerceId, reportType) => {
  const date = new Date();
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"); // Formato con 'Z' para zona horaria UTC

  const randomString = () => Math.random().toString(36).substring(7); // Genera string aleatorio

  // Generar datos aleatorios
  const data = {
    commerceId: commerceId,
    timestamp: formattedDate,
    numberOfSkeletons: Math.floor(Math.random() * 5) + 1,
    numberOfBoundingBoxes: Math.floor(Math.random() * 5) + 1,
    numberOfPersons: Math.floor(Math.random() * 5) + 1,
    reportType: reportType,
    detectedId: randomString(),
    hashIds: [randomString(), randomString(), randomString()],
    faces: {
      name: "John Smith",
      imageBase64: imageBase64,
    },
    cameraAddress: "Camera_" + randomString(),
    imageBase64: imageBase64,
  };

  return data;
};

export const generateRandomEvent = (commerceId) => {
  const date = new Date();
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"); // Formato con 'Z' para zona horaria UTC

  const randomNumber = Math.floor(Math.random() * 5) + 1;
  const randomString = () => Math.random().toString(36).substring(7); // Genera string aleatorio
  const eventType = ["ENTER", "EXIT"]; // Definir las constantes como cadenas de texto

  const data = {
    eventType: eventType[Math.floor(Math.random() * eventType.length)],
    timestamp: formattedDate,
    commerceId: commerceId,
    hashId: randomString(),
    count: randomNumber,
    cameraAddress: "Camera_" + randomString(),
  };

  return data;
};
