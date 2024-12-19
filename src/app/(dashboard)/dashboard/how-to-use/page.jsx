"use client";



import { useState } from "react";
import { IoAccessibility } from "react-icons/io5";
import { RiApps2AddFill } from "react-icons/ri";

const HowToUse = () => {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section
      id='section_reports'
      className='flex flex-col relative   w-[95%] h-[95%] rounded-md bg-[var(--color-background-shade)] overflow-y-scroll noScrollBar gap-2'>
      <div className='flex justify-center items-center sticky top-[0%] z-[20] bg-[--color-background]  '>
        <div
          className={`flex justify-center items-center cursor-pointer ${
            selectedStep === 0 ? "text-[#ca0000]" : ""
          } `}
          onClick={(e) => {
            e.preventDefault;
            setSelectedStep(0);
          }}>
          <IoAccessibility className='text-4xl' />
        </div>

        <div className='flex   place-self-center justify-center items-center p-4'>
          <div
            className={` transition-all duration-500     ${
              selectedStep === 1 ? "bg-red-800" : "bg-[#4b4a4a]"
            } hover:cursor-pointer    rounded-full w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] flex justify-center items-center `}
            onClick={(e) => {
              e.preventDefault;
              setSelectedStep(1);
            }}>
            <p className='font-black sm:text-3xl text-white'>1</p>
          </div>
          <div
            className={` transition-all duration-500 ${
              selectedStep === 1 || selectedStep === 2 ? "bg-red-800" : "bg-[#4b4a4a]"
            }   w-[20px] h-[6px] sm:w-[40px] sm:h-[12px] `}></div>
          <div
            className={` transition-all duration-500     ${
              selectedStep === 2 ? "bg-red-800" : "bg-[#4b4a4a]"
            } hover:cursor-pointer    rounded-full w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] flex justify-center items-center `}
            onClick={(e) => {
              e.preventDefault;
              setSelectedStep(2);
            }}>
            <p className='font-black sm:text-3xl text-white'>2</p>
          </div>
          <div
            className={` transition-all duration-500 ${
              selectedStep === 2 || selectedStep === 3 ? "bg-red-800" : "bg-[#4b4a4a]"
            }   w-[20px] h-[6px] sm:w-[40px] sm:h-[12px] `}></div>
          <div
            className={` transition-all duration-500     ${
              selectedStep === 3 ? "bg-red-800" : "bg-[#4b4a4a]"
            } hover:cursor-pointer    rounded-full w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] flex justify-center items-center `}
            onClick={(e) => {
              e.preventDefault;
              setSelectedStep(3);
            }}>
            <p className='font-black sm:text-3xl text-white'>3</p>
          </div>
          <div
            className={` transition-all duration-500  ${
              selectedStep === 3 || selectedStep === 4 ? "bg-red-800" : "bg-[#4b4a4a]"
            }  w-[20px] h-[6px] sm:w-[40px] sm:h-[12px] `}></div>
          <div
            className={` transition-all duration-500     ${
              selectedStep === 4 ? "bg-red-800" : "bg-[#4b4a4a]"
            } hover:cursor-pointer    rounded-full w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] flex justify-center items-center `}
            onClick={(e) => {
              e.preventDefault;
              setSelectedStep(4);
            }}>
            <p className='font-black sm:text-3xl text-white'>4</p>
          </div>
        </div>

        <div
          className={`flex justify-center items-center cursor-pointer ${
            selectedStep === 5 ? "text-[#ca0000]" : ""
          } `}
          onClick={(e) => {
            e.preventDefault;
            setSelectedStep(5);
          }}>
          <RiApps2AddFill className='text-4xl' />
        </div>
      </div>

      <div className='  bgred-400 p-4  bggreen-300 place-self-center'>
        {selectedStep === 0 && (
          <div className=' flex relative justify-center '>
            <p className='transition-all duration-500 w-[90%] mt-[90%] p-4 rounded-md font-bold    bg-white text-black z-[10] '>
              How to use our App <br /> 1. Register Establishments <br />
              2. Edit your Profile <br />
              3. Check your Reports in one place <br />
              4. Navigate through your available options
            </p>
            <img
              id='guyImage'
              className=' rounded-md absolute max-h-[550px] '
              src='https://github.com/BPM94/CDNMD/raw/main/CTM/guyhowtouse.jpg'
              alt=''
            />
          </div>
        )}
        {selectedStep === 1 && (
          <div className='bgred-400  flex flex-col gap-8 mt-6'>
            <h1 className='text-xl md:text-3xl   lg:text-4xl text-center font-bold place-self-center animate-pulse'>
              Register a Establishment
            </h1>
            <video className='rounded-md max-h[460px] w-full' controls autoPlay muted>
              {" "}
              <source src='https://github.com/BPM94/CDNMD/raw/main/CTM/createEstablishment.webm' type='video/webm' />{" "}
            </video>
          </div>
        )}
        {selectedStep === 3 && (
          <div className='bgred-400  flex flex-col gap-8 mt-6'>
            <h1 className='text-xl md:text-3xl   lg:text-4xl text-center font-bold place-self-center animate-pulse'>
              Edit your Profile
            </h1>
            <video className='rounded-md max-h[460px] w-full' controls autoPlay muted>
              {" "}
              <source src='https://github.com/BPM94/CDNMD/raw/main/CTM/editProfile.webm' type='video/webm' />{" "}
            </video>
          </div>
        )}
        {selectedStep === 4 && (
          <div className='bgred-400  flex flex-col gap-8 mt-6'>
            <h1 className='text-xl md:text-3xl   lg:text-4xl text-center font-bold place-self-center animate-pulse'>
              Check Everything in one place
            </h1>
            <video className='rounded-md max-h[460px] w-full' controls autoPlay muted>
              {" "}
              <source src='https://github.com/BPM94/CDNMD/raw/main/CTM/widget.webm' type='video/webm' />{" "}
            </video>
          </div>
        )}
        {selectedStep === 2 && (
          <div className='bgred-400  flex flex-col gap-8 mt-6'>
            <h1 className='text-xl md:text-3xl   lg:text-4xl text-center font-bold place-self-center animate-pulse'>
              Navigate through your available options
            </h1>
            <video className='rounded-md max-h[460px] w-full' controls autoPlay muted>
              {" "}
              <source src='https://github.com/BPM94/CDNMD/raw/main/CTM/aside.webm' type='video/webm' />{" "}
            </video>
          </div>
        )}
        {selectedStep === 5 && (
          <div className='bgred-400  flex flex-col gap-8 mt-6'>
            <h1 className='text-xl md:text-3xl   lg:text-4xl text-center font-bold place-self-center animate-pulse'>
              Find Specific Information
            </h1>
            <video className='rounded-md max-h[460px] w-full' controls autoPlay muted>
              {" "}
              <source src='https://github.com/BPM94/CDNMD/raw/main/CTM/people_shoplifting.webm' type='video/webm' />{" "}
            </video>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowToUse;
