self.onmessage = async (event) => {
  const { token, establishmentsData, BACKEND_URL } = event.data;

  try {
    const fetchPeopleFlow = async (commerce) => {
      // Calcula las fechas de inicio y fin del día en el frontend
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date();
      endDate.setHours(23, 59, 59, 999);

      // Convierte las fechas a ISO string para enviarlas al backend
      const startDateIso = startDate.toISOString();
      const endDateIso = endDate.toISOString();

      const response = await fetch(
        `${BACKEND_URL}/peopleflow/all-events-by-date/${commerce.id}?startDate=${startDateIso}&endDate=${endDateIso}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error(`Failed for ${commerce.name}`);

      const data = await response.json();
      return {
        commerceId: commerce.id,
        commerceName: commerce.name,
        enter: data.data
          .filter((event) => event.eventType === "ENTER")
          .reduce((acc, event) => acc + event.count, 0),
        exit: data.data
          .filter((event) => event.eventType === "EXIT")
          .reduce((acc, event) => acc + event.count, 0),
      };
    };

    const CONCURRENT_LIMIT = 5;
    const limitedFetch = async (tasks, limit) => {
      const results = [];
      const executing = [];
      for (const task of tasks) {
        const promise = task().then((result) => {
          executing.splice(executing.indexOf(promise), 1);
          return result;
        });
        results.push(promise);
        executing.push(promise);
        if (executing.length >= limit) await Promise.race(executing);
      }
      return Promise.all(results);
    };

    const tasks = establishmentsData.map((commerce) => () => fetchPeopleFlow(commerce));
    const combinedPeopleFlow = await limitedFetch(tasks, CONCURRENT_LIMIT);

    self.postMessage({ status: "success", data: combinedPeopleFlow });
  } catch (error) {
    self.postMessage({ status: "error", error: error.message });
  }
};
