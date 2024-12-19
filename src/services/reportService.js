// src/services/reportService.js

import axios from "axios";
import { generateRandomReport } from "../assets/Object";
import { format } from "date-fns";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Obtener los reportes por comercio y fechas (ahora con horas incluidas)// Obtener los reportes por comercio y fechas (ahora con horas incluidas)
export const getReports = async (
  token,
  commerceId,
  startDate,
  endDate,
  page,
  pageSize,
) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/shoplift-reports/all/${commerceId}`,
      {
        params: {
          startDate: startDate, // Enviar la fecha completa con la hora
          endDate: endDate, // Enviar la fecha completa con la hora
          page: page || 0, // Número de página
          size: pageSize || 10, // Tamaño de la página (cantidad de resultados por página)
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const getAllReports = async (token, commerceId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/shoplifting-reports/all-reports/${commerceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const getReportImage = async (token, id) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/shoplifting-reports/${id}/download-image`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "image/jpeg",
        },
        responseType: "arraybuffer", // Para recibir los datos como un array de bytes
      },
    );

    // Convertir la respuesta en base64
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

export const createReport = async (token, commerceId) => {
  try {
    const data = generateRandomReport(commerceId); // Llamamos a la función que genera los datos aleatorios
    const response = await axios.post(`${BACKEND_URL}/shoplifting-reports/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};
