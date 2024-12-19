export const subscribeToNotifications = (userId, handleNotification) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Verificar que userId no esté vacío o indefinido
  if (!userId) {
    console.error("User ID is required to subscribe to notifications.");
    return;
  }

  // Crear una nueva conexión SSE al backend con el userId como parámetro
  const eventSource = new EventSource(
    `${BACKEND_URL}/notifications/subscribe?userId=${userId}`,
  );

  eventSource.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    handleNotification(notification);
  };

  eventSource.onerror = (error) => {
    eventSource.close();
  };

  return () => {
    eventSource.close(); // Cerrar la conexión cuando ya no sea necesaria
  };
};
