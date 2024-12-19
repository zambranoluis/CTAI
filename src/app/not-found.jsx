"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        if (status === "authenticated" && session) {
          router.push("/dashboard/home");
        } else {
          router.push("/");
        }
      }, 5000);
    }
  }, [status, session, router]);

  return (
    <div className='relative flex h-screen w-screen items-center justify-center'>
      <div className='w-full h-full bg-black absolute z-10'>
        <video autoPlay loop muted className='w-full h-full object-cover'>
          <source src='https://github.com/BPM94/CDNMD/raw/main/CTM/crimson4042_VP8.webm' type='video/webm' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='z-[20] w-[90%] lg:w-[50%] flex flex-col text-white text-center p-8 bg-black/80 backdrop-blur-sm rounded-md'>
        <div className='flex flex-col bgrose-600 gap-4'>
          <h1 className='text-3xl font-bold'>404 - Page Not Found</h1>
          <p className='text-xl'>
            The Page you are looking for does not exist or has been moved. Please check
            the URL and try again.
          </p>
          <p className='text-xl'>
            Click down below if you are not redirected to Dashboard's Home automatically
            in 5 seconds
          </p>
          <Link
            className='flex place-self-center justify-center items-center px-4 py-2 text-center  text-2xl hover:text-[#ca0000] underline cursor-pointer gap-2'
            href='/dashboard/home'>
            <RiArrowGoBackFill className='font-black' />
            <p className='  '>Go Back To Dashboard</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
