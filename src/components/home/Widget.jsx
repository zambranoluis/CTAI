// Widget.js

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { getEstablishmentsByUserId } from "@/services/establishmentService";
import dinamyc from "next/dynamic";

const Reports = dinamyc(() => import("./Reports"), { ssr: false });
const Header = dinamyc(() => import("./Header"), { ssr: false });
const PeopleFlow = dinamyc(() => import("./PeopleFlow"), { ssr: false });

const Widget = () => {
  const [date, setDate] = useState(null);
  const [reportsData, setReportsData] = useState({});
  const [peopleFlowData, setPeopleFlowData] = useState([]);
  const [currentReportType, setCurrentReportType] = useState("Shoplifting");
  const [error, setError] = useState("");
  const [establishmentsData, setEstablishmentsData] = useState([]);

  // const [isAsideOpen, setIsAsideOpen] = useState(false);


  const { data: session } = useSession();

  const [workers, setWorkers] = useState({});

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Configuración de la fecha actualizada
  useEffect(() => {
    const updateDate = () => setDate(new Date().toLocaleString());
    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  // Obtener datos de los establecimientos
  useEffect(() => {
    const fetchEstablishments = async () => {
      if (!session?.accessToken) {
        setError("No session or token available");
        return;
      }

      try {
        const response = await getEstablishmentsByUserId(
          session.accessToken,
          session.user.id,
        );

        if (!response || typeof response !== "object" || !Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        setEstablishmentsData(response.data);
      } catch (error) {
        setError("Failed to fetch establishments");
      }
    };

    fetchEstablishments();
  }, [session]);

  // Inicializar workers una sola vez
  useEffect(() => {
    const reportsWorker = new Worker("/workers/fetchReportsWorker2.js");
    const peopleFlowWorker = new Worker("/workers/fetchPeopleFlowWorker.js");

    reportsWorker.onmessage = (event) => {
      const { status, data, error, reportType } = event.data;
      if (status === "success") {
        setReportsData((prev) => ({
          ...prev,
          [reportType]: data,
        }));
      } else {
        setError(error);
      }
    };

    peopleFlowWorker.onmessage = (event) => {
      const { status, data, error } = event.data;
      if (status === "success") {
        setPeopleFlowData(data);
      } else {
        setError(error);
      }
    };

    // Guardar los workers en el estado
    setWorkers({ reportsWorker, peopleFlowWorker });

    // Limpieza al desmontar el componente
    return () => {
      reportsWorker.terminate();
      peopleFlowWorker.terminate();
    };
  }, []); // Vacío: se ejecuta una sola vez

  // Función para cargar datos de reportes
  const loadReportsData = useCallback(() => {
    if (workers && workers.reportsWorker) {
      workers.reportsWorker.postMessage({
        token: session?.accessToken,
        establishmentsData,
        reportType: currentReportType,
        BACKEND_URL,
      });
    }
  }, [workers, session?.accessToken, establishmentsData, currentReportType, BACKEND_URL]);

  // Función para cargar datos de flujo de personas
  const loadPeopleFlowData = useCallback(() => {
    if (workers && workers.peopleFlowWorker) {
      workers.peopleFlowWorker.postMessage({
        token: session?.accessToken,
        establishmentsData,
        BACKEND_URL,
      });
    }
  }, [workers, session?.accessToken, establishmentsData, BACKEND_URL]);

  // Intervalos para actualizaciones en vivo
  useEffect(() => {
    if (Array.isArray(establishmentsData) && establishmentsData.length > 0) {
      loadReportsData();
      loadPeopleFlowData();

      const interval = setInterval(() => {
        loadReportsData();
        loadPeopleFlowData();
      }, 5000); // Actualizar cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [establishmentsData, loadReportsData, loadPeopleFlowData]);

  const memoizedReports = useMemo(
    () => reportsData[currentReportType] || [],
    [reportsData, currentReportType],
  );

  return (
    <section
      id='section_widget'
      className='flex gap-4 w-[95%] h-[95%] rounded-md p-8 bg-[var(--color-background-shade)] overflow-y-scroll overflow-x-hidden flex-col noScrollBar z-50 placeself-start '>
      <div className='flex flex-col justify-center items-center w-full '>
        <div className='flex bggreen-300 place-self-start'>
          {date && (
            <span className='text-[--color-text] text-center text-md mb-4 flex place-self-start font-medium'>
              {date}
            </span>
          )}
        </div>
        <Header session={session} establishmentsData={establishmentsData} />
        {error && <p className='text-center text-red-500'>{error}</p>}
        <Reports
          reportsData={memoizedReports}
          currentReportType={currentReportType}
          setCurrentReportType={setCurrentReportType}
        />
        <PeopleFlow peopleFlowData={peopleFlowData} />
      </div>
    </section>
  );
};

export default Widget;
