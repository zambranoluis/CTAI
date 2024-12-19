import { use, useEffect, useState } from "react";

import ReportImageViewer from "./ReportImage";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Card, Skeleton } from "@nextui-org/react";

import { FaExternalLinkAlt } from "react-icons/fa";

const ReportDetails = ({
  currentReportData,
  index,
  selectedReport,
  setSelectedReport,
  reportType,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const reportsDataIds = currentReportData.map((report) => report.id);
  const [currentIndexDetails, setCurrentIndexDetails] = useState(index);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const handleOpenReport = () => {
    setIsLoadingData(true);
    onOpen();
    setTimeout(() => {
      setSelectedReport(currentReportData[index]);
      setIsLoadingData(false);
    }, 1000);
  };

  return (
    <div>
      <Button
        size='sm'
        onPress={() => {
          handleOpenReport();
        }}>
        <FaExternalLinkAlt />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) =>
            isLoadingData ? (
              <>
                <Card className='w-full h-[400px] space-y-5 p-4 ' radius='lg'>
                  <div className='flex justify-around flex-col gap-4 h-full bgblue-300'>
                    <Skeleton className='w-3/5 rounded-lg'>
                      <div className='h-3 w-full rounded-lg bg-default-200'></div>
                    </Skeleton>
                    <div className='space-y-3 h-[150px] justify-center bgred-300'>
                      <Skeleton className='w-2/5 rounded-lg'>
                        <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
                      </Skeleton>
                      <Skeleton className='w-2/5 rounded-lg'>
                        <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
                      </Skeleton>
                      <Skeleton className='w-3/5 rounded-lg'>
                        <div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
                      </Skeleton>
                      <Skeleton className='w-4/5 rounded-lg'>
                        <div className='h-3 w-4/5 rounded-lg bg-default-200'></div>
                      </Skeleton>
                      <Skeleton className='w-2/5 rounded-lg'>
                        <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
                      </Skeleton>
                      <Skeleton className='w-2/5 rounded-lg'>
                        <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
                      </Skeleton>
                      <Skeleton className='w-2/5 rounded-lg'>
                        <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
                      </Skeleton>
                    </div>
                    <Skeleton className='w-2/5 rounded-lg'>
                      <div className='h-8 w-[100px] rounded-lg bg-default-300'></div>
                    </Skeleton>
                  </div>
                </Card>
              </>
            ) : (
              <>
                <ModalHeader>Report ID: {selectedReport?.id}</ModalHeader>
                <ModalBody>
                  <p>{selectedReport?.timestamp}</p>
                  <p>{selectedReport?.reportType}</p>
                  <p>{selectedReport?.detectedId}</p>
                  {reportType === "Face Recognition" && (
                    <p>name: {selectedReport?.faces.name}</p>
                  )}
                  <p>
                    {(selectedReport?.hashIds && selectedReport?.hashIds.join(", ")) ||
                      "No hash IDs in report"}
                  </p>
                  <p>{selectedReport?.cameraAddress}</p>
                  <p>{selectedReport?.description}</p>
                  <ReportImageViewer
                    reportsData={reportsDataIds}
                    index={currentIndexDetails}
                    reportType={selectedReport?.reportType}
                    faces={selectedReport?.faces}
                  />
                </ModalBody>
                <ModalFooter>
                  {currentIndexDetails > 0 && (
                    <Button
                      color='warning'
                      variant='light'
                      onPress={() => {
                        setCurrentIndexDetails(currentIndexDetails - 1);
                        setSelectedReport(currentReportData[currentIndexDetails - 1]);
                      }}>
                      Previous Report
                    </Button>
                  )}
                  {currentIndexDetails < currentReportData.length - 1 && (
                    <Button
                      color='success'
                      variant='light'
                      onPress={() => {
                        setCurrentIndexDetails(currentIndexDetails + 1);
                        setSelectedReport(currentReportData[currentIndexDetails + 1]);
                      }}>
                      Next Report
                    </Button>
                  )}
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </div>
  );
};
export default ReportDetails;
