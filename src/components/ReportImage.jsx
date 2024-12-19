import { use, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Skeleton } from "@nextui-org/skeleton";

import { getReportImage } from "@/services/typeReportService";
import { useSession } from "next-auth/react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { set } from "date-fns";

const ReportImageViewer = ({ reportsData, index, reportType, faces }) => {
  // console.log("reportsData:", reportsData);
  const { data: session } = useSession();
  const [imageSrc, setImageSrc] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [currentIndexImage, setCurrentIndexImage] = useState(index);
  const [selectedReportId, setSelectedReportId] = useState(
    reportsData[currentIndexImage],
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // UseEffect para windowsize en html en el size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    setSelectedReportId(reportsData[currentIndexImage]);
  }, []);

  // Función para obtener y mostrar la imagen del reporte
  const fetchImage = async () => {
    try {
      onOpen();
      setLoading(true);
      // Llama a la función para obtener la imagen por tipo de reporte
      const imageUrl = await getReportImage(session.token, selectedReportId, reportType);
      setTimeout(() => {
        setImageSrc(imageUrl);
        setLoading(false);
        // Abre el modal cuando la imagen se ha cargado correctamente
      }, 1000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Función para descargar la imagen
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "report_image.jpeg";
    link.click();
  };

  const nameFace = (faces) => {
    if (reportType === "Face Recognition") {
      // console.log("faces", faces);
      return `Name: ${faces.name}`;
    } else {
      return "";
    }
  };

  return (
    <div className='image-viewer relative mt-2 '>
      <Button
        onPress={() => {
          setCurrentIndexImage(index);
          setSelectedReportId(reportsData[index]);
          fetchImage();
        }}
        isLoading={loading}
        isDisabled={loading}>
        {loading ? "Loading..." : "View Image"}
      </Button>
      {error && <p>{error}</p>}

      {/* Mostrar Modal */}
      <div className=' flex absolute z-[1000] '>
        <Modal
          size={`${windowSize < 600 ? "md" : ""}${
            600 < windowSize && windowSize < 900 ? "sm" : ""
          }${900 < windowSize && windowSize < 1100 ? "lg" : ""}${
            1100 < windowSize && windowSize < 1300 ? "2xl" : ""
          }${1300 < windowSize ? "4xl" : ""}`}
          className='top-[100px] '
          isOpen={isOpen}
          onOpenChange={onOpenChange}>
          <ModalContent className=''>
            {(onClose) => (
              <>
                <ModalHeader>Report Image</ModalHeader>
                <ModalBody>
                  {/* Mostrar la imagen si está disponible */}
                  {loading ? (
                    <div className='h-full flex flex-col gap-4'>
                      <div className='flex flex-col gap-4'>
                        <Skeleton className='w-3/5 rounded-lg'>
                          <div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
                        </Skeleton>
                        <Skeleton className='rounded-lg h-full'>
                          <div className='h-[500px] rounded-lg bg-default-300'></div>
                        </Skeleton>
                      </div>
                      <div className='flex place-self-center gap-12 mt-2'>
                        <IoIosArrowBack className='text-6xl cursor-pointer hover:text-[#ca0000]' />
                        <IoIosArrowForward className='text-6xl cursor-pointer hover:text-[#ca0000]' />
                      </div>
                    </div>
                  ) : (
                    <>
                      {imageSrc ? (
                        <div className={`flex flex-col gap-4`}>
                          <p>ID: {selectedReportId}</p>
                          {reportType === "Face Recognition" && (
                            <p>{nameFace(faces)}</p>
                          )}
                          <img
                            src={imageSrc}
                            alt='Report Image'
                            className='flex h-[500px]  place-self-center select-none'
                          />
                          <div className='flex place-self-center gap-12 mt-2'>
                            <IoIosArrowBack
                              onClick={() => {
                                if (currentIndexImage - 1 >= 0) {
                                  setCurrentIndexImage(currentIndexImage - 1);
                                  setSelectedReportId(reportsData[currentIndexImage - 1]);
                                  fetchImage();
                                }
                              }}
                              className={`text-6xl cursor-pointer ${
                                currentIndexImage === 0
                                  ? "text-gray-400 cursor-not-allowed scale-80"
                                  : " hover:text-[#ca0000]"
                              }`}
                            />
                            <IoIosArrowForward
                              onClick={() => {
                                if (currentIndexImage + 1 < reportsData.length) {
                                  setCurrentIndexImage(currentIndexImage + 1);
                                  setSelectedReportId(reportsData[currentIndexImage + 1]);
                                  fetchImage();
                                }
                              }}
                              className={`text-6xl cursor-pointer ${
                                currentIndexImage === reportsData.length - 1
                                  ? "text-gray-400 cursor-not-allowed scale-80 "
                                  : " hover:text-[#ca0000]"
                              }`}
                            />
                          </div>
                        </div>
                      ) : (
                        <p>No image available</p>
                      )}
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' onPress={downloadImage}>
                    Download Image
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ReportImageViewer;
