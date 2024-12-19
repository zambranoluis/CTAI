"use client";

import "./index.css";
import React, { useState, useCallback, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import dynamic from "next/dynamic";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// Carga diferida del componente Particles
const DynamicParticlesComponent = dynamic(
  () => import("../components/ParticlesComponent"),
  {
    ssr: false,
  },
);

const Home = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Prefetch de la ruta del dashboard
  useEffect(() => {
    router.prefetch("/dashboard/home");
  }, [router]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/dashboard/home",
        });

        if (result?.error === "Invalid token.") {
          setIsModalOpen(true);
        } else if (result?.ok) {
          // Reemplazar en lugar de añadir a la historia de navegación
          window.location.href = result.url || "/dashboard/home";
        } else {
          setError(result.error || "An unknown error occurred.");
        }
      } catch {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    },
    [email, password, router],
  );

  const handleSuccess = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Controla el temporizador para el mensaje de error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <main className='items-center min-h-screen flex justify-center p-10'>
      <DynamicParticlesComponent />
      <div className='container bg-[#1c1c1c] rounded-lg max-w-[420px] flex flex-col z-20'>
        <div className='w-full py-[20px] text-center flex flex-col justify-center items-center'>
          <img
            className='m-auto w-[100px] bg-red300'
            src='https://github.com/BPM94/CDNMD/raw/main/CTM/logo_bordes_100.png'
            alt='logo crimsontide login'
          />
          <h1 className='font-bold mt-[20px]'>
            <span className=''>CRIMSON</span>TIDE
            <span className=''>.</span>AI
          </h1>
          <p className='font-bold mt-[10px]'>Please log in to your account</p>
        </div>
        <div className='w-[80%] m-auto'>
          <form id='login-form' onSubmit={handleSubmit}>
            <div className=''>
              <label htmlFor='email' className='py-[7px] block'>
                Email
              </label>
              <div className='bg-blue400 flex relative border-gray-300 rounded'>
                <input
                  className='w-full px-2 py-2 border text-[--color-text] '
                  type='email'
                  id='email'
                  name='email'
                  placeholder='E-Mail'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className=''>
              <label htmlFor='password' className='py-[7px] block'>
                Password
              </label>
              <div className='bg-blue400 flex relative border-gray-300 rounded'>
                <input
                  className='w-full px-2 py-2 border text-[--color-text] bgred-300 '
                  type={showPassword ? "text" : "password"}
                  id='password'
                  name='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEye
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer'
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEyeSlash
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer'
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>

            <div className='h-[15px]'></div>
            {error && <div className='text-center text-red-500 font-bold'>{error}</div>}
            <div className='text-center font-bold my-[10px]'>
              <Link href='/forgot-password'>Forgot Password? </Link>
            </div>
            <Button
              color='primary'
              type='submit'
              className='btn-primary cursor-pointer font-bold'
              isLoading={loading}
              disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
          {/* <footer className='text-center mt-4'>
            Don't have an account yet?{" "}
            <Link href='/new-account' className='font-bold'>
              Sign up here
            </Link>
          </footer> */}
        </div>
      </div>

      {isModalOpen && (
        <Verification
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={email}
          onSuccess={handleSuccess}
        />
      )}
    </main>
  );
};

export default Home;
