"use client";

import "./NewAccount.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Verification from "../../components/Verification";
import Form from "../../components/Form";
import { registerUser } from "../../services/authService";
import { fieldsConfigNewAccount } from "@/assets/FieldsConfig.jsx";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

const DynamicParticlesComponent = dynamic(
  () => import("../../components/ParticlesComponent"),
  {
    ssr: false,
  },
);

const NewAccount = () => {
  const [formData, setFormData] = useState({
    userName: "",
    givenName: "",
    email: "",
    familyName: "",
    password1: "",
    password2: "",
    address: "",
    phone: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    setIsModalOpen(false);
    router.push("/"); // Redirige al usuario al inicio después de la verificación
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    
    setLoading(true);
    setErrors({});

    if (formData.password1 !== formData.password2) {
      setErrors({
        password1: "Passwords do not match",
        password2: "Passwords do not match",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await registerUser(formData);
      if (response.status === "success") {
        setIsModalOpen(true); // Abre el modal de verificación
        Swal.fire({
          icon: "success",
          title: "Register successful!",
          text: response.message,
          confirmButtonText: "Accept",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error in Register",
        text: error.response?.data?.message || "An unexpected error occurred.",
        confirmButtonText: "Accept",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className='min-h-screen flex justify-center items-center'>
        <DynamicParticlesComponent />
        <div className='container bg-[#1c1c1c] w-[840px] p-[10px] mx-[10px] my-[40px] z-20'>
          <div className='w-[100%] py-[20px] text-center'>
            <img className='m-[auto] w-[100px]' src='https://github.com/BPM94/CDNMD/raw/main/CTM/logo_bordes_100.png' alt='' />
            <div className="font-['Solid-Mono'] font-bold mt-[20px]">
              <span className=''>CRIMSON</span>TIDE
              <span className=''>.</span>AI
            </div>
          </div>
          <Form
            fieldsConfig={fieldsConfigNewAccount}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={(e) => {
              handleRegister(e);
            }}
            loading={loading}
            errors={errors}
            buttonText='Create Account'
          />
        </div>
      </main>
      {isModalOpen && (
        <Verification
          email={formData.email}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default NewAccount;
