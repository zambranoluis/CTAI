"use client";

import { use, useEffect, useState } from "react";

import ActivateNotifications from "../ActivateNotifications";
import ReportDetails from "../ReportDetails";
import ReportImageViewer from "../ReportImage";

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Card, CardHeader, CardBody } from "@nextui-org/card";

import { Button } from "@nextui-org/button";

import { Skeleton } from "@nextui-org/skeleton";

import { getReportImage } from "@/services/typeReportService";
import { useSession } from "next-auth/react";

import { DatePicker } from "@nextui-org/date-picker";
import { now, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { set } from "date-fns";

import { FaExternalLinkAlt } from "react-icons/fa";
import { MdNotificationAdd } from "react-icons/md";

import { MdReportProblem } from "react-icons/md";


import { Pagination } from "@nextui-org/pagination";

import dynamic from "next/dynamic";

const DynamicApexChart = dynamic(() => import("../ApexChartComponent"), {
  ssr: false,
});
const Section = ({
  reportType,
  commerces,
  handleCreateReport,
  handleFetchReports,
  pageSize,
  setPageSize,
  page,
  setPage,
  totalPages,
  selectedCommerce,
  setSelectedCommerce,
  loading,
  dateSpanOptions,
  handleDatePremade,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  currentLabel,
  setCurrentLabel,
  graphData,
  currentReportData,
  error,
}) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const reportsDataIds = currentReportData.map((report) => report.id);
  return (
    <div className="w-full h-full p-8">
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-4">{reportType} Reports</h1>
          <div className="max-md:flex-col md:flex gap-2">
            <ActivateNotifications
              reportType={reportType} // Pasar el tipo de reporte dinámico
              loading={loading}
              selectedCommerce={selectedCommerce}
              handleCreateReport={handleCreateReport}
            />
            <div>
              <Button
                onClick={() => {
                  handleCreateReport();
                }}
              >
                <MdReportProblem />
              </Button>
            </div>
          </div>
        </div>

        <form className="mb-4">
          <label htmlFor="commerce" className="block text-sm font-medium mb-1">
            Select Establishment
          </label>
          <select
            id="commerce"
            value={selectedCommerce}
            onChange={(e) => setSelectedCommerce(e.target.value)}
            className="w-full max-w-[500px] p-2 border rounded"
          >
            <option value="">Select an Establishment</option>
            {commerces.map((commerce) => (
              <option key={commerce.id} value={commerce.id}>
                {commerce.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="pageSize"
            className="block text-sm font-medium mb-1 mt-4"
          >
            Reports per page
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
            className="w-full max-w-[500px] p-2 border rounded"
          >
            {[10, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>

          <div className="grid p-2 bgrose-300  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-4 max-w-[500px] md:max-w-[700px] max-xl:overflow-y-auto max-h-[100px]">
            {dateSpanOptions.map((option) => (
              <Button
                key={option.label}
                className={`${
                  currentLabel === option.label ? "bg-[--color-background]" : ""
                }`}
                onClick={() => {
                  setCurrentLabel(option.label),
                    handleDatePremade(option.label);
                }}
              >
                {option.label}{" "}
                {/* Usa la propiedad label para mostrar el texto */}
              </Button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row bgred-300  gap-4 mt-4">
            <DatePicker
              className="w-full sm:max-w-[250px]"
              label="Start Date"
              variant="bordered"
              showMonthAndYearPickers
              hideTimeZone
              granularity="second"
              onChange={(selectedDate) => {
                setStartDate(selectedDate);
              }}
            />
            <DatePicker
              className="w-full sm:max-w-[250px]"
              label="End Date"
              variant="bordered"
              showMonthAndYearPickers
              hideTimeZone
              granularity="second"
              onChange={(selectedDate) => {
                setEndDate(selectedDate);
              }}
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleFetchReports();
            }}
            className="mt-4"
            isDisabled={loading}
            isLoading={loading}
          >
            Fetch Reports        {" "}
          </Button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
          {loading ? (
            <Card className=" space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          ) : (
            <>
              {currentReportData && currentReportData.length > 0 ? (
                currentReportData.map((report, index) => (
                  <Card
                    key={report.id}
                    className="flex shadow-md flex-col w-full justify-center items-center bg-[--color-background] rounded-lg p-2"
                  >
                    <CardHeader className="flex justify-between items-center">
                      <p className="text-tiny uppercase font-bold">
                        {new Date(report.timestamp).toLocaleString()}
                      </p>
                      <ReportDetails
                        currentReportData={currentReportData}
                        index={index}
                        selectedReport={selectedReport}
                        setSelectedReport={setSelectedReport}
                        reportType={reportType}
                      />
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      <small className="text-default-500">
                        {report.commerceName}
                      </small>
                      <h4 className="font-bold text-large">
                        {report.reportType}
                      </h4>
                      <p>ID: {report.id}</p>
                      <p>Detected ID: {report.detectedId}</p>
                      {reportType === "Face Recognition" && (
                        <p>name: {report.faces.name}</p>
                      )}
                      <p className="mb-4">
                        {report.hashIds?.length > 0 &&
                          report.hashIds.map((hash) => (
                            <span key={hash} className="inline-block mr-2">
                              #{hash}
                            </span>
                          ))}
                      </p>
                      <p className="mb-4">{report.cameraAddress}</p>
                      <ReportImageViewer
                        reportsData={reportsDataIds}
                        index={index}
                        reportType={reportType}
                        faces={report}
                      />
                    </CardBody>
                  </Card>
                ))
              ) : (
                <p>No reports found.</p>
              )}
            </>
          )}
        </div>

        {currentReportData?.length > 0 && (
          <Pagination
            total={totalPages}
            page={page}
            onChange={setPage}
            className="mt-4"
          />
        )}

        {loading ? (
          <>
            <div className="flex my-12 w-full justify-center items-center">
              <Skeleton className="rounded-lg p/8 w-[80%]">
                <div className="h-48 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </>
        ) : (
          <>
            {graphData && (
              <DynamicApexChart
                graphData={graphData}
                graphType="reports"
                className="mt-8"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Section;
