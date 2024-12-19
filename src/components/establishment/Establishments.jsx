"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  getEstablishmentsByUserId,
  createEstablishment,
  updateEstablishment,
  deleteEstablishment,
} from "@/services/establishmentService";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import { RiGalleryView2, RiListView } from "react-icons/ri";
import { sendVerificationCode } from "@/services/authService";
import Verification from "../Verification";
import { useDataContext } from "@/context/DataContext";
import { IoAdd } from "react-icons/io5";
import { Button } from "@nextui-org/button";
import Swal from "sweetalert2";
import { establishmentFieldsConfig } from "@/assets/FieldsConfig.jsx";
import { validateText, validateNumber } from "@/utils/validation";
import dynamic from "next/dynamic";

const ViewGallery = dynamic(() => import("./ViewGallery"), { ssr: false });
const ViewTablet = dynamic(() => import("./ViewTablet"), { ssr: false });

const Establishments = () => {
  const { data: session } = useSession();
  const { establishmentsData, setEstablishmentsData } = useDataContext();
  const [formData, setFormData] = useState({});
  const [modalType, setModalType] = useState("");
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [pendingActionData, setPendingActionData] = useState(null);
  const [showGallery, setShowGallery] = useState(true);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchEstablishments = async () => {
      if (session && session.user && session.accessToken && !establishmentsData) {
        try {
          const response = await getEstablishmentsByUserId(
            session.accessToken,
            session.user.id,
          );
          if (response?.data) setEstablishmentsData(response.data);
          else setError("Failed to fetch establishments: no data found.");
        } catch (err) {
          console.error("Error fetching establishments:", err);
          setError("Failed to fetch establishments.");
        }
      }
    };
    fetchEstablishments();
  }, [session, establishmentsData, setEstablishmentsData]);

  const requestVerificationCode = useCallback(
    async (action, data = null) => {
      setLoading(true);
      if (!session || !session.user) return;

      try {
        await sendVerificationCode(session.user.email, session.user.phone);
        setPendingActionData({ action, data });
        setShowVerificationModal(true);
      } catch (err) {
        console.error("Error sending verification code:", err);
        setError("Failed to send verification code.");
      } finally {
        setLoading(false);
      }
    },
    [session],
  );

  const handleVerificationSuccess = useCallback(async () => {
    if (!pendingActionData) return;
    const { action, data } = pendingActionData;

    try {
      let responseMessage = "";
      switch (action) {
        case "create":
          await createEstablishment(session.accessToken, {
            ...data,
            userId: session.user.id,
          });
          responseMessage = "Establishment created successfully.";
          break;
        case "edit":
          await updateEstablishment(session.accessToken, data.id, data);
          responseMessage = "Establishment updated successfully.";
          break;
        case "delete":
          await deleteEstablishment(session.accessToken, data);
          responseMessage = "Establishment deleted successfully.";
          break;
        default:
          throw new Error("Unknown action.");
      }
      Swal.fire({ icon: "success", title: "Success", text: responseMessage });

      const response = await getEstablishmentsByUserId(
        session.accessToken,
        session.user.id,
      );
      setEstablishmentsData(response.data);
      handleCloseModal();
    } catch (err) {
      console.error("Error during action:", err);
      setError("Failed to complete the action.");
    } finally {
      setLoading(false);
      setShowVerificationModal(false);
      setPendingActionData(null);
    }
  }, [pendingActionData, session, setEstablishmentsData]);

  const handleFormSubmit = useCallback(
    (formData) => {
      const validationErrors = {};

      // Validar el campo `phonesNotify`
      if (formData.phonesNotify) {
        formData.phonesNotify.forEach((phone, index) => {
          if (!validateNumber(phone)) {
            validationErrors[`phonesNotify_${index}`] = `Phone at position ${
              index + 1
            } must contain only digits.`;
          }
        });
      }

      // Validación general
      if (!validateText(formData.name)) {
        validationErrors.name = "Name must contain only letters, numbers, and spaces.";
      }
      if (!validateText(formData.address)) {
        validationErrors.address =
          "Address must contain only letters, numbers, and spaces.";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      requestVerificationCode(modalType === "create" ? "create" : "edit", formData);
    },
    [modalType, requestVerificationCode],
  );

  const handleOpenCreateModal = useCallback(() => {
    setModalType("create");
    setSelectedEstablishment(null);
    setFormData({});
  }, []);

  const handleOpenEditModal = useCallback((establishment) => {
    setModalType("edit");
    setSelectedEstablishment(establishment);
    setFormData(establishment);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) requestVerificationCode("delete", id);
      });
    },
    [requestVerificationCode],
  );

  const handleCloseModal = useCallback(() => {
    setModalType("");
    setSelectedEstablishment(null);
    setPendingActionData(null);
    setShowVerificationModal(false);
  }, []);

  const handleCopyId = useCallback((id) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = id;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Swal.fire({ icon: "success", title: "Success", text: "ID copied to clipboard." });
    } catch (err) {
      console.error("Error copying text: ", err);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to copy ID." });
    }
  }, []);

  const toggleViewGallery = useCallback(() => {
    setShowGallery(true);
    setShowTable(false);
  }, []);
  const toggleViewTable = useCallback(() => {
    setShowGallery(false);
    setShowTable(true);
  }, []);

  const renderTableView = useMemo(
    () => (
      <ViewTablet
        establishmentsData={establishmentsData}
        handleCopyId={handleCopyId}
        handleOpenEditModal={handleOpenEditModal}
        handleDelete={handleDelete}
      />
    ),
    [establishmentsData, handleCopyId, handleOpenEditModal, handleDelete],
  );

  const renderGalleryView = useMemo(
    () => (
      <ViewGallery
        establishmentsData={establishmentsData}
        handleCopyId={handleCopyId}
        handleOpenEditModal={handleOpenEditModal}
        handleDelete={handleDelete}
      />
    ),
    [establishmentsData, handleCopyId, handleOpenEditModal, handleDelete],
  );

  return (
    <section className='w-[95%] h-[95%] p-8 bg-[var(--color-background-shade)] overflow-y-scroll noScrollBar z-50'>
      <div className='flex justify-between mb-8'>
        <h1 className='text-xl font-bold'>Establishments</h1>
        <Button onClick={handleOpenCreateModal} className='bg-[--color-text-shade]'>
          Register new Establishment <IoAdd />
        </Button>
      </div>
      <div className='flex justify-end p-4 gap-4'>
        <RiListView
          onClick={toggleViewTable}
          className={`text-4xl hover:text-[--color-primary] cursor-pointer `}
        />
        <RiGalleryView2
          onClick={toggleViewGallery}
          className={`text-4xl hover:text-[--color-primary] cursor-pointer `}
        />
      </div>
      {showGallery ? renderGalleryView : renderTableView}
      {modalType && (
        <Modal
          onClose={handleCloseModal}
          title={modalType === "create" ? "Create Establishment" : "Edit Establishment"}>
          <Form
            initialData={selectedEstablishment || {}}
            fieldsConfig={establishmentFieldsConfig}
            handleSubmit={handleFormSubmit}
            handleChange={(e) =>
              setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            formData={formData}
            loading={loading}
            buttonText={modalType === "create" ? "Register" : "Update"}
            errors={errors}
            modalType={modalType}
          />
        </Modal>
      )}
      {showVerificationModal && (
        <Verification
          email={session.user.email}
          onClose={() => {
            setShowVerificationModal(false);
            setPendingActionData(null);
          }}
          onSuccess={handleVerificationSuccess}
        />
      )}
    </section>
  );
};

export default Establishments;
