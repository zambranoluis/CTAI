"use client";

import React, { useState } from "react";
import { verifyCode } from "../services/authService";

const Verification = ({ email, onClose, onSuccess }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await verifyCode(email, verificationCode);
      if (response.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          onSuccess(); // Llama a la función después de una verificación exitosa
        }, 2000);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' fixed z-[999] inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center'>
      <div className='bg-[--color-background-shade] p-6 rounded-md w-[400px]'>
        <h2 className='text-xl font-bold text-center mb-4 text-[--color-text]'>Verification Code</h2>
        <p className='mb-4 text-center'>
          A verification code was sent to your email and phone. Please enter it below.
        </p>
        <input
          className='w-full px-2 py-2 border border-gray-300 rounded mb-4 bg-[--color-background]'
          type='text'
          placeholder='Verification Code'
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        {error && <div className='text-red-500 mb-4 text-center'>{error}</div>}
        {success && (
          <div className='text-green-500 mb-4 text-center'>Verification successful!</div>
        )}
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className='mr-2 px-4 py-2 border border-gray-300 rounded'>
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={loading}
            className='px-4 py-2 bg-blue-500 text-white rounded'>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
