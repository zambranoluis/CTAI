import axios from "axios";

/**
 * Toggle notifications for a report type
 * @param {String} userId - User ID
 * @param {String} reportType - Report type (e.g., "shoplifting")
 * @param {String} notifyType - Notification type ("SMS" or "EMAIL")
 * @param {Boolean} isActive - Whether the notification is active
 * @param {String} token - Access token for authentication
 * @returns {Promise} - Axios response promise
 */
export const toggleNotification = async (
  userId,
  reportType,
  notifyTypes,
  isActive,
  token,
) => {
  try {
    // Construye los parámetros
    const params = new URLSearchParams();
    params.append("userId", userId);
    params.append("reportType", reportType);
    notifyTypes.forEach((type) => params.append("notifyTypes", type)); // Manejo del array
    params.append("isActive", isActive);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications-reports/toggle`,
      null,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to toggle notification:", error);
    throw error;
  }
};

export const getNotificationStatus = async (userId, reportType, token) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications-reports/status`,
      {
        params: { userId, reportType },
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
        },
      },
    );
    return response.data?.data; // Assuming the API returns the status in `data`
  } catch (error) {
    console.error("Failed to fetch notification status:", error);
    throw error;
  }
};
