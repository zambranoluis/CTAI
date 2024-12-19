import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

import ReportImageViewer from "./ReportImage";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { RiGalleryView2, RiListView } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { set } from "date-fns";

const ReportTypeView = ({ reportsData, currentReportType, onReportTypeChange }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [viewMode, setViewMode] = useState("card"); // Estado para alternar entre tabla y carta
  const [selectedReport, setSelectedReport] = useState(null); // Estado para el reporte seleccionado
  const reportTypes = ["Shoplifting", "Restricted Area", "Face Recognition"];

  const router = useRouter();

  const handleChangeReportType = (reportType) => {
    onReportTypeChange(reportType);
    router.push(`/dashboard/${reportType.toLowerCase().replace(" ", "-")}`);
  };

  const [loadingSlide, setLoadingSlide] = useState(false);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <SlArrowRight
        className={className}
        style={{
          ...style,
          display: "block",
          color: "var(--color-text)",
          fontSize: "30px",
          margin: "10px",
        }}
        onClick={() => {
          setLoadingSlide(true);
          onClick();
          setTimeout(() => {
            setLoadingSlide(false);
          }, 500);
        }}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <SlArrowLeft
        className={className}
        style={{
          ...style,
          display: "block",
          color: "var(--color-text)",
          fontSize: "30px",
          margin: "10px",
        }}
        onClick={() => {
          setLoadingSlide(true);
          onClick();
          setTimeout(() => {
            setLoadingSlide(false);
          }, 500);
        }}
      />
    );
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => onReportTypeChange(reportTypes[index]),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    centerPadding: "50px", // Reduce el padding para centrar más las flechas
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "30px", // Ajusta el padding para móviles
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px", // Más pequeño en pantallas pequeñas
          arrows: true,
        },
      },
    ],
  };

  const reportsDataIds = reportsData.map((report) => report.id);

  return (
    <div className={`fex flex-col w-[90%] absolute z-70 bggreen-800   `}>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-center text-xl font-bold'>Report type:</h2>

        <div className='view-mode-toggle flex gap-2'>
          <button
            onClick={() => setViewMode("card")}
            className={viewMode === "card" ? "active" : ""}>
            <RiGalleryView2 className='text-[2.5rem] hover:text-primary hover:animate-pulse cursor-pointer text-[var(--color-text)]' />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "active" : ""}>
            <RiListView className='text-[2.5rem] hover:text-primary hover:animate-pulse cursor-pointer text-[var(--color-text)]' />
          </button>
        </div>
      </div>

      <Slider {...sliderSettings} className='bgorange-500 mt-4'>
        {reportTypes.map((reportType) => (
          <div className=' flex w-full items-center justify-center py-4' key={reportType}>
            <div className='w-full flex items-center justify-center gap-12 bgblue-300'>
              <Button
                className='bg-[--color-text-shade] hover:bg-[--color-primary] text-center text-xl font-bold rounded-lg'
                onClick={() => handleChangeReportType(reportType)}>
                <h2 className='text-center text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-text-shade)]'>
                  {reportType}
                </h2>
              </Button>
            </div>
          </div>
        ))}
      </Slider>

      {viewMode === "card" ? (
        <div className='mt12'>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 mt-6  ${
              reportsData.length > 0 ? "" : "noScrollBar"
            }  bgblue-400  overflow-y-auto max-h-[300px] p-4`}>
            {loadingSlide === true ? (
              <Card className='w-[200px] space-y-5 p-4' radius='lg'>
                <Skeleton className='rounded-lg'>
                  <div className='h-24 rounded-lg bg-default-300' />
                </Skeleton>
                <div className='space-y-3'>
                  <Skeleton className='w-3/5 rounded-lg'>
                    <div className='h-3 w-3/5 rounded-lg bg-default-200' />
                  </Skeleton>
                  <Skeleton className='w-4/5 rounded-lg'>
                    <div className='h-3 w-4/5 rounded-lg bg-default-200' />
                  </Skeleton>
                  <Skeleton className='w-2/5 rounded-lg'>
                    <div className='h-3 w-2/5 rounded-lg bg-default-300' />
                  </Skeleton>
                </div>
              </Card>
            ) : (
              <>
                {reportsData.length > 0 ? (
                  reportsData.map((report, index) => (
                    <div key={report.id}>
                      <Card className='flex shadow-md flex-col w-full justify-center items-center bg-[--color-background] rounded-lg p-2 '>
                        <CardHeader className='flex justify-between'>
                          <Modal
                            className='text-[--color-text]'
                            isOpen={isOpen && selectedReport?.id === report.id}
                            onOpenChange={onOpenChange}>
                            <ModalContent>
                              {(onClose) => (
                                <>
                                  <ModalHeader className='flex flex-col gap-1'>
                                    Report ID: {selectedReport?.id}
                                  </ModalHeader>
                                  <ModalBody>
                                    <p>{selectedReport?.timestamp}</p>
                                    <p>{selectedReport?.reportType}</p>
                                    <p>{selectedReport?.commerceName}</p>
                                    <p>{selectedReport?.detectedId}</p>
                                    <p>
                                      {Array.isArray(selectedReport?.hashIds)
                                        ? selectedReport.hashIds.join(", ")
                                        : "No hash IDs available"}
                                    </p>
                                    <p>{selectedReport?.cameraAddress}</p>
                                    <p>{selectedReport?.description}</p>
                                    <ReportImageViewer
                                      reportsData={reportsDataIds}
                                      index={index}
                                      reportType={report.reportType}
                                      faces={selectedReport}
                                    />
                                  </ModalBody>
                                  <ModalFooter>
                                    {index !== 0 && (
                                      <Button
                                        color='warning'
                                        variant='light'
                                        onPress={() => {
                                          setSelectedReport(reportsData[index - 1]);
                                        }}>
                                        Previous Report
                                      </Button>
                                    )}
                                    {index !== reportsData.length - 1 && (
                                      <Button
                                        color='success'
                                        variant='light'
                                        onPress={() => {
                                          setSelectedReport(reportsData[index + 1]);
                                        }}>
                                        Next Report
                                      </Button>
                                    )}
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                          <p className='text-xs uppercase font-bold'>
                            {new Date(report.timestamp).toLocaleString()}
                          </p>
                          <Button
                            size='sm'
                            onPress={() => {
                              setSelectedReport(report);
                              onOpen();
                            }}>
                            <FaExternalLinkAlt />
                          </Button>
                        </CardHeader>
                        <CardBody>
                          <p>{report.reportType}</p>
                          <p>{selectedReport?.commerceName}</p>
                          <p>Detected ID: {report.detectedId}</p>
                          <p>
                            Detected IDs:{" "}
                            {Array.isArray(report.hashIds)
                              ? report.hashIds.join(", ")
                              : "N/A"}
                          </p>
                          <p>Camera: {report.cameraAddress}</p>
                          <ReportImageViewer
                            reportsData={reportsDataIds}
                            index={index}
                            reportType={report.reportType}
                          />
                        </CardBody>
                      </Card>
                    </div>
                  ))
                ) : (
                  <p>No reports available for {currentReportType}</p>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className='mt-8'>
          <Table>
            <TableHeader>
              <TableColumn>Report Date</TableColumn>
              <TableColumn>Detected ID</TableColumn>
              <TableColumn>Camera Address</TableColumn>
              <TableColumn>Detected IDs</TableColumn>
              <TableColumn>Download Image</TableColumn>
            </TableHeader>
            <TableBody>
              {reportsData.map((report, index) => (
                <TableRow key={report.id}>
                  <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{report.detectedId}</TableCell>
                  <TableCell>{report.cameraAddress}</TableCell>
                  <TableCell>
                    {Array.isArray(report.hashIds) ? report.hashIds.join(", ") : "N/A"}
                  </TableCell>
                  <TableCell>
                    <ReportImageViewer
                      reportsData={reportsDataIds}
                      index={index}
                      reportType={report.reportType}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ReportTypeView;
