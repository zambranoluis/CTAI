// src/services/peopleFlowService.js

import axios from "axios";
import { generateRandomEvent } from "@/assets/Object";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Obtener todos los eventos de People Flow por comercio y fecha
export const getPeopleFlowEvents = async (
  token,
  commerceId,
  startDate,
  endDate,
  page,
  pageSize,
) => {
  try {
    let url = `${BACKEND_URL}/peopleflow/events/${commerceId}`;

    // Añadir parámetros de fechas si están presentes
    const params = {
      page: page || 0, // Número de página
      size: pageSize || 10, // Tamaño de la página (cantidad de resultados por página)
    };

    if (startDate) {
      params.startDate = startDate;
    }
    if (endDate) {
      params.endDate = endDate;
    }

    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching people flow events:", error);
    throw error;
  }
};

export const getPeopleFlowEventsByCommerce = async (
  token,
  commerceId,
  startDate,
  endDate,
) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/peopleflow/all-events-by-date/${commerceId}`,
      {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching people flow events:", error);
    throw error;
  }
};

export const createPeopleFlowEvent = async (token, commerceId) => {
  try {
    const data = generateRandomEvent(commerceId);

    const response = await axios.post(`${BACKEND_URL}/peopleflow/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating people flow event:", error);
    throw error;
  }
};
