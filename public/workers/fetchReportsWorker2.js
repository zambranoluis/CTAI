self.onmessage = async (event) => {
  const { token, establishmentsData, reportType, BACKEND_URL } = event.data;

  // Calcula las fechas en el frontend
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDateIso = startDate.toISOString();
  const endDateIso = endDate.toISOString();

  let endpoint;
  switch (reportType) {
    case "Shoplifting":
      endpoint = `${BACKEND_URL}/shoplifting-reports/all-reports`;
      break;
    case "Restricted Area":
      endpoint = `${BACKEND_URL}/restricted-area-reports/all-reports`;
      break;
    case "Face Recognition":
      endpoint = `${BACKEND_URL}/face-detection-reports/all-reports`;
      break;
    default:
      console.error("Unknown report type:", reportType);
      self.postMessage({ status: "error", error: "Unknown report type" });
      return;
  }

  try {
    const reportPromises = establishmentsData.map(async (commerce) => {
      try {
        const response = await fetch(
          `${endpoint}/${commerce.id}?startDate=${startDateIso}&endDate=${endDateIso}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          console.error(`Failed to fetch report for ${commerce.id}`);
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();
        return data.data.map((report) => ({
          ...report,
          commerceName: commerce.name,
        }));
      } catch (err) {
        console.error(`Error fetching data for commerce ${commerce.id}:`, err);
        throw err;
      }
    });

    const combinedReports = (await Promise.all(reportPromises)).flat();

    self.postMessage({ status: "success", data: combinedReports, reportType });
  } catch (error) {
    console.error("Error fetching reports:", error);
    self.postMessage({ status: "error", error: error.message });
  }
};
