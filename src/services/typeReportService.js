import axios from "axios";
import { generateRandomReport } from "../assets/Object";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getReportsByType = async (
  token,
  commerceId,
  startDate,
  endDate,
  reportType,
  page,
  pageSize,
) => {
  let endpoint = "";

  // Determinar el endpoint según el tipo de reporte
  switch (reportType) {
    case "Shoplifting":
      endpoint = `${BACKEND_URL}/shoplifting-reports/all/${commerceId}`;
      break;
    case "Restricted Area":
      endpoint = `${BACKEND_URL}/restricted-area-reports/all/${commerceId}`;
      break;
    case "Face Recognition":
      endpoint = `${BACKEND_URL}/face-detection-reports/all/${commerceId}`;
      break;
    default:
      throw new Error("Unknown report type");
  }

  try {
    const response = await axios.get(endpoint, {
      params: {
        startDate,
        endDate,
        page,
        size: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching reports by type:", error);
    throw error;
  }
};

export const getAllReportsType = async (token, commerceId, reportType) => {
  let endpoint = "";

  switch (reportType) {
    case "Shoplifting":
      endpoint = `${BACKEND_URL}/shoplifting-reports/all-reports/${commerceId}`;
      break;
    case "Restricted Area":
      endpoint = `${BACKEND_URL}/restricted-area-reports/all-reports/${commerceId}`;
      break;
    case "Face Recognition":
      endpoint = `${BACKEND_URL}/face-detection-reports/all-reports/${commerceId}`;
      break;
    default:
      throw new Error("Unknown report type");
  }

  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching reports by type:", error);
    throw error;
  }
};

export const createReport = async (token, reportType, commerceId) => {
  try {
    let endpoint = "";

    switch (reportType) {
      case "Shoplifting":
        endpoint = `${BACKEND_URL}/shoplifting-reports/create`;
        break;
      case "Restricted Area":
        endpoint = `${BACKEND_URL}/restricted-area-reports/create`;
        break;
      case "Face Recognition":
        endpoint = `${BACKEND_URL}/face-detection-reports/create`;
        break;
      default:
        throw new Error("Unknown report type");
    }

    const data = generateRandomReport(commerceId, reportType);

    const response = await axios.post(endpoint, data, {
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

export const getReportImage = async (token, id, reportType) => {
  let endpoint = "";

  // Determina el endpoint basado en el tipo de reporte
  switch (reportType) {
    case "Shoplifting":
      endpoint = `${BACKEND_URL}/shoplifting-reports/${id}/download-image`;
      break;
    case "Restricted Area":
      endpoint = `${BACKEND_URL}/restricted-area-reports/${id}/download-image`;
      break;
    case "Face Recognition":
      endpoint = `${BACKEND_URL}/face-detection-reports/${id}/download-image`;
      break;
    default:
      console.error("Unknown report type:", reportType);
      throw new Error("Unknown report type");
  }

  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "image/jpeg",
      },
      responseType: "arraybuffer", // Para recibir los datos como un array de bytes
    });

    // Convertir la respuesta en base64
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
