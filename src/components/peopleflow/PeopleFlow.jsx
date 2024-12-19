"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";

import {
  format,
  set,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
} from "date-fns";

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";


import {
  getPeopleFlowEventsByCommerce,
  createPeopleFlowEvent,
} from "@/services/peopleFlowService";
import { getEstablishmentsByUserId } from "@/services/establishmentService";
import { useDataContext } from "@/context/DataContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import dinamyc from "next/dynamic";

const Section = dinamyc(() => import("./Section"), { ssr: false });

const PeopleFlow = () => {
  const { data: session } = useSession();
  const { peopleFlowData, setPeopleFlowData } = useDataContext();
  const [commerces, setCommerces] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [graphData, setGraphData] = useState({
    labels: [],
    enterSeries: [],
    exitSeries: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [premadeActive, setPremadeActive] = useState(false);
  const [currentLabel, setCurrentLabel] = useState("");

  

  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000); // Limpia el error después de 3 segundos
      return () => clearTimeout(timer); // Limpia el temporizador si el error cambia o el componente se desmonta
    }
  }, [error]);

  // Fetch commerces only if they haven't been fetched yet
  useEffect(() => {
    if (session && !commerces.length) {
      getEstablishmentsByUserId(session.accessToken, session.user.id)
        .then((response) => {
          if (response?.data) setCommerces(response.data);
          else setError("Failed to fetch commerces");
        })
        .catch(() => setError("Failed to fetch commerces"));
    }
  }, [session, commerces.length]);

  const handleSubmit = useCallback(async () => {
    setCurrentLabel("");
    if (!selectedCommerce || !startDate || !endDate) return;

    try {
      setLoading(true);
      setError(""); // Limpia el error antes de realizar la búsqueda
      const events = await getPeopleFlowEventsByCommerce(
        session.accessToken,
        selectedCommerce,
        startDate,
        endDate,
      );

      if (events.data && events.data.length > 0) {
        setPeopleFlowData(events.data);
        setError(""); // Limpia el error si se encuentran datos
      } else {
        setPeopleFlowData([]); // Limpia los datos si no se encuentra información
        setGraphData({ labels: [], enterSeries: [], exitSeries: [] }); // Limpia los datos del gráfico
        setError("No events found.");
        setPeopleFlowData([]);
      }
    } catch (err) {
      setPeopleFlowData([]); // Limpia los datos en caso de error
      setGraphData({ labels: [], enterSeries: [], exitSeries: [] }); // Limpia los datos del gráfico
      setError("Error fetching people flow events.");
    } finally {
      setLoading(false);
    }
  }, [session, selectedCommerce, startDate, endDate, setPeopleFlowData]);

  useEffect(() => {
    if (selectedCommerce && startDate && endDate) handleSubmit();
  }, [selectedCommerce, startDate, endDate, handleSubmit]);

  const computedGraphData = useMemo(() => {
    if (!peopleFlowData?.length) return graphData;

    const sortedData = peopleFlowData.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    );

    return sortedData.reduce(
      (acc, event) => {
        const timestamp = new Date(event.timestamp).toLocaleString();

        if (!acc.labels.includes(timestamp)) {
          acc.labels.push(timestamp);
          acc.enterSeries.push(0);
          acc.exitSeries.push(0);
        }

        const index = acc.labels.indexOf(timestamp);

        if (event.eventType === "ENTER") {
          acc.enterSeries[index] += event.count;
        } else if (event.eventType === "EXIT") {
          acc.exitSeries[index] += event.count;
        }

        return acc;
      },
      { labels: [], enterSeries: [], exitSeries: [] },
    );
  }, [peopleFlowData]);

  useEffect(() => {
    setGraphData(computedGraphData);
  }, [computedGraphData]);

  const handleCreateEvent = useCallback(async () => {
    if (!session || !session.accessToken) {
      setError("User is not authenticated.");
      return;
    }
    try {
      const response = await createPeopleFlowEvent(session.accessToken, selectedCommerce);
      if (
        response.data &&
        response.status === "success" &&
        response.message === "Report saved successfully."
      ) {
        Swal.fire({ icon: "success", title: "Event created successfully." });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to create event." });
      }
    } catch (error) {
      console.log(error);
    }
  }, [session, selectedCommerce]);

  const handleDatePremade = useCallback(
    (dateSpan) => {
      const today = new Date();
      let start, end;

      switch (dateSpan) {
        case "Today":
          start = startOfDay(today);
          end = endOfDay(today);
          break;
        case "This Week":
          start = startOfWeek(today, { weekStartsOn: 1 });
          end = endOfWeek(today, { weekStartsOn: 1 });
          break;
        case "This Month":
          start = startOfMonth(today);
          end = endOfMonth(today);
          break;
        case "This 3-Months":
          start = startOfQuarter(today);
          end = endOfQuarter(today);
          break;
        case "This 6-Months":
          start = startOfQuarter(subMonths(today, 6));
          end = endOfQuarter(today);
          break;
        case "This Year":
          start = startOfYear(today);
          end = endOfYear(today);
          break;
        case "Yesterday":
          start = startOfDay(subDays(today, 1));
          end = endOfDay(subDays(today, 1));
          break;
        case "Last Week":
          start = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
          end = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
          break;
        case "Last Month":
          start = startOfMonth(subMonths(today, 1));
          end = endOfMonth(subMonths(today, 1));
          break;
        case "Last 3-Months":
          start = startOfQuarter(subQuarters(today, 1));
          end = endOfQuarter(subQuarters(today, 1));
          break;
        case "Last 6-Months":
          start = startOfQuarter(subQuarters(today, 2));
          end = endOfQuarter(subQuarters(today, 1));
          break;
        case "Last Year":
          start = startOfYear(subYears(today, 1));
          end = endOfYear(subYears(today, 1));
          break;
        default:
          return;
      }

      // Actualización de las fechas solo si cambian
      if (start !== startDate || end !== endDate) {
        setStartDate(start);
        setEndDate(end);
        handleSubmit();
      }
    },
    [handleSubmit, startDate, endDate],
  );

  const dateSpanOptions = useMemo(
    () => [
      { label: "Today" },
      { label: "This Week" },
      { label: "This Month" },
      { label: "This 3-Months" },
      { label: "This 6-Months" },
      { label: "This Year" },
      { label: "Yesterday" },
      { label: "Last Week" },
      { label: "Last Month" },
      { label: "Last 3-Months" },
      { label: "Last 6-Months" },
      { label: "Last Year" },
    ],
    [],
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section
      id='section_peopleFlow'
      className='flex gap-4 w-[95%] h-[95%] rounded-md bg-[var(--color-background-shade)] overflow-y-scroll'>
      <Section
        commerces={commerces}
        selectedCommerce={selectedCommerce}
        setSelectedCommerce={setSelectedCommerce}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSubmit={handleSubmit}
        dateSpanOptions={dateSpanOptions}
        handleDatePremade={handleDatePremade}
        premadeActive={premadeActive}
        setPremadeActive={setPremadeActive}
        currentLabel={currentLabel}
        setCurrentLabel={setCurrentLabel}
        graphData={graphData}
        loading={loading}
        error={error}
        handleCreateEvent={handleCreateEvent}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </section>
  );
};

export default PeopleFlow;
