import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
      `${BACKEND_URL}/reports-restricted-area/${commerceId}`,
      {
        params: {
          startDate: startDate,
          endDate: endDate,
          page: page || 0,
          size: pageSize || 10,
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
      `${BACKEND_URL}/reports-restricted-area/all-reports/${commerceId}`,
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
      `${BACKEND_URL}/reports-restricted-area/${id}/image`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "image/jpeg",
        },
        responseType: "arraybuffer", // Para recibir los datos como un array de bytes
      },
    );
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
    const response = await axios.post(
      `${BACKEND_URL}/reports-restricted-area/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};
