self.onmessage = async (event) => {
  const {
    token,
    commerceId,
    startDate,
    endDate,
    reportType,
    page,
    pageSize,
    BACKEND_URL,
  } = event.data;

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
      self.postMessage({ status: "error", error: "Unknown report type" });
      return;
  }

  try {
    const url = `${endpoint}?startDate=${encodeURIComponent(
      startDate,
    )}&endDate=${encodeURIComponent(endDate)}&page=${page - 1}&size=${pageSize}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching reports: ${response.statusText}`);
    }

    const data = await response.json();
    self.postMessage({ status: "success", data });
  } catch (error) {
    self.postMessage({ status: "error", error: error.message });
  }
};
