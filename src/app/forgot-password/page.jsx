"use client";

import "./forgotPassword.css";
import { useState } from "react";
import { forgotPassword } from "../../services/authService";
import dynamic from "next/dynamic";
const DynamicParticlesComponent = dynamic(
  () => import("../../components/ParticlesComponent"),
  {
    ssr: false,
  },
);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      if (response.status === "success") {
        setSuccess(true);
      }
    } catch (error) {
      setError("An error occurred while requesting a password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen flex justify-center items-center'>
      <DynamicParticlesComponent />
      <div className='container bg-[#1c1c1c] w-[420px] p-[10px] mx-[10px] my-[40px] z-20'>
        <div className='w-[100%] py-[20px] text-center'>
          <img className='m-[auto] w-[100px]' src='https://github.com/BPM94/CDNMD/raw/main/CTM/logo_bordes_100.png' alt='' />
          <div className="font-['Solid-Mono'] font-bold mt-[20px]">
            <span className=''>CRIMSON</span>TIDE
            <span className=''>.</span>AI
          </div>
          <div className="font-['Solid-Mono'] font-bold mt-[10px]">Reset Password</div>
        </div>
        <form onSubmit={handleSubmit} className='w-[80%] m-[auto]'>
          <div className='py-[7px]'>Email</div>
          <div>
            <input
              className='w-full px-2 py-2'
              type='text'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-Mail'
            />
          </div>
          {error && <div className='text-red-500 text-center mt-4'>{error}</div>}
          {success && (
            <div className='text-green-500 text-center mt-4'>
              An email has been sent with a link to reset your password.
            </div>
          )}
          <div className='h-[15px]'></div>
          <div className='w-[80%] m-[auto]'>
            <button
              type='submit'
              className='btn-primary cursor-pointer font-bold'
              disabled={loading}>
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </div>
          <div className='h-[15px]'></div>
          <div className='text-center'>
            Don't have an account yet?{" "}
            <a className='font-bold' href='/new-account'>
              Sign up here
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
