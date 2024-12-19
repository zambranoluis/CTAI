"use client";

import { DatePicker } from "@nextui-org/date-picker";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { createReport } from "@/services/typeReportService";
import { getEstablishmentsByUserId } from "@/services/establishmentService";
import { useDataContext } from "@/context/DataContext";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
  startOfQuarter,
  endOfQuarter,
} from "date-fns";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import dinamyc from "next/dynamic";



const Section = dinamyc(() => import("./Section"), { ssr: false });

const Reports = () => {
  const { data: session } = useSession();
  const {
    reportsData,
    setReportsData,
    restrictedAreaData,
    setRestrictedAreaData,
    faceRecognitionData,
    setFaceRecognitionData,
  } = useDataContext();
  const pathname = usePathname();

  const [commerces, setCommerces] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [worker, setWorker] = useState(null);

  const [selectedReport, setSelectedReport] = useState(null);

  const [currentLabel, setCurrentLabel] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const reportType = useMemo(() => {
    const path = pathname?.toLowerCase();
    if (path.includes("shoplifting")) return "Shoplifting";
    if (path.includes("restricted-area")) return "Restricted Area";
    if (path.includes("face-recognition")) return "Face Recognition";
    return "Unknown Report Type";
  }, [pathname]);

  const currentReportData = useMemo(() => {
    switch (reportType) {
      case "Shoplifting":
        return reportsData || [];
      case "Restricted Area":
        return restrictedAreaData || [];
      case "Face Recognition":
        return faceRecognitionData || [];
      default:
        return [];
    }
  }, [reportType, reportsData, restrictedAreaData, faceRecognitionData]);

  useEffect(() => {
    if (session && !commerces.length) {
      getEstablishmentsByUserId(session.accessToken, session.user.id)
        .then((response) => {
          if (response?.data) setCommerces(response.data);
          else {
            setError("Failed to fetch commerces");
            setTimeout(() => setError(null), 3000);
          }
        })
        .catch(() => setError("Failed to fetch commerces"));
    }
  }, [session, commerces.length]);

  useEffect(() => {
    const newWorker = new Worker("/workers/fetchReportsWorker.js");
    setWorker(newWorker);

    newWorker.onmessage = (event) => {
      const { status, data, error } = event.data;
      if (status === "success") {
        const reports = data.data.content; // Log reports from Worker
        console.log("reports: ", reports);
        switch (reportType) {
          case "Shoplifting":
            setReportsData(reports);
            break;
          case "Restricted Area":
            setRestrictedAreaData(reports);
            break;
          case "Face Recognition":
            setFaceRecognitionData(reports);
            break;
        }
        setGraphData(groupReportsByDateTime(reports));
        console.log("graphData:", graphData);
        setTotalPages(data.totalPages);
        setLoading(false);
      } else if (status === "error") {
        setError(error);
        setLoading(false);
      }
    };

    return () => {
      newWorker.terminate();
      setWorker(null);
    };
  }, [reportType]);

  const handleFetchReports = useCallback(() => {
    setCurrentLabel("");
    if (!selectedCommerce || !startDate || !endDate || !worker) return;

    setLoading(true);

    setTimeout(() => {
      worker.postMessage({
        token: session.accessToken,
        commerceId: selectedCommerce,
        startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ssXXX"),
        endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ssXXX"),
        reportType,
        page,
        pageSize,
        BACKEND_URL,
      });
    }, 500)
  }, [worker, session, selectedCommerce, startDate, endDate, reportType, page, pageSize]);

  const groupReportsByDateTime = useCallback((reports) => {
    if (!reports?.length) return { labels: [], series: [] };

    const grouped = reports.reduce((acc, report) => {
      const dateTime = new Date(report.timestamp);
      acc[dateTime] = (acc[dateTime] || 0) + 1;
      return acc;
    }, {});

    return { labels: Object.keys(grouped), series: Object.values(grouped) };
  }, []);

  useEffect(() => {
    if (selectedCommerce && startDate && endDate) handleFetchReports();
  }, [page, pageSize, handleFetchReports]);

  const handleCreateReport = useCallback(async () => {
    if (!session?.accessToken) {
      setError("User is not authenticated.");
      return;
    }
    try {
      setLoading(true);
      const response = await createReport(
        session.accessToken,
        reportType,
        selectedCommerce,
      );
      if (response?.status === "success") {
        Swal.fire("Report created successfully.");
      } else {
        throw new Error("Failed to create report");
      }
    } catch {
      Swal.fire("Error creating report.");
    } finally {
      setLoading(false);
    }
  }, [session, selectedCommerce, reportType]);

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

      // Actualiza las fechas solo si cambian
      if (start !== startDate || end !== endDate) {
        setStartDate(start);
        setEndDate(end);
        handleFetchReports(); // Llama a la función de fetch de reportes
      }
    },
    [handleFetchReports, startDate, endDate],
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

  return (
    <section className='flex gap-4 w-[95%] h-[95%] rounded-md bg-[var(--color-background-shade)] overflow-y-scroll'>
      <Section
        reportType={reportType}
        commerces={commerces}
        handleCreateReport={handleCreateReport}
        handleFetchReports={handleFetchReports}
        pageSize={pageSize}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setPageSize={setPageSize}
        selectedCommerce={selectedCommerce}
        setSelectedCommerce={setSelectedCommerce}
        loading={loading}
        setLoading={setLoading}
        dateSpanOptions={dateSpanOptions}
        handleDatePremade={handleDatePremade}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        currentLabel={currentLabel}
        setCurrentLabel={setCurrentLabel}
        graphData={graphData}
        currentReportData={currentReportData}
        error={error}
      />
    </section>
  );
};

export default Reports;
