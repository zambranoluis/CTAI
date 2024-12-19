"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";




const Header = ({ session, establishmentsData }) => {
  const handleCopyId = useCallback((id) => {
    try {
      navigator.clipboard.writeText(id);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "ID copied to clipboard.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to copy ID.",
      });
    }
  }, []);

  return (
    <div className='flex flex-col bgred-700 p-2 w-full  justify-center items-center '>
      <div className="flex justify-center items-center relative bgpurple-500 place-self-start ">
        {/* <div className="flex w-[180px] h-[50px]">
          <video className="object-cover w-full h-full bggreen-600 " autoPlay muted loop src="https://github.com/BPM94/SCCTMD/raw/main/lavaLamp.mp4"></video>
        </div> */}
        <div className="bgblue-500  flex w-full h-full justify-center items-center texttransparent">
          <h1 className="bgrose-400 top-0 text-3xl  text-center font-black  ">Information</h1>
        </div>
      </div>
      <div className='flex flex-col  max-md:gap-8 justify-around  items-center md:flex-row p-2  bgorange-500 w-full  '>
        
        <div id="userInfo" className='flex w-full justify-center items-center md:w-[40%] xl:w-[30%] bgblue-800 p-2 '>
          <span className='text-[--color-text] flex  text-4xl md:text-3xl lg:text-4xl font-black  text-center bgrose-500'>
            {session?.user?.givenName}
            <br />
            {session?.user?.familyName}
          </span>
        </div>

        <div id="establishmentsInfo" className="w-full md:w-[60%] xl:w-[70%] p-2 bggreen-800 max-w-[500px] lg:place-self-center  flex flex-col overflow-hidden  justify-center items-center">
          <div className="bgpurple-500 w-full flex flex-col  justify-center items-center  ">
            <p className='text-[--color-text] font-bold text-2xl p2 text-center'>
              Total Establishments: {establishmentsData.length}
            </p>
          </div>
          <div className="flex p2 bgpurple-800 w-full overflow-hidden  ">
            <div className="flex flex-col bggray-800  w-[100px]  px-8 py-6  ">
              <p className="">Name:</p>
              <p className="">Phone:</p>
              <p className="">Address:</p>
            </div>
            <div className=" bgrose-800 flex w-full  overflow-x-scroll">
              <div className="flex bgpink-500 w-full gap-2 p-2">
                {establishmentsData.map((establishment) => (
                  <div key={establishment.id} className=' flex flex-col  px-8 py-4 border-b  border-t border-[--color-background-] bg-red max-w-[200px] max-h-[200px]'>
                    <p className='max-md:text-center whitespace-nowrap overflow-x-auto  bgred-500 noScrollBar'>{establishment.name}</p>
                    <p className='max-md:text-center whitespace-nowrap overflow-x-auto  bgred-500 noScrollBar'>{establishment.phone}</p>
                    <p className='max-md:text-center whitespace-nowrap overflow-x-auto  bgred-500 noScrollBar'>{establishment.address}</p>
                    
                    <div className="bgrose-500 justify-center  md:justify-start items-center flex  text-sm">
                      <p className="flex justify-center items-center  mt-1 gap-1 cursor-pointer hover:text-[#ca0000] duration-300 " onClick={() => handleCopyId(establishment.id)} ><FaCopy /> Copy ID</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


export default Header;
