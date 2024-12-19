import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Obtener todos los comercios de un usuario
export const getEstablishmentsByUserId = async (token, userId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/commerce/all/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching establishments:", error);
    throw error;
  }
};

// Crear un nuevo comercio
export const createEstablishment = async (token, data) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/commerce/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Mostrar más detalles sobre el error de la respuesta del servidor
      console.error("Error creating establishment (response data):", error.response.data);
      console.error("Error status code:", error.response.status);
    } else {
      console.error("Error creating establishment:", error);
    }
    throw error;
  }
};

// Actualizar un comercio existente
export const updateEstablishment = async (token, id, data) => {
  try {
    const response = await axios.patch(`${BACKEND_URL}/commerce/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error updating establishment (response data):", error.response.data);
    } else {
      console.error("Error updating establishment:", error);
    }
    throw error;
  }
};

// Eliminar un comercio existente
export const deleteEstablishment = async (token, id) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/commerce/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error deleting establishment (response data):", error.response.data);
    } else {
      console.error("Error deleting establishment:", error);
    }
    throw error;
  }
};
