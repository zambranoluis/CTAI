"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "../../services/authService";
import { Button } from "@nextui-org/button";
import "../index.css";

import dynamic from "next/dynamic";
const DynamicParticlesComponent = dynamic(
  () => import("../../components/ParticlesComponent"),
  {
    ssr: false,
  },
);

const ResetPassword = ({ searchParams }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const token = searchParams?.token || "";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword(token, newPassword);
      if (response.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          router.push("/"); // Redirigir al login
        }, 3000);
      }
    } catch (error) {
      setError("An error occurred while resetting the password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen flex justify-center items-center'>
      <DynamicParticlesComponent />
      <div className='container max-w-[420px] z-[50]'>
        <div className='w-[100%] py-[20px] text-center'>
          <img className='m-[auto] w-[100px]' src='https://github.com/BPM94/CDNMD/raw/main/CTM/logo_bordes_100.png' alt='' />
          <div className="font-['Solid-Mono'] font-bold mt-[20px]">
            <span className='text-[#62aba4]'>CRIMSON</span>TIDE
            <span className='text-[#62aba4]'>.</span>AI
          </div>
          <div className="font-['Solid-Mono'] font-bold mt-[10px]">Set New Password</div>
        </div>
        <form onSubmit={handleSubmit} className='w-[80%] m-[auto]'>
          <div className='py-[7px]'>New Password</div>
          <div>
            <input
              className='w-full px-2 py-2'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='New Password'
            />
          </div>
          <div className='py-[7px]'>Confirm Password</div>
          <div>
            <input
              className='w-full px-2 py-2'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Password'
            />
          </div>
          {error && <div className='text-red-500 text-center mt-4'>{error}</div>}
          {success && (
            <div className='text-green-500 text-center mt-4'>
              Password reset successfully! Redirecting to login...
            </div>
          )}
          <div className='h-[15px]'></div>
          <div className='w-[80%] m-[auto]'>
            <Button
              type='submit'
              className='btn-primary cursor-pointer font-bold'
              isDisabled={loading}
              isLoading={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
